import { ImageWithTag } from '@/utils/types/OOTD.types';
import S from '@/pageStyle/edit-cloth/AdditionalInfo/style';
import Input from '@/components/Input';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Header from '@/components/Header';
import PrevNextButton from '@/components/PrevNextButton';
import WriteIcon from '@/public/images/WriteIcon.svg';
import {
  getReactNativeMessage,
  sendReactNativeMessage,
} from '@/utils/reactNativeMessage';
import NextImage from '@/components/NextImage';

interface AdditionalInfo {
  clothImage: ImageWithTag | undefined;
  clothBuyDate: string;
  clothMemo: string;
  setClothMemo: Dispatch<SetStateAction<string>>;
  setClothBuyDate: Dispatch<SetStateAction<string>>;
  setClothImage: Dispatch<SetStateAction<ImageWithTag | undefined>>;
  handleStep: (next: string) => void;
  onClickSubmitButton: () => void;
}

export default function AdditionalInfo({
  clothImage,
  clothBuyDate,
  clothMemo,
  setClothMemo,
  setClothBuyDate,
  setClothImage,
  handleStep,
  onClickSubmitButton,
}: AdditionalInfo) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      getReactNativeMessage(setClothImage);
    }
  }, []);

  const onClickPrevButton = () => {
    handleStep('기본정보');
  };

  const onClickImage = () => {
    sendReactNativeMessage({ type: 'Cloth' });
  };
  return (
    <>
      <S.Layout>
        <S.ClothImage>
          <NextImage
            onClick={onClickImage}
            src={clothImage! && clothImage![0].ootdImage}
            alt=""
            fill={false}
            width={106}
            height={106}
          />
          <WriteIcon className="writeIcon" />
        </S.ClothImage>
        <Header text="추가 정보" />
        <S.AdditionalInfo>
          <S.Information>
            <Input>
              <Input.Label size="small" className="label">
                구매시기
              </Input.Label>
              <Input.Text
                defaultValue={clothBuyDate}
                size="big"
                placeholder=""
                border={true}
                onChange={setClothBuyDate}
                line="outline"
                state={true}
              />
            </Input>
            <Input>
              <Input.Label size="small" className="label">
                메모
              </Input.Label>
              <Input.TextArea
                input={clothMemo}
                setInput={setClothMemo}
                placeholder=""
              />
            </Input>
          </S.Information>
        </S.AdditionalInfo>
        <PrevNextButton
          className="prevNextButton"
          onClickNextButton={onClickSubmitButton}
          onClickPrevButton={onClickPrevButton}
          next="완료"
          prev="이전"
        />
      </S.Layout>
    </>
  );
}
