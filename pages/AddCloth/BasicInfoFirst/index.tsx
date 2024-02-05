/* eslint-disable @next/next/no-img-element */
import S from './style';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Input from '@/components/Input';
import { Body3, Title1 } from '@/components/UI';
import NextButton from '@/components/NextButton';
import { ClothWhereBuy } from '..';
import { ImageWithTag } from '@/components/Domain/AddOOTD/TagModal';
import ClothCategoryModal, {
  CategoryListType,
} from '@/components/Domain/AddCloth/ClothCategoryModal';
import WhereToBuyModal from '@/components/Domain/AddCloth/WhereToBuyModal';

interface BaiscInfoFirst {
  clothImage: ImageWithTag | undefined;
  clothCategory: CategoryListType[] | null;
  clothBrand: string;
  clothWhereBuy: ClothWhereBuy;
  setClothCategory: Dispatch<SetStateAction<CategoryListType[] | null>>;
  setClothBrand: Dispatch<SetStateAction<string>>;
  setClothWhereBuy: Dispatch<SetStateAction<ClothWhereBuy>>;
  handleStep: (next: string) => void;
}

export default function BasicInfoFirst({
  clothImage,
  clothCategory,
  clothBrand,
  clothWhereBuy,
  setClothCategory,
  setClothBrand,
  setClothWhereBuy,
  handleStep,
}: BaiscInfoFirst) {
  const [categoryModalOpen, setCategoryModalOpen] = useState<Boolean>(false);
  const [nextButtonState, setNextButtonState] = useState<Boolean>(false);
  const [init, setInit] = useState<number>(0);
  const [inits, setInits] = useState<number>(0);

  const [whereToBuyModalOpen, setWhereToBuyModalOpen] =
    useState<Boolean>(false);

  useEffect(() => {
    if (
      clothCategory !== null &&
      // clothBrand.length > 0 &&
      clothWhereBuy.letter.length > 0
    ) {
      setNextButtonState(true);
      return;
    }
    setNextButtonState(false);
  }, [clothCategory, clothBrand, clothWhereBuy]);

  const Category = clothCategory && (
    <S.Category>
      <Body3>{clothCategory[0].bigCategory}</Body3>
      <Body3>&gt;</Body3>
      <Body3 style={{ fontWeight: '700' }}>
        {clothCategory[0].smallCategory}
      </Body3>
    </S.Category>
  );

  const WhereToBuy = <Body3>{clothWhereBuy.letter}</Body3>;

  const onClickNextButton = () => {
    handleStep('기본정보2');
    console.log(clothCategory, clothImage, clothWhereBuy, clothBrand);
  };

  useEffect(() => {
    if (clothCategory) brandRef.current.focus();
  }, [clothCategory]);

  const brandRef = useRef<any>(null);
  const nameRef = useRef<any>(null);

  const onClickBackground = () => {
    if (categoryModalOpen) setCategoryModalOpen(false);
    if (whereToBuyModalOpen) setWhereToBuyModalOpen(false);
  };
  return (
    <>
      <S.Background
        isOpen={categoryModalOpen || whereToBuyModalOpen}
        onClick={onClickBackground}
      />
      <S.Layout>
        <S.ClothImage>
          <img src={clothImage![0].ootdImage} alt="" />
        </S.ClothImage>
        <S.BasicInfo>
          <S.Title>
            <Title1 className="title">기본 정보</Title1>
          </S.Title>
          <S.Information>
            <Input>
              <Input.Label size="small">카테고리</Input.Label>
              <Input.Modal
                state={clothCategory !== undefined}
                result={Category}
                setModalOpen={setCategoryModalOpen}
                setInit={setInit}
              />
            </Input>
            <Input>
              <Input.Label size="small">브랜드</Input.Label>
              <Input.Text
                inputRef={brandRef}
                size="big"
                placeholder=""
                border={true}
                onChange={setClothBrand}
                line="outline"
                pressEnter={() => nameRef.current.focus()}
              />
            </Input>
            <Input>
              <Input.Label size="small">구매처</Input.Label>
              {clothWhereBuy ? (
                <Input.Modal
                  result={WhereToBuy}
                  setModalOpen={setWhereToBuyModalOpen}
                  state={clothWhereBuy.letter.length > 0}
                  setInit={setInits}
                  type={clothWhereBuy.type}
                />
              ) : (
                <Input.Modal
                  result={WhereToBuy}
                  setModalOpen={setWhereToBuyModalOpen}
                  state={true}
                  setInit={setInits}
                />
              )}
            </Input>
          </S.Information>
        </S.BasicInfo>
        <NextButton state={nextButtonState} onClick={onClickNextButton}>
          다음
        </NextButton>
      </S.Layout>
      {init && (
        <ClothCategoryModal
          isOpen={categoryModalOpen}
          setIsOpen={setCategoryModalOpen}
          setClothCategory={setClothCategory}
        />
      )}
      {inits && (
        <WhereToBuyModal
          isOpen={whereToBuyModalOpen}
          setIsOpen={setWhereToBuyModalOpen}
          setWhereToBuy={setClothWhereBuy}
        />
      )}
    </>
  );
}
