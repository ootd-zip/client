import S from '@/pageStyle/add-cloth/BasicInfoFirst/style';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Input from '@/components/Input';
import { Body2, Body3, Title1 } from '@/components/UI';
import NextButton from '@/components/NextButton';
import { ClothWhereBuy } from '..';
import { ImageWithTag } from '@/components/Domain/AddOOTD/TagModal';
import ClothCategoryModal, {
  CategoryListType,
} from '@/components/Domain/AddCloth/ClothCategoryModal';
import WhereToBuyModal from '@/components/Domain/AddCloth/WhereToBuyModal';
import { BrandType } from '@/components/BrandList/Brand';
import BrandModal from '@/components/Domain/AddCloth/BrandModal';
import NextImage from '@/components/NextImage';
import ArrowLeft from '@/public/images/ArrowLeft.svg';
import Background from '@/components/Background';

interface BaiscInfoFirst {
  clothName: string;
  clothImage: ImageWithTag | undefined;
  clothCategory: CategoryListType[] | null;
  clothBrand: BrandType[] | null;
  clothWhereBuy: ClothWhereBuy;
  setClothCategory: Dispatch<SetStateAction<CategoryListType[] | null>>;
  setClothBrand: Dispatch<SetStateAction<BrandType[] | null>>;
  setClothWhereBuy: Dispatch<SetStateAction<ClothWhereBuy>>;
  handleStep: (next: string) => void;
}

export default function BasicInfoFirst({
  clothName,
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

  const [whereToBuyModalOpen, setWhereToBuyModalOpen] =
    useState<Boolean>(false);

  const [brandModalOpen, setBrandModalOpen] = useState<Boolean>(false);

  useEffect(() => {
    if (
      clothCategory !== null &&
      clothBrand !== null &&
      clothWhereBuy?.letter.length > 0
    ) {
      setNextButtonState(true);
      return;
    }
    setNextButtonState(false);
  }, [clothCategory, clothBrand, clothWhereBuy]);

  const Category = clothCategory && (
    <S.Category>
      <Body3>
        {clothCategory && clothCategory[clothCategory.length - 1]?.name}
      </Body3>
      <ArrowLeft />
      <Body3 style={{ fontWeight: '700' }}>
        {clothCategory &&
          clothCategory[clothCategory.length - 1]?.detailCategories &&
          clothCategory[clothCategory.length - 1]?.detailCategories![
            clothCategory[clothCategory.length - 1].detailCategories!.length - 1
          ].name}
      </Body3>
    </S.Category>
  );

  const Brand = <Body3>{clothBrand && clothBrand[0].name}</Body3>;

  const WhereToBuy = clothWhereBuy && (
    <Body3
      style={{
        WebkitTextDecorationLine:
          clothWhereBuy.type === 'Link' ? 'underline' : 'none',
      }}
    >
      {clothWhereBuy?.letter}
    </Body3>
  );

  const onClickNextButton = () => {
    handleStep('기본정보2');
  };

  const onClickBackground = () => {
    if (categoryModalOpen) setCategoryModalOpen(false);
    if (whereToBuyModalOpen) setWhereToBuyModalOpen(false);
    if (brandModalOpen) setBrandModalOpen(false);
  };

  return (
    <>
      <Background
        isOpen={categoryModalOpen || whereToBuyModalOpen || brandModalOpen}
        onClick={onClickBackground}
      />
      <S.Layout>
        <S.ClothName>
          <Body2>{clothName}</Body2>
        </S.ClothName>
        <S.ClothImage>
          <NextImage
            width={106}
            height={106}
            fill={false}
            src={clothImage! && clothImage[0].ootdImage}
            alt=""
          />
        </S.ClothImage>
        <S.BasicInfo>
          <S.Title>
            <Title1 className="title">기본 정보</Title1>
          </S.Title>
          <S.Information>
            <Input>
              <Input.Label size="small">카테고리</Input.Label>
              <Input.Modal
                state={clothCategory !== null}
                result={Category}
                setModalOpen={setCategoryModalOpen}
              />
            </Input>
            <Input>
              <Input.Label size="small">브랜드</Input.Label>
              <Input.Modal
                result={Brand}
                state={clothBrand !== null}
                setModalOpen={setBrandModalOpen}
              />
            </Input>
            <Input>
              <Input.Label size="small">구매처</Input.Label>
              {clothWhereBuy ? (
                <Input.Modal
                  result={WhereToBuy}
                  setModalOpen={setWhereToBuyModalOpen}
                  state={clothWhereBuy?.letter.length > 0}
                  type={clothWhereBuy.type}
                />
              ) : (
                <Input.Modal
                  result={WhereToBuy}
                  setModalOpen={setWhereToBuyModalOpen}
                  state={true}
                />
              )}
            </Input>
          </S.Information>
        </S.BasicInfo>
        <NextButton
          className="nextButton"
          state={nextButtonState}
          onClick={onClickNextButton}
        >
          다음
        </NextButton>
      </S.Layout>
      {categoryModalOpen && (
        <ClothCategoryModal
          isOpen={categoryModalOpen}
          setIsOpen={setCategoryModalOpen}
          setClothCategory={setClothCategory}
          categoryInitial={
            clothCategory
              ? [clothCategory[clothCategory.length - 1]]
              : undefined
          }
        />
      )}
      {brandModalOpen && (
        <BrandModal
          brandModalIsOpen={brandModalOpen}
          setClothBrand={setClothBrand}
          setBrandModalIsOpen={setBrandModalOpen}
        />
      )}
      {whereToBuyModalOpen && (
        <WhereToBuyModal
          isOpen={whereToBuyModalOpen}
          setIsOpen={setWhereToBuyModalOpen}
          setWhereToBuy={setClothWhereBuy}
          storedClothWhereBuy={clothWhereBuy}
        />
      )}
    </>
  );
}
