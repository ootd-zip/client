import AppBar from '@/components/Appbar';
import Gallery from '@/components/Gallery/';
import { Title1 } from '@/components/UI';
import { useFunnel } from '@/hooks/use-funnel';
import { useState } from 'react';
import { AiOutlineArrowLeft, AiOutlineClose } from 'react-icons/ai';
import BasicInfoFirst from './BasicInfoFirst';
import { ComponentWithLayout } from '../sign-up';
import { AppLayoutProps } from '@/AppLayout';
import BasicInfoSecond from './BasicInfoSecond';
import AdditionalInfo from './AdditionalInfo';
import { ImageWithTag } from '@/components/Domain/AddOOTD/TagModal';
import { CategoryListType } from '@/components/Domain/AddCloth/ClothCategoryModal';
import { ColorListType } from '@/components/ColorList';
import { useRouter } from 'next/router';
import ClothName from './ClothName';
import { SizeItem } from '@/components/Domain/AddCloth/ClothSizeModal';
import ClothApi from '@/apis/domain/Cloth/ClothApi';
import { BrandType } from '@/components/BrandList/Brand';
import { useRecoilValue } from 'recoil';
import { userId } from '@/utils/recoil/atom';
import useRememberScroll from '@/hooks/useRememberScroll';

export interface ClothWhereBuy {
  letter: string;
  type: 'Link' | 'Write';
}

/*
이름: 옷 추가 페이지 
*/
const AddCloth: ComponentWithLayout = () => {
  //옷 등록 단계
  const steps = ['편집', '제품명', '기본정보1', '기본정보2', '추가정보'];
  //단계별 처리를 위한 Funnel 사용
  const [Funnel, currentStep, handleStep] = useFunnel(steps);
  //옷 이미지
  const [clothImage, setClothImage] = useState<ImageWithTag | undefined>();
  //옷 이름
  const [clothName, setClothName] = useState<string>('');
  //옷 카테고리
  const [clothCategory, setClothCategory] = useState<CategoryListType[] | null>(
    null
  );
  //옷 브랜드
  const [clothBrand, setClothBrand] = useState<BrandType[] | null>(null);
  //옷 구매처
  const [clothWhereBuy, setClothWhereBuy] = useState<ClothWhereBuy>({
    letter: '',
    type: 'Link',
  });
  //옷 색상
  const [clothColor, setClothColor] = useState<ColorListType | null>(null);
  //옷 사이즈
  const [clothSize, setClothSize] = useState<SizeItem | null>(null);
  //옷 공개여부
  const [open, setOpen] = useState<Boolean>(true);
  //옷 구매처
  const [clothBuyDate, setClothBuyDate] = useState('');
  //옷 메모
  const [clothMemo, setClothMemo] = useState('');

  const router = useRouter();
  const myId = useRecoilValue(userId);

  const { postCloth } = ClothApi();

  //스크롤 위치를 기억하기 위한 훅
  const { reset } = useRememberScroll({ key: `mypage-${myId}-cloth` });

  //옷 등록 api 함수
  const onClickSubmitButton = async () => {
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
      purchaseDate: clothBuyDate,
      clothMemo,
      clothBuyDate,
    };

    const result = await postCloth(payload);
    reset();
    if (result) router.push(`/mypage/${myId}`);
  };

  //앱바의 왼쪽 클릭 함수
  const onClickAppbarLeftButton = () => {
    if (currentStep === '제품명') {
      handleStep('편집');
    } else if (currentStep === '기본정보1') {
      handleStep('제품명');
    } else if (currentStep === '기본정보2') {
      handleStep('기본정보1');
    } else {
      handleStep('기본정보2');
    }
  };

  //앱바의 왼쪽 요소
  const AppbarLeftProps = () => {
    if (currentStep === '편집') {
      return <AiOutlineClose onClick={() => router.back()} />;
    } else {
      return <AiOutlineArrowLeft onClick={onClickAppbarLeftButton} />;
    }
  };

  return (
    <Funnel>
      <AppBar
        leftProps={<AppbarLeftProps />}
        middleProps={<Title1>의류 등록</Title1>}
        rightProps={<></>}
      />
      <Funnel.Steps name="편집">
        <Gallery
          setImageAndTag={setClothImage}
          imageAndTag={clothImage!}
          handleStep={handleStep}
          nextStep="제품명"
          item="Cloth"
        />
      </Funnel.Steps>
      <Funnel.Steps name="제품명">
        <ClothName
          setClothName={setClothName}
          clothName={clothName}
          clothImage={clothImage!}
          handleStep={handleStep}
        />
      </Funnel.Steps>
      <Funnel.Steps name="기본정보1">
        <BasicInfoFirst
          clothName={clothName}
          clothImage={clothImage}
          clothCategory={clothCategory}
          clothBrand={clothBrand}
          clothWhereBuy={clothWhereBuy!}
          setClothCategory={setClothCategory}
          setClothBrand={setClothBrand}
          setClothWhereBuy={setClothWhereBuy}
          handleStep={handleStep}
        />
      </Funnel.Steps>
      <Funnel.Steps name="기본정보2">
        <BasicInfoSecond
          clothWhereBuy={clothWhereBuy}
          clothName={clothName}
          clothImage={clothImage}
          clothCategory={clothCategory}
          clothBrand={clothBrand}
          handleStep={handleStep}
          clothColor={clothColor}
          setClothColor={setClothColor}
          clothSize={clothSize}
          setClothSize={setClothSize}
          open={open}
          setOpen={setOpen}
          onClickSubmitButton={onClickSubmitButton}
        />
      </Funnel.Steps>
      <Funnel.Steps name="추가정보">
        <AdditionalInfo
          clothName={clothName}
          clothBrand={clothBrand}
          clothCategory={clothCategory}
          clothImage={clothImage}
          clothMemo={clothMemo}
          setClothBuyDate={setClothBuyDate}
          setClothMemo={setClothMemo}
          onClickSubmitButton={onClickSubmitButton}
        />
      </Funnel.Steps>
    </Funnel>
  );
};

export default AddCloth;

AddCloth.Layout = ({ children }: AppLayoutProps) => {
  return <>{children}</>;
};

AddCloth.Layout.displayName = 'AddClothLayout';
