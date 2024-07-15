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

    const centerX = Math.floor(canvas.width / 2);
    const centerY = Math.floor(canvas.height / 2);

    // Define the 5 points around the center
    const points = [
      { x: centerX, y: centerY }, // center
      { x: centerX + 3, y: centerY }, // right
      { x: centerX - 3, y: centerY }, // left
      { x: centerX, y: centerY + 3 }, // bottom
      { x: centerX, y: centerY - 3 }, // top
    ];

    const colors: { r: number; g: number; b: number }[] = [];

    for (let point of points) {
      const imageData = context.getImageData(point.x, point.y, 1, 1);
      const data = imageData.data;
      colors.push({ r: data[0], g: data[1], b: data[2] });
    }

    const averageColor = colors.reduce(
      (acc, color) => {
        acc.r += color.r;
        acc.g += color.g;
        acc.b += color.b;
        return acc;
      },
      { r: 0, g: 0, b: 0 }
    );

    averageColor.r = Math.floor(averageColor.r / colors.length);
    averageColor.g = Math.floor(averageColor.g / colors.length);
    averageColor.b = Math.floor(averageColor.b / colors.length);

    const hexCode = color
      ? findClosestColor(averageColor.r, averageColor.g, averageColor.b, color)
      : '#FFFFFF'; // default to white if no color found
    setDominantColor(hexCode);
  };

  function hexToRgb(hex: string): { r: number; g: number; b: number } {
    let bigint = parseInt(hex.slice(1), 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  }

  function colorDistance(
    color1: { r: number; g: number; b: number },
    color2: { r: number; g: number; b: number }
  ): number {
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
