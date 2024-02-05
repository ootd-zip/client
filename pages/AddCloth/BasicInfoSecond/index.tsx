/* eslint-disable @next/next/no-img-element */
import { Body3, Headline1, Title1 } from '@/components/UI';
import S from './style';
import { Dispatch, SetStateAction, useState } from 'react';
import Input from '@/components/Input';
import NextButton from '@/components/NextButton';
import { ClothWhereBuy } from '..';
import PlusButton from '@/components/PlusButton';
import { ColorListType } from '@/components/ColorList';
import { ImageWithTag } from '@/components/Domain/AddOOTD/TagModal';
import { CategoryListType } from '@/components/Domain/AddCloth/ClothCategoryModal';
import ColorSpan from '@/components/ColorList/ColorSpan';
import ColorModal from '@/components/Domain/AddCloth/ColorModal';
import ClothSizeModal from '@/components/Domain/AddCloth/ClothSizeModal';
import AddClothAlert from '@/components/Domain/AddCloth/AddClothAlert';

interface BasicInfoSecondProps {
  clothImage: ImageWithTag | undefined;
  clothCategory: CategoryListType[] | null;
  clothBrand: string;
  clothWhereBuy: ClothWhereBuy;
  handleStep: (next: string) => void;
  clothColor: ColorListType | null;
  setClothColor: Dispatch<SetStateAction<ColorListType | null>>;
  clothSize: string;
  setClothSize: Dispatch<SetStateAction<string>>;
  open: string;
  setOpen: Dispatch<SetStateAction<string>>;
}

export default function BasicInfoSecond({
  clothCategory,
  clothBrand,
  clothWhereBuy,
  clothImage,
  clothColor,
  setClothColor,
  clothSize,
  setClothSize,
  open,
  setOpen,
  handleStep,
}: BasicInfoSecondProps) {
  const [colorModalOpen, setColorModalOpen] = useState<Boolean>(false);
  const [sizeModalOpen, setSizeModalOpen] = useState<Boolean>(false);
  const [init, setInit] = useState<number>(0);
  const [inits, setInits] = useState<number>(0);
  const [alertOpen, setAlertOpen] = useState<Boolean>(false);

  const Category = () => {
    return (
      <S.Category>
        <Body3>{clothCategory![0].bigCategory}</Body3>
        <Body3>&gt;</Body3>
        <Body3 style={{ fontWeight: '700' }}>
          {clothCategory![0].smallCategory}
        </Body3>
      </S.Category>
    );
  };

  const Size = (
    <S.Size>
      <Body3>{clothSize}</Body3>
    </S.Size>
  );

  const onClickBackground = () => {
    if (colorModalOpen) setColorModalOpen(false);
    if (sizeModalOpen) setSizeModalOpen(false);
    if (alertOpen) setAlertOpen(false);
  };

  const onClickNextButton = () => {
    setAlertOpen(true);
  };

  const onClickColorPlusButton = () => {
    setColorModalOpen(true);
    setInit(1);
  };

  const onClickYesButton = () => {
    handleStep('추가정보');
  };

  const onClickNoButton = () => {
    //옷 등록 api
  };

  return (
    <>
      <S.Background
        isOpen={colorModalOpen || sizeModalOpen || alertOpen}
        onClick={onClickBackground}
      />
      <S.Layout>
        <S.BasicInfoFirst>
          <Category />
          <Headline1>{clothBrand}</Headline1>
          <img src={clothImage![0].ootdImage} alt="" />
          <hr />
        </S.BasicInfoFirst>
        <S.BasicInfoSecond>
          <S.Title>
            <Title1 className="title">기본 정보</Title1>
          </S.Title>
          <S.Information>
            <Input>
              <Input.Label size="small" className="label">
                색상
              </Input.Label>
              <S.ClothColorSpanList>
                {clothColor &&
                  clothColor.map((item, index) => {
                    return (
                      <ColorSpan
                        key={index}
                        index={index}
                        color={item.color}
                        name={item.name}
                        state={false}
                      />
                    );
                  })}
                <PlusButton onClickPlusButton={onClickColorPlusButton} />
              </S.ClothColorSpanList>
            </Input>

            <Input>
              <Input.Label size="small" className="label">
                사이즈
              </Input.Label>
              <Input.Modal
                result={Size}
                setModalOpen={setSizeModalOpen}
                state={clothSize.length > 0}
                setInit={setInits}
              />
            </Input>
            <Input>
              <Input.Label size="small" className="label">
                공개 여부
              </Input.Label>
              <Input.TrueFalse
                left="공개"
                right="비공개"
                state="공개"
                setState={setOpen}
              />
              <Input.HelperText className="helpertext" state={1}>
                공개로 설정하면 다른사람과 아이템을 공유할 수 있어요.
              </Input.HelperText>
            </Input>
          </S.Information>
        </S.BasicInfoSecond>
        <NextButton
          state={
            clothColor !== null && clothColor.length > 0
            //  && clothSize.length > 0
          }
          onClick={onClickNextButton}
          className="nextButton"
        >
          등록하기
        </NextButton>
      </S.Layout>
      {init > 0 && (
        <ColorModal
          colorInitial={clothColor}
          setIsOpen={setColorModalOpen}
          setClothColor={setClothColor}
          isOpen={colorModalOpen}
        />
      )}
      {inits > 0 && (
        <ClothSizeModal
          setIsOpen={setSizeModalOpen}
          setClothSize={setClothSize}
          isOpen={sizeModalOpen}
          bigCategory={clothCategory![0].bigCategory}
        />
      )}
      {alertOpen && (
        <AddClothAlert
          onClickYesButton={onClickYesButton}
          onClickNoButton={onClickNoButton}
        />
      )}
    </>
  );
}
