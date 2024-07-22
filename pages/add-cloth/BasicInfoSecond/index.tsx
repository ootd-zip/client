import { Body2, Body3, Headline1, Headline2, Title1 } from '@/components/UI';
import S from '@/pageStyle/add-cloth/BasicInfoSecond/style';
import { Dispatch, SetStateAction, useState } from 'react';
import Input from '@/components/Input';
import NextButton from '@/components/NextButton';
import PlusButton from '@/components/PlusButton';
import { ColorListType } from '@/components/ColorList';
import { ImageWithTag } from '@/components/Domain/AddOOTD/TagModal';
import { CategoryListType } from '@/components/Domain/AddCloth/ClothCategoryModal';
import ColorSpan from '@/components/ColorList/ColorSpan';
import ColorModal from '@/components/Domain/AddCloth/ColorModal';
import ClothSizeModal, {
  SizeItem,
} from '@/components/Domain/AddCloth/ClothSizeModal';
import AddClothAlert from '@/components/Domain/AddCloth/AddClothAlert';
import { BrandType } from '@/components/BrandList/Brand';
import { ClothWhereBuy } from '..';
import ClothApi from '@/apis/domain/Cloth/ClothApi';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userId } from '@/utils/recoil/atom';
import NextImage from '@/components/NextImage';
import Background from '@/components/Background';
import useRememberScroll from '@/hooks/useRememberScroll';

interface BasicInfoSecondProps {
  clothName: string;
  clothImage: ImageWithTag | undefined;
  clothCategory: CategoryListType[] | null;
  clothBrand: BrandType[] | null;
  clothWhereBuy: ClothWhereBuy;
  open: Boolean;
  handleStep: (next: string) => void;
  clothColor: ColorListType | null;
  setClothColor: Dispatch<SetStateAction<ColorListType | null>>;
  clothSize: SizeItem | null;
  setClothSize: Dispatch<SetStateAction<SizeItem | null>>;
  setOpen: Dispatch<SetStateAction<Boolean>>;
  onClickSubmitButton: () => void;
}

/*
이름: 필수 정보 두번째 단계
역할: 옷 등록 단계 중 필수 정보 두번째 단계 컴포넌트 
*/
export default function BasicInfoSecond({
  clothName,
  clothCategory,
  clothBrand,
  clothImage,
  clothColor,
  clothWhereBuy,
  setClothColor,
  clothSize,
  setClothSize,
  setOpen,
  open,
  handleStep,
}: BasicInfoSecondProps) {
  //색상 모달 렌더링 유무
  const [colorModalOpen, setColorModalOpen] = useState<Boolean>(false);
  //사이즈 모달 렌더링 유무
  const [sizeModalOpen, setSizeModalOpen] = useState<Boolean>(false);
  //추가 정보 추천 Alert 렌더링 유무
  const [alertOpen, setAlertOpen] = useState<Boolean>(false);

  const { postCloth } = ClothApi();
  const router = useRouter();
  const myId = useRecoilValue(userId); //현재 로그인 한 유저의 id

  //이전에 선택한 카테고리 컴포넌트
  const Category = () => {
    return (
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
  };

  //배경 선택 함수
  const onClickBackground = () => {
    if (colorModalOpen) setColorModalOpen(false);
    if (sizeModalOpen) setSizeModalOpen(false);
    if (alertOpen) setAlertOpen(false);
  };

  //다음 단계 버튼 클릭 함수
  const onClickNextButton = () => {
    setAlertOpen(true);
  };

  //색상 추가 버튼 클릭 함수
  const onClickColorPlusButton = () => {
    setColorModalOpen(true);
  };

  //다음 단계 버튼 클릭 함수
  const onClickYesButton = () => {
    handleStep('추가정보');
  };

  //스크롤 위치를 기억하기 위한 훅
  const { reset } = useRememberScroll({ key: `mypage-${myId}-cloth` });

  //아니요 버튼 클릭 함수(필수정보만 등록)
  const onClickNoButton = async () => {
    const payload = {
      purchaseStore: clothWhereBuy.letter,
      purchaseStoreType: clothWhereBuy.type,
      brandId: clothBrand![0].id,
      categoryId: clothCategory![0].detailCategories![0].id,
      colorIds: [...clothColor!].map((item) => item.id),
      isPrivate: !open,
      sizeId: clothSize!.id,
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
        isOpen={colorModalOpen || sizeModalOpen || alertOpen}
        onClick={onClickBackground}
      />
      <S.Layout>
        {/*이전에 등록한 정보*/}
        <S.BasicInfoFirst>
          <Category />
          <Headline1>{clothBrand && clothBrand[0].name}</Headline1>
          <Body2 className="name">{clothName}</Body2>
          <NextImage
            width={106}
            height={106}
            fill={false}
            src={clothImage! && clothImage[0].ootdImage}
            alt=""
          />
          <hr />
        </S.BasicInfoFirst>
        {/*이번에 등록할 정보*/}
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
                        color={item.colorCode}
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
                result={<Body3>{clothSize?.name}</Body3>}
                setModalOpen={setSizeModalOpen}
                state={clothSize !== null}
              />
            </Input>
            <Input>
              <Input.Label size="small" className="label">
                공개 여부
              </Input.Label>
              <Input.TrueFalse
                left="공개"
                right="비공개"
                state={open}
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
            clothColor !== null && clothColor?.length > 0 && clothSize !== null
          }
          onClick={onClickNextButton}
          className="nextButton"
        >
          등록하기
        </NextButton>
      </S.Layout>
      {/*색상 선택 모달*/}
      {colorModalOpen && (
        <ColorModal
          colorInitial={clothColor}
          setIsOpen={setColorModalOpen}
          setClothColor={setClothColor}
          isOpen={colorModalOpen}
        />
      )}
      {/*사이즈 선택 모달*/}
      {sizeModalOpen && (
        <ClothSizeModal
          setIsOpen={setSizeModalOpen}
          setClothSize={setClothSize}
          isOpen={sizeModalOpen}
          categoryId={
            clothCategory![0].state
              ? clothCategory![0].id
              : clothCategory![0].detailCategories![0].id
          }
          clothSizeInitial={clothSize}
        />
      )}
      {/*추가 정보 여부 선택 Alert*/}
      {alertOpen && (
        <AddClothAlert
          onClickYesButton={onClickYesButton}
          onClickNoButton={onClickNoButton}
        />
      )}
    </>
  );
}
