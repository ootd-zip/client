import {
  getReactNativeMessage,
  sendReactNativeMessage,
} from '@/utils/reactNativeMessage';
import { Dispatch, SetStateAction, useEffect, useState, useRef } from 'react';
import Carousel from '../Carousel';
import { useRouter } from 'next/router';
import { ImageWithTag } from '../Domain/AddOOTD/TagModal';
import S from './style';
import NextButton from '../NextButton';
import { Body3, Body4, Caption1 } from '../UI';
import { useRecoilState } from 'recoil';
import { storedImageKey } from '@/utils/recoil/atom';
import Alert from '../Alert';
import NextImage from '../NextImage';
import PublicApi from '@/apis/domain/Public/PublicApi';
import Background from '../Background';
import ClothApi from '@/apis/domain/Cloth/ClothApi';
import { ColorListType } from '../ColorList';

interface GalleryProps {
  imageAndTag: ImageWithTag | undefined;
  setImageAndTag: Dispatch<SetStateAction<ImageWithTag | undefined>>;
  nextStep: string;
  handleStep: (next: string) => void;
  item: 'Cloth' | 'OOTD';
}

const Gallery = ({
  imageAndTag,
  setImageAndTag,
  handleStep,
  nextStep,
  item,
}: GalleryProps) => {
  const router = useRouter();

  const [realTouch, setRealTouch] = useState<number>(100);
  const [storedImage, setStoredImage] = useRecoilState(storedImageKey);
  const [isOpenStoredImageAlert, setIsOpenStoredImageAlert] =
    useState<Boolean>(false);

  //임시 저장된 데이터 사용 o
  const getStoredImage = () => {
    setImageAndTag(storedImage);
    if (storedImage!.length > 0) {
      setSelectedImage(storedImage!);
      setRealTouch(storedImage![storedImage!.length - 1].ootdId);
      setIsOpenStoredImageAlert(false);
      handleStep(nextStep);
    }
  };

  //임시 저장된 데이터 사용x
  const dontGetStoredImage = () => {
    sendReactNativeMessage({ type: item });
    setImageAndTag([]);
    setSelectedImage([]);
    setStoredImage(undefined);
    setIsOpenStoredImageAlert(false);
  };

  const getToken = async () => {
    const { getNewToken } = PublicApi();
    await getNewToken();
    sendReactNativeMessage({
      type: 'accessToken',
      payload: localStorage.getItem('accessToken'),
    });
    sendReactNativeMessage({
      type: 'refreshToken',
      payload: localStorage.getItem('refreshToken'),
    });
  };

  useEffect(() => {
    getToken();
    if (storedImage !== undefined && item === 'OOTD') {
      setIsOpenStoredImageAlert(true);
    } else {
      sendReactNativeMessage({ type: item });
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      getReactNativeMessage(setImageAndTag);
    }
  }, []);

  useEffect(() => {
    if (imageAndTag) {
      setSelectedImage(imageAndTag);
      setRealTouch(0);
    }
  }, [imageAndTag]);

  const [selectedImage, setSelectedImage] = useState<ImageWithTag>([]);

  const onClickImage = (ootdId: number, ootdImage: string) => {
    if (ootdId !== realTouch) {
      setRealTouch(ootdId);

      const alive = selectedImage.filter(
        (item) => item.ootdId === ootdId
      ).length;

      if (!alive) {
        setRealTouch(ootdId);
        setSelectedImage([
          ...selectedImage,
          { ootdImage: ootdImage, ootdId: ootdId },
        ]);
      }
      return;
    }

    const newSelectedImage = selectedImage.filter((item) => {
      if (item.ootdId !== ootdId) {
        return item;
      }
    });

    if (selectedImage.length === 1) {
      setRealTouch(100);
    } else {
      setRealTouch(newSelectedImage[newSelectedImage.length - 1].ootdId);
    }

    setSelectedImage(newSelectedImage);
  };

  const onClickNextButton = () => {
    setImageAndTag(selectedImage);
    handleStep(nextStep);
  };

  const { getColor } = ClothApi();

  interface RGB {
    r: number;
    g: number;
    b: number;
  }

  interface Cluster {
    centroid: RGB;
    pixels: RGB[];
  }

  const [color, setColor] = useState<ColorListType | undefined>();
  const [dominantColor, setDominantColor] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const fetchColor = async () => {
      const colorList = (await getColor()) as ColorListType;
      setColor(colorList);
    };

    fetchColor();
  }, []);

  useEffect(() => {
    if (imageLoaded && color) {
      handleImageLoad();
    }
  }, [imageLoaded, color]);

  const handleImageLoad = () => {
    const img = document.getElementById('sourceImage') as HTMLImageElement;
    const canvas = canvasRef.current;

    if (!img || !canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    context.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight);

    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const pixels: RGB[] = [];
    for (let i = 0; i < data.length; i += 4) {
      pixels.push({ r: data[i], g: data[i + 1], b: data[i + 2] });
    }

    const k = 5; // Number of clusters
    const clusters = kMeansClustering(pixels, k);

    const dominantCluster = clusters.reduce((prev, current) =>
      prev.pixels.length > current.pixels.length ? prev : current
    );

    const averageColor = dominantCluster.centroid;

    const hexCode = color
      ? findClosestColor(averageColor.r, averageColor.g, averageColor.b, color)
      : '#FFFFFF'; // default to white if no color found
    setDominantColor(hexCode);
  };

  function kMeansClustering(pixels: RGB[], k: number): Cluster[] {
    let centroids = initializeCentroids(pixels, k);
    let clusters: Cluster[] = [];

    for (let i = 0; i < 10; i++) {
      clusters = assignPixelsToClusters(pixels, centroids);
      centroids = updateCentroids(clusters);
    }

    return clusters;
  }

  function initializeCentroids(pixels: RGB[], k: number): RGB[] {
    const centroids: RGB[] = [];
    for (let i = 0; i < k; i++) {
      const randomPixel = pixels[Math.floor(Math.random() * pixels.length)];
      centroids.push(randomPixel);
    }
    return centroids;
  }

  function assignPixelsToClusters(pixels: RGB[], centroids: RGB[]): Cluster[] {
    const clusters: Cluster[] = centroids.map((centroid) => ({
      centroid,
      pixels: [],
    }));

    for (let pixel of pixels) {
      let minDistance = Number.MAX_VALUE;
      let closestCentroidIndex = -1;

      for (let i = 0; i < centroids.length; i++) {
        const distance = colorDistance(pixel, centroids[i]);
        if (distance < minDistance) {
          minDistance = distance;
          closestCentroidIndex = i;
        }
      }

      clusters[closestCentroidIndex].pixels.push(pixel);
    }

    return clusters;
  }

  function updateCentroids(clusters: Cluster[]): RGB[] {
    return clusters.map((cluster) => {
      const sum = cluster.pixels.reduce(
        (acc: RGB, pixel: RGB) => {
          acc.r += pixel.r;
          acc.g += pixel.g;
          acc.b += pixel.b;
          return acc;
        },
        { r: 0, g: 0, b: 0 }
      );

      const count = cluster.pixels.length;
      return { r: sum.r / count, g: sum.g / count, b: sum.b / count };
    });
  }

  function hexToRgb(hex: string): RGB {
    let bigint = parseInt(hex.slice(1), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  }

  function colorDistance(color1: RGB, color2: RGB): number {
    return Math.sqrt(
      Math.pow(color1.r - color2.r, 2) +
        Math.pow(color1.g - color2.g, 2) +
        Math.pow(color1.b - color2.b, 2)
    );
  }

  function findClosestColor(
    r: number,
    g: number,
    b: number,
    colorList: ColorListType
  ): string | null {
    if (!colorList || colorList.length === 0) return null; // default to null if color list is empty

    let minDistance = Number.MAX_VALUE;
    let closestColorName: string | null = null;

    const targetColor = { r, g, b };

    for (let color of colorList) {
      let colorRgb = hexToRgb(color.colorCode);
      let distance = colorDistance(targetColor, colorRgb);

      if (distance < minDistance) {
        minDistance = distance;
        closestColorName = color.name; // Return the name of the closest color
      }
    }

    return closestColorName;
  }

  return (
    <>
      <Background
        isOpen={isOpenStoredImageAlert}
        onClick={() => setIsOpenStoredImageAlert(false)}
      />
      <S.Layout>
        {selectedImage.length === 0 && (
          <S.BigImage>
            <NextImage
              className="bigImage"
              src="https://ootdzip.s3.ap-northeast-2.amazonaws.com/d2ff5b49-cbe3-40b3-8aa6-62551b5f3917_2024-01-31.png"
              alt="basic"
              fill={true}
            />
          </S.BigImage>
        )}
        {selectedImage &&
          selectedImage.map((item, index) => {
            if (item.ootdId === realTouch)
              return (
                <S.BigImage key={index}>
                  <NextImage
                    id="sourceImage"
                    className="bigImage"
                    src={item.ootdImage}
                    alt=""
                    fill={true}
                    onLoadingComplete={() => setImageLoaded(true)}
                  />
                  <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                </S.BigImage>
              );
          })}
        {imageAndTag && (
          <S.ImageList imageListlength={imageAndTag?.length}>
            <Body4 className="selected" state="emphasis">
              {selectedImage.length}장의 사진이 선택됨
            </Body4>
            <h1>color : {dominantColor}</h1>
            <Carousel
              infinite={false}
              dots={true}
              slidesToShow={imageAndTag.length <= 3 ? imageAndTag!.length : 3.2}
            >
              {imageAndTag &&
                imageAndTag.map((item, index) => {
                  let flag = 1;
                  return (
                    <S.SmallImage key={index} state={item.ootdId === realTouch}>
                      <NextImage
                        className="smallImage"
                        onClick={() =>
                          onClickImage(item.ootdId, item.ootdImage)
                        }
                        src={item.ootdImage}
                        alt=""
                        fill={false}
                        width={106}
                        height={106}
                      />
                      {selectedImage.map((items, indexs) => {
                        if (item.ootdId === items.ootdId) flag = 0;
                        return (
                          item.ootdId === items.ootdId && (
                            <S.ImageNumber
                              onClick={() =>
                                onClickImage(item.ootdId, item.ootdImage)
                              }
                              state={true}
                              key={indexs}
                            >
                              <Caption1>{indexs + 1}</Caption1>
                            </S.ImageNumber>
                          )
                        );
                      })}
                      {flag === 1 && (
                        <S.ImageNumber
                          onClick={() =>
                            onClickImage(item.ootdId, item.ootdImage)
                          }
                          state={false}
                        >
                          {''}
                        </S.ImageNumber>
                      )}
                    </S.SmallImage>
                  );
                })}
            </Carousel>
          </S.ImageList>
        )}
        <Body3 className="helperText">사진을 눌러 순서를 변경해보세요.</Body3>
        <NextButton
          className="nextButton"
          state={selectedImage.length > 0}
          onClick={onClickNextButton}
        >
          다음
        </NextButton>
        {isOpenStoredImageAlert && (
          <Alert
            headline="작성 중이던 게시글이 있습니다."
            body={
              <>
                <Body3>
                  이어서 작성하시겠습니까?
                  <br />
                  아니오를 누를 경우 임시저장본은 삭제되며 새로운 게시글을
                  작성할 수 있습니다.
                </Body3>
              </>
            }
            onClickYesButton={getStoredImage}
            onClickNoButton={dontGetStoredImage}
            no="취소"
            yes="확인"
          />
        )}
      </S.Layout>
    </>
  );
};

export default Gallery;
