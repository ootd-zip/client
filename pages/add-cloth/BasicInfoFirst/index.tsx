import S from '@/pageStyle/add-cloth/BasicInfoFirst/style';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
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
import Toast from '@/components/Toast';

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
  onClickSubmitButton: () => void;
}
/*
이름: 필수 정보 첫단계
역할: 옷 등록 단계 중 필수 정보를 입력하는 첫번째 단계
*/
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
  onClickSubmitButton,
}: BaiscInfoFirst) {
  //카테고리 선택 모달 렌더링 유무
  const [categoryModalOpen, setCategoryModalOpen] = useState<Boolean>(false);
  //다음 단계 버튼 활성화 유무
  const [nextButtonState, setNextButtonState] = useState<Boolean>(false);
  const [brandModalOpen, setBrandModalOpen] = useState<Boolean>(false);
  const [alertOpen, setAlertOpen] = useState<Boolean>(false);
  const [colorModalOpen, setColorModalOpen] = useState<Boolean>(false);

  const { postCloth } = ClothApi();

  const router = useRouter();
  const myId = useRecoilValue(userId);

  //카테고리, 브랜드, 구매처 변동이 있으면 확인 후 다음 단계 버튼 상태 업데이트
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

  //카테고리 선택시 나타나는 카테고리 컴포넌트
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

  //브랜드 선택시 나타나는 브랜드 컴포넌트
  const Brand = <Body3>{clothBrand && clothBrand[0].name}</Body3>;

  const { reset } = useRememberScroll({ key: `mypage-${myId}-cloth` });

  //배경 클릭 함수
  const onClickBackground = () => {
    if (categoryModalOpen) setCategoryModalOpen(false);
    if (brandModalOpen) setBrandModalOpen(false);
    if (colorModalOpen) setColorModalOpen(false);
  };

  const onClickColorPlusButton = () => {
    setColorModalOpen(true);
  };

  const [brandSubmitStatus, setNoBrandSubmitStatus] = useState<Boolean>(false);
  const [toastOpen, setToastOpen] = useState<Boolean>(false);

  useEffect(() => {
    if (!brandModalOpen && brandSubmitStatus) {
      setToastOpen(true);
    }
  }, [brandSubmitStatus, brandModalOpen]);

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
        {toastOpen && (
          <Toast
            className="brandSuggestion"
            text={`브랜드 건의가 정상적으로 접수되었습니다.`}
            setState={setToastOpen}
            state={toastOpen}
          />
        )}
        <NextButton
          className="nextButton"
          state={nextButtonState}
          onClick={() => setAlertOpen(true)}
        >
          다음
        </NextButton>
      </S.Layout>
      {/*카테고리 선택 모달*/}
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
      {/*브랜드 선택 모달*/}
      {brandModalOpen && (
        <BrandModal
          brandModalIsOpen={brandModalOpen}
          setClothBrand={setClothBrand}
          setBrandModalIsOpen={setBrandModalOpen}
          setNoBrandSubmitStatus={setNoBrandSubmitStatus}
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
          onClickNoButton={() => onClickSubmitButton()}
        />
      )}
    </>
  );
}
