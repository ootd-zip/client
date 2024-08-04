import S from '@/pageStyle/edit-cloth/BasicInfo/style';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Input from '@/components/Input';
import { Body3, Title1 } from '@/components/UI';
import { ClothWhereBuy } from '../[...ClothNumber]';
import { ImageWithTag } from '@/components/Domain/AddOOTD/TagModal';
import ClothCategoryModal, {
  CategoryListType,
} from '@/components/Domain/AddCloth/ClothCategoryModal';
import WhereToBuyModal from '@/components/Domain/AddCloth/WhereToBuyModal';
import { BrandType } from '@/components/BrandList/Brand';
import BrandModal from '@/components/Domain/AddCloth/BrandModal';
import { ColorListType } from '@/components/ColorList';
import ClothSizeModal, {
  SizeItem,
} from '@/components/Domain/AddCloth/ClothSizeModal';
import ColorSpan from '@/components/ColorList/BigColor';
import PlusButton from '@/components/PlusButton';
import ColorModal from '@/components/Domain/AddCloth/ColorModal';
import PrevNextButton from '@/components/PrevNextButton';
import WriteIcon from '@/public/images/WriteIcon.svg';
import {
  getReactNativeMessage,
  sendReactNativeMessage,
} from '@/utils/reactNativeMessage';
import NextImage from '@/components/NextImage';
import Background from '@/components/Background';

interface BasicInfoProps {
  clothName: string;
  clothImage: ImageWithTag | undefined;
  clothCategory: CategoryListType[] | null;
  clothBrand: BrandType[] | null;
  clothColor: ColorListType | null;
  clothOpen: Boolean;
  setClothImage: Dispatch<SetStateAction<ImageWithTag | undefined>>;
  setClothName: Dispatch<SetStateAction<string>>;
  setClothCategory: Dispatch<SetStateAction<CategoryListType[] | null>>;
  setClothBrand: Dispatch<SetStateAction<BrandType[] | null>>;
  setClothColor: Dispatch<SetStateAction<ColorListType | null>>;
  setClothOpen: Dispatch<SetStateAction<Boolean>>;
  handleStep: (next: string) => void;
  onClickSubmitButton: () => void;
}

export default function BasicInfo({
  clothName,
  clothImage,
  clothCategory,
  clothBrand,
  clothColor,
  clothOpen,
  setClothImage,
  setClothName,
  setClothCategory,
  setClothBrand,
  setClothOpen,
  setClothColor,
  handleStep,
  onClickSubmitButton,
}: BasicInfoProps) {
  const [categoryModalOpen, setCategoryModalOpen] = useState<Boolean>(false);
  const [brandModalOpen, setBrandModalOpen] = useState<Boolean>(false);
  const [colorModalOpen, setColorModalOpen] = useState<Boolean>(false);

  const Category = clothCategory !== null && (
    <S.Category>
      <Body3>{clothCategory && clothCategory[0]?.name}</Body3>
      <Body3>&gt;</Body3>
      <Body3 style={{ fontWeight: '700' }}>
        {clothCategory &&
          clothCategory[0]?.detailCategories &&
          clothCategory[0]?.detailCategories[0].name}
      </Body3>
    </S.Category>
  );

  const Brand = <Body3>{clothBrand && clothBrand[0]?.name}</Body3>;

  const onClickNextButton = () => {
    handleStep('추가정보');
  };

  const onClickBackground = () => {
    if (categoryModalOpen) setCategoryModalOpen(false);
    if (brandModalOpen) setBrandModalOpen(false);
    if (colorModalOpen) setColorModalOpen(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      getReactNativeMessage(setClothImage);
    }
  }, []);

  const onClickImage = () => {
    sendReactNativeMessage({ type: 'Cloth' });
  };
  return (
    <>
      <Background
        isOpen={categoryModalOpen || brandModalOpen || colorModalOpen}
        onClick={onClickBackground}
      />
      <S.Layout>
        <S.ClothImage>
          <NextImage
            onClick={onClickImage}
            src={clothImage !== undefined ? clothImage[0].ootdImage : ''}
            alt=""
            fill={false}
            width={106}
            height={106}
          />
          <WriteIcon className="writeIcon" />
        </S.ClothImage>
        <S.BasicInfo>
          <S.Title>
            <Title1 className="title">기본 정보</Title1>
          </S.Title>
          <S.Information>
            <Input>
              <Input.Label size="small" className="subtitle">
                제품명
              </Input.Label>
              <Input.Text
                defaultValue={clothName}
                size="big"
                onChange={setClothName}
                line="outline"
              />
            </Input>
            <Input>
              <Input.Label size="small" className="subtitle">
                카테고리
              </Input.Label>
              <Input.Modal
                state={clothCategory !== null}
                result={Category}
                setModalOpen={setCategoryModalOpen}
              />
            </Input>
            <Input>
              <Input.Label size="small" className="subtitle">
                브랜드
              </Input.Label>
              <Input.Modal
                result={Brand}
                state={clothBrand !== null}
                setModalOpen={setBrandModalOpen}
              />
            </Input>

            <Input>
              <Input.Label size="small" className="subtitle">
                색상
              </Input.Label>
              <S.ClothColorSpanList>
                {clothColor &&
                  clothColor.map((item, index) => {
                    return (
                      <ColorSpan
                        key={index}
                        index={index}
                        color={item.colorCode}
                        name={item.name}
                        state={false}
                      />
                    );
                  })}
                <PlusButton onClickPlusButton={() => setColorModalOpen(true)} />
              </S.ClothColorSpanList>
            </Input>

            <Input>
              <Input.Label size="small" className="subtitle">
                공개 여부
              </Input.Label>
              <Input.TrueFalse
                left="공개"
                right="비공개"
                state={clothOpen}
                setState={setClothOpen}
              />
              <Input.HelperText className="helpertext" state={1}>
                공개로 설정하면 다른사람과 아이템을 공유할 수 있어요.
              </Input.HelperText>
            </Input>
          </S.Information>
        </S.BasicInfo>
      </S.Layout>
      <PrevNextButton
        onClickPrevButton={onClickNextButton}
        onClickNextButton={onClickSubmitButton}
        prev="다음"
        next="완료"
      />
      {categoryModalOpen && (
        <ClothCategoryModal
          isOpen={categoryModalOpen}
          setIsOpen={setCategoryModalOpen}
          setClothCategory={setClothCategory}
        />
      )}
      {brandModalOpen && (
        <BrandModal
          brandModalIsOpen={brandModalOpen}
          setClothBrand={setClothBrand}
          setBrandModalIsOpen={setBrandModalOpen}
        />
      )}

      {colorModalOpen && (
        <ColorModal
          colorInitial={clothColor}
          setIsOpen={setColorModalOpen}
          setClothColor={setClothColor}
          isOpen={colorModalOpen}
        />
      )}
    </>
  );
}
