/* eslint-disable @next/next/no-img-element */
import {
  getReactNativeMessage,
  sendReactNativeMessage,
} from '@/utils/reactNativeMessage';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Carousel from '../Carousel';
import { useRouter } from 'next/router';
import { ImageWithTag } from '../Domain/AddOOTD/TagModal';
import S from './style';
import NextButton from '../NextButton';
import { Body3, Body4, Caption1, Title1 } from '../UI';
import { useRecoilState } from 'recoil';
import { storedImageKey } from '@/utils/recoil/atom';
import Alert from '../Alert';

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

  useEffect(() => {
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

  useEffect(() => {
    console.log(storedImage);
  }, [storedImage]);

  return (
    <S.Layout>
      <S.Image>
        {selectedImage.length === 0 && (
          <img
            className="bigImage"
            src="https://ootdzip.s3.ap-northeast-2.amazonaws.com/d2ff5b49-cbe3-40b3-8aa6-62551b5f3917_2024-01-31.png"
            alt="basic"
          />
        )}
      </S.Image>
      {selectedImage &&
        selectedImage.map((item, index) => {
          if (item.ootdId === realTouch)
            return (
              <S.Image key={index}>
                <img className="bigImage" src={item.ootdImage} alt="" />
              </S.Image>
            );
        })}
      {imageAndTag && (
        <S.ImageList imageListlength={imageAndTag?.length}>
          <Body4 className="selected" state="emphasis">
            {selectedImage.length}장의 사진이 선택됨
          </Body4>
          <Carousel
            infinite={false}
            slidesToShow={imageAndTag.length <= 3 ? imageAndTag!.length : 3.2}
          >
            {imageAndTag &&
              imageAndTag.map((item, index) => {
                let flag = 1;
                return (
                  <S.Image key={index} state={item.ootdId === realTouch}>
                    <img
                      className="smallImage"
                      onClick={() => onClickImage(item.ootdId, item.ootdImage)}
                      src={item.ootdImage}
                      alt=""
                    />
                    {selectedImage.map((items, indexs) => {
                      if (item.ootdId === items.ootdId) flag = 0;
                      return (
                        item.ootdId === items.ootdId && (
                          <S.ImageNumber state={true} key={indexs}>
                            <Caption1>{indexs + 1}</Caption1>
                          </S.ImageNumber>
                        )
                      );
                    })}
                    {flag === 1 && (
                      <S.ImageNumber state={false}>{''}</S.ImageNumber>
                    )}
                  </S.Image>
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
          headline={<Title1>작성 중이던 게시글이 있습니다.</Title1>}
          body={
            <>
              <Body3>
                이어서 작성하시겠습니까?
                <br />
                아니오를 누를 경우 임시저장본은 삭제되며 새<br />
                로운 게시글을 작성할 수 있습니다.
              </Body3>
            </>
          }
          onClickYesButton={getStoredImage}
          onClickNoButton={dontGetStoredImage}
          yes="네"
          no="아니오"
        />
      )}
    </S.Layout>
  );
};

export default Gallery;
