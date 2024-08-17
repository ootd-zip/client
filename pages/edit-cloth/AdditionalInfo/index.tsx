import { ImageWithTag } from '@/components/Domain/AddOOTD/TagModal';
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
import { ClothWhereBuy } from '../[...ClothNumber]';
import ClothSizeModal, {
  SizeItem,
} from '@/components/Domain/AddCloth/ClothSizeModal';
import { Body3 } from '@/components/UI';
import WhereToBuyModal from '@/components/Domain/AddCloth/WhereToBuyModal';
import { CategoryListType } from '@/components/Domain/AddCloth/ClothCategoryModal';
import Background from '@/components/Background';

interface AdditionalInfo {
  clothWhereBuy?: ClothWhereBuy;
  clothSize: SizeItem | null;
  clothImage: ImageWithTag | undefined;
  clothBuyDate: string;
  clothMemo: string;
  clothCategory: CategoryListType[] | null;
  setClothMemo: Dispatch<SetStateAction<string>>;
  setClothBuyDate: Dispatch<SetStateAction<string>>;
  setClothImage: Dispatch<SetStateAction<ImageWithTag | undefined>>;
  setClothWhereBuy: Dispatch<SetStateAction<ClothWhereBuy>>;
  setClothSize: Dispatch<SetStateAction<SizeItem | null>>;
  handleStep: (next: string) => void;
  onClickSubmitButton: () => void;
}

export default function AdditionalInfo({
  clothImage,
  clothBuyDate,
  clothMemo,
  clothWhereBuy,
  clothSize,
  clothCategory,
  setClothSize,
  setClothWhereBuy,
  setClothMemo,
  setClothBuyDate,
  setClothImage,
  handleStep,
  onClickSubmitButton,
}: AdditionalInfo) {
  const [sizeModalOpen, setSizeModalOpen] = useState<Boolean>(false);
  const [whereToBuyModalOpen, setWhereToBuyModalOpen] =
    useState<Boolean>(false);

  const WhereToBuy = (
    <Body3 style={{ WebkitTextDecorationLine: 'underline' }}>
      {clothWhereBuy?.letter}
    </Body3>
  );

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

  const onClickBackground = () => {
    if (sizeModalOpen) setSizeModalOpen(false);
    if (whereToBuyModalOpen) setWhereToBuyModalOpen(false);
  };

  return (
    <>
      <Background
        isOpen={sizeModalOpen || whereToBuyModalOpen}
        onClick={onClickBackground}
      />
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
              <Input.Label size="small" className="subtitle">
                사이즈
              </Input.Label>
              <Input.Modal
                result={<Body3>{clothSize?.name}</Body3>}
                setModalOpen={setSizeModalOpen}
                state={clothSize !== null}
              />
            </Input>
            <Input>
              <Input.Label size="small" className="subtitle">
                구매처
              </Input.Label>
              {clothWhereBuy && clothWhereBuy.letter?.length > 0 ? (
                <Input.Modal
                  result={WhereToBuy}
                  setModalOpen={setWhereToBuyModalOpen}
                  state={clothWhereBuy?.letter.length > 0}
                  type={clothWhereBuy?.type}
                  action="write"
                />
              ) : (
                <Input.Modal
                  result={WhereToBuy}
                  setModalOpen={setWhereToBuyModalOpen}
                  state={true}
                />
              )}
            </Input>
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
      {whereToBuyModalOpen && (
        <WhereToBuyModal
          isOpen={whereToBuyModalOpen}
          setIsOpen={setWhereToBuyModalOpen}
          setWhereToBuy={setClothWhereBuy}
          storedClothWhereBuy={clothWhereBuy}
        />
      )}
      {sizeModalOpen && (
        <ClothSizeModal
          setIsOpen={setSizeModalOpen}
          setClothSize={setClothSize}
          isOpen={sizeModalOpen}
          categoryId={
            clothCategory
              ? clothCategory![0].state
                ? clothCategory![0].id
                : clothCategory![0].detailCategories![0].id
              : 0
          }
          clothSizeInitial={clothSize}
        />
      )}
    </>
  );
}
