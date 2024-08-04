import {
  getReactNativeMessage,
  sendReactNativeMessage,
} from '@/utils/reactNativeMessage';
import { Dispatch, SetStateAction, useEffect, useState, useRef } from 'react';
import Carousel from '../Carousel';
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
import { suggestionColorType } from '@/pages/add-cloth';
import {
  findClosestColor,
  kMeansClustering,
  RGB,
} from '@/utils/ColorExtraction';

interface GalleryProps {
  imageAndTag: ImageWithTag | undefined;
  setImageAndTag: Dispatch<SetStateAction<ImageWithTag | undefined>>;
  nextStep: string;
  handleStep: (next: string) => void;
  item: 'Cloth' | 'OOTD';
  suggestionColor?: suggestionColorType | undefined;
  setSuggestionColor?: Dispatch<
    SetStateAction<suggestionColorType | undefined>
  >;
}

const Gallery = ({
  imageAndTag,
  setImageAndTag,
  handleStep,
  nextStep,
  item,
  suggestionColor,
  setSuggestionColor,
}: GalleryProps) => {
  const [realTouch, setRealTouch] = useState<number>(100); //현재 클릭한 사진 id
  const [storedImage, setStoredImage] = useRecoilState(storedImageKey); //임시저장 전역상태
  const [isOpenStoredImageAlert, setIsOpenStoredImageAlert] =
    useState<Boolean>(false); //임시저장 Alert 오픈 여부 상태
  const [selectedImage, setSelectedImage] = useState<ImageWithTag>([]); // 선택한 이미지 리스트

  //임시 저장된 데이터 사용 o
  const getStoredImage = () => {
    if (storedImage!.length > 0) {
      setImageAndTag(storedImage); //이미지 리스트에 임시저장 전역상태 업데이트
      setSelectedImage(storedImage!); //선택한 이미지 리스트에 임시저장 전역상태 업데이트
      setRealTouch(storedImage![storedImage!.length - 1].ootdId); //현재 클릭한 사진 id를 이미지 마지막 사진의 id로 업데이트
      setIsOpenStoredImageAlert(false); //임시저장 Alert 닫음
      handleStep(nextStep); //태그 단계로 스킵
    }
  };

  //임시 저장된 데이터 사용x
  const dontGetStoredImage = () => {
    sendReactNativeMessage({ type: item }); //사진 선택 단계 실행
    setImageAndTag([]); //이미지 리스트 초기화
    setSelectedImage([]); //선택한 이미지 리스트 초기화
    setStoredImage(undefined); //임시저장 전역상태 초기화
    setIsOpenStoredImageAlert(false); //임시저장 Alert 닫음
  };

  //새로운 JWT 토큰 발급 : native 단계에서 액세스 토큰이 만료되는 현상을 막기 위함
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

  //갤러리 페이지 진입 시
  useEffect(() => {
    getToken(); //새로운 JWT 토큰 발급
    if (storedImage !== undefined && item === 'OOTD') {
      //임시저장 상태가 o -> 임시저장 Alert 오픈
      setIsOpenStoredImageAlert(true);
    } else {
      //임시저장 상태가 x -> 이미지 선택 단계 실행
      sendReactNativeMessage({ type: item });
    }
  }, []);

  //react-native의 메세지를 받는 로직, 이미지 저장 후 경로 받는 용도
  useEffect(() => {
    if (typeof window !== 'undefined') {
      getReactNativeMessage(setImageAndTag);
    }
  }, []);

  //native 에서 이미지를 가져온 뒤 현재 선택 id를 맨 앞 사진으로 업데이트
  useEffect(() => {
    if (imageAndTag) {
      setSelectedImage(imageAndTag);
      setRealTouch(0);
    }
  }, [imageAndTag]);

  //이미지 리스트 클릭 시
  const onClickImage = (ootdId: number, ootdImage: string) => {
    //realTouch와 클릭한 이미지의 id가 다르다면 realTouch를 업데이트
    if (ootdId !== realTouch) {
      setRealTouch(ootdId);

      //선택된 이미지 중 클릭한 이미지와 같은 id를 가진 이미지가 있는지 확인
      const isImageAlreadySelected = selectedImage.some(
        (item) => item.ootdId === ootdId
      );

      // 만약 같은 id를 가진 이미지가 없다면 이미지의 마지막 인덱스로 push
      if (!isImageAlreadySelected) {
        setSelectedImage([
          ...selectedImage,
          { ootdImage: ootdImage, ootdId: ootdId },
        ]);
      }
      return;
    }

    //선택된 이미지 중 클릭한 이미지와 같은 id를 가진 이미지 추출
    const newSelectedImage = selectedImage.filter(
      (item) => item.ootdId !== ootdId
    );

    //같은 id를 가진 이미지가 없다면 realTouch를 100으로 업데이트
    if (!newSelectedImage.length) {
      setRealTouch(100);
    } else {
      //있다면 마지막 인덱스의 ootdId로 업데이트
      setRealTouch(newSelectedImage[newSelectedImage.length - 1].ootdId);
    }

    setSelectedImage(newSelectedImage);
  };

  //다음 버튼 클릭 함수
  const onClickNextButton = () => {
    setImageAndTag(selectedImage);
    handleStep(nextStep);
  };

  const { getColor } = ClothApi();

  const [color, setColor] = useState<ColorListType | undefined>();
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

    const k = 5;
    const clusters = kMeansClustering(pixels, k);

    const dominantCluster = clusters.reduce((prev, current) =>
      prev.pixels.length > current.pixels.length ? prev : current
    );

    const averageColor = dominantCluster.centroid;

    const hexCode = color
      ? findClosestColor(averageColor.r, averageColor.g, averageColor.b, color)
      : {
          id: 24,
          name: '화이트',
          colorCode: '#FFFFFF',
        };
    if (setSuggestionColor) {
      setSuggestionColor(hexCode || undefined);
    }
  };

  return (
    <>
      {/*임시 저장 Alert창 오픈시의 배경*/}
      <Background
        isOpen={isOpenStoredImageAlert}
        onClick={() => setIsOpenStoredImageAlert(false)}
      />
      <S.Layout>
        {/*선택한 사진이 없을 시 회색 이미지 렌더링*/}
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

        {/*realTouch인덱스에 해당하는 사진을 렌더링*/}
        {selectedImage &&
          selectedImage.map((item, index) => {
            if (item.ootdId === realTouch)
              return (
                <S.BigImage key={index}>
                  <NextImage
                    className="bigImage"
                    src={item.ootdImage}
                    alt=""
                    fill={true}
                  />
                  <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                </S.BigImage>
              );
          })}

        {/*선택한 이미지 리스트 렌더링*/}
        {imageAndTag && (
          <S.ImageList imageListlength={imageAndTag.length}>
            <Body4 className="selected" state="emphasis">
              {selectedImage.length}장의 사진이 선택됨
            </Body4>
            <Carousel
              infinite={false}
              dots={true}
              slidesToShow={imageAndTag.length <= 3 ? imageAndTag!.length : 3.2}
            >
              {imageAndTag.map((item, index) => {
                const selectedIndex = selectedImage.findIndex(
                  (selected) => selected.ootdId === item.ootdId
                );
                const isSelected = selectedIndex !== -1;

                return (
                  <S.SmallImage key={index} state={item.ootdId === realTouch}>
                    <NextImage
                      className="smallImage"
                      onClick={() => onClickImage(item.ootdId, item.ootdImage)}
                      src={item.ootdImage}
                      alt=""
                      fill={false}
                      width={106}
                      height={106}
                    />
                    <S.ImageNumber
                      onClick={() => onClickImage(item.ootdId, item.ootdImage)}
                      state={isSelected}
                    >
                      {isSelected ? (
                        <Caption1>{selectedIndex + 1}</Caption1>
                      ) : (
                        ''
                      )}
                    </S.ImageNumber>
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

        {/*임시저장 Alert창*/}
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
