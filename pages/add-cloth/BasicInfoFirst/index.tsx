import S from '@/pageStyle/add-cloth/BasicInfoFirst/style';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Input from '@/components/Input';
import { Body2, Body3, Title1 } from '@/components/UI';
import NextButton from '@/components/NextButton';
import { ImageWithTag } from '@/components/Domain/AddOOTD/TagModal';
import ClothCategoryModal, {
  CategoryListType,
} from '@/components/Domain/AddCloth/ClothCategoryModal';
import { BrandType } from '@/components/BrandList/Brand';
import BrandModal from '@/components/Domain/AddCloth/BrandModal';
import NextImage from '@/components/NextImage';
import ArrowLeft from '@/public/images/ArrowLeft.svg';
import Background from '@/components/Background';
import ColorSpan from '@/components/ColorList/BigColor';
import PlusButton from '@/components/PlusButton';
import AddClothAlert from '@/components/Domain/AddCloth/AddClothAlert';
import ClothApi from '@/apis/domain/Cloth/ClothApi';
import useRememberScroll from '@/hooks/useRememberScroll';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userId } from '@/utils/recoil/atom';
import { ColorListType } from '@/components/ColorList';
import ColorModal from '@/components/Domain/AddCloth/ColorModal';
import { suggestionColorType } from '..';
import RecommendColor from '@/components/Domain/AddCloth/RecommendColor';

interface BaiscInfoFirst {
  clothName: string;
  clothImage: ImageWithTag | undefined;
  clothCategory: CategoryListType[] | null;
  clothBrand: BrandType[] | null;
  clothColor: ColorListType | null;
  clothIsOpen: Boolean;
  setClothColor: Dispatch<SetStateAction<ColorListType | null>>;
  setClothCategory: Dispatch<SetStateAction<CategoryListType[] | null>>;
  setClothBrand: Dispatch<SetStateAction<BrandType[] | null>>;
  setClothIsOpen: Dispatch<SetStateAction<Boolean>>;
  handleStep: (next: string) => void;
  suggestionColor?: suggestionColorType;
}

export default function BasicInfoFirst({
  clothName,
  clothImage,
  clothCategory,
  clothBrand,
  clothColor,
  clothIsOpen,
  setClothCategory,
  setClothBrand,
  handleStep,
  setClothColor,
  setClothIsOpen,
  suggestionColor,
}: BaiscInfoFirst) {
  const [categoryModalOpen, setCategoryModalOpen] = useState<Boolean>(false);
  const [nextButtonState, setNextButtonState] = useState<Boolean>(false);
  const [brandModalOpen, setBrandModalOpen] = useState<Boolean>(false);
  const [alertOpen, setAlertOpen] = useState<Boolean>(false);
  const [colorModalOpen, setColorModalOpen] = useState<Boolean>(false);

  const { postCloth } = ClothApi();

  const router = useRouter();
  const myId = useRecoilValue(userId);

  useEffect(() => {
    if (
      clothCategory !== null &&
      clothBrand !== null &&
      clothColor !== null &&
      clothColor?.length > 0
    ) {
      setNextButtonState(true);
      return;
    }
    setNextButtonState(false);
  }, [clothCategory, clothBrand, clothColor]);

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

  const { reset } = useRememberScroll({ key: `mypage-${myId}-cloth` });

  const onClickBackground = () => {
    if (categoryModalOpen) setCategoryModalOpen(false);
    if (brandModalOpen) setBrandModalOpen(false);
    if (colorModalOpen) setColorModalOpen(false);
  };

  const onClickColorPlusButton = () => {
    setColorModalOpen(true);
  };

  const onClickAlertNoButton = async () => {
    const payload = {
      brandId: clothBrand![0].id,
      categoryId: clothCategory![0].detailCategories![0].id,
      colorIds: [...clothColor!].map((item) => item.id),
      isPrivate: !clothIsOpen,
      clothesImageUrl: clothImage![0].ootdImage,
      name: clothName,
    };

    const result = await postCloth(payload);

    if (result) {
      reset();
      router.replace(`/mypage/${myId}`);
    }
  };

  return (
    <>
      <Background
        isOpen={
          categoryModalOpen || brandModalOpen || colorModalOpen || alertOpen
        }
        onClick={onClickBackground}
      />
      <S.Layout>
        <div className="divider">
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
                <Input.Label size="small" className="label">
                  카테고리
                </Input.Label>
                <Input.Modal
                  state={clothCategory !== null}
                  result={Category}
                  setModalOpen={setCategoryModalOpen}
                />
              </Input>
              <Input>
                <Input.Label size="small" className="label">
                  브랜드
                </Input.Label>
                <Input.Modal
                  result={Brand}
                  state={clothBrand !== null}
                  setModalOpen={setBrandModalOpen}
                />
              </Input>
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
                          color={item.colorCode}
                          name={item.name}
                          state={false}
                        />
                      );
                    })}
                  <PlusButton onClickPlusButton={onClickColorPlusButton} />
                </S.ClothColorSpanList>
                {suggestionColor && !clothColor && (
                  <RecommendColor
                    suggestionColor={suggestionColor!}
                    setClothColor={setClothColor}
                  />
                )}
              </Input>
              <Input>
                <Input.Label size="small" className="label">
                  공개 여부
                </Input.Label>
                <Input.TrueFalse
                  left="공개"
                  right="비공개"
                  state={clothIsOpen}
                  setState={setClothIsOpen}
                />
                <Input.HelperText className="helpertext" state={1}>
                  공개로 설정하면 다른사람과 아이템을 공유할 수 있어요.
                </Input.HelperText>
              </Input>
            </S.Information>
          </S.BasicInfo>
        </div>
        <NextButton
          className="nextButton"
          state={nextButtonState}
          onClick={() => setAlertOpen(true)}
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
      {colorModalOpen && (
        <ColorModal
          colorInitial={clothColor}
          setIsOpen={setColorModalOpen}
          setClothColor={setClothColor}
          isOpen={colorModalOpen}
        />
      )}
      {alertOpen && (
        <AddClothAlert
          onClickYesButton={() => handleStep('추가정보')}
          onClickNoButton={onClickAlertNoButton}
        />
      )}
    </>
  );
}
