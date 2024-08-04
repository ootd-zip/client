import AppBar from '@/components/Appbar';
import Gallery from '@/components/Gallery/';
import { Title1 } from '@/components/UI';
import { useFunnel } from '@/hooks/use-funnel';
import { useEffect, useState } from 'react';
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

export interface suggestionColorType {
  id: number;
  name: string;
  colorCode: string;
}

const AddCloth: ComponentWithLayout = () => {
  const steps = ['편집', '제품명', '기본정보', '추가정보'];
  const [Funnel, currentStep, handleStep] = useFunnel(steps);
  const [clothImage, setClothImage] = useState<ImageWithTag | undefined>();
  const [clothName, setClothName] = useState<string>('');
  const [clothCategory, setClothCategory] = useState<CategoryListType[] | null>(
    null
  );
  const [clothBrand, setClothBrand] = useState<BrandType[] | null>(null);
  const [clothWhereBuy, setClothWhereBuy] = useState<ClothWhereBuy>({
    letter: '',
    type: 'Link',
  });
  const [clothColor, setClothColor] = useState<ColorListType | null>(null);
  const [clothSize, setClothSize] = useState<SizeItem | null>(null);
  const [clothIsOpen, setClothIsOpen] = useState<Boolean>(true);
  const [clothBuyDate, setClothBuyDate] = useState('');
  const [clothMemo, setClothMemo] = useState('');
  const [suggestionColor, setSuggestionColor] = useState<suggestionColorType>();

  const router = useRouter();
  const myId = useRecoilValue(userId);

  const { postCloth } = ClothApi();
  const { reset } = useRememberScroll({ key: `mypage-${myId}-cloth` });

  const onClickSubmitButton = async () => {
    //옷 등록 api
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

  const onClickAppbarLeftButton = () => {
    if (currentStep === '제품명') {
      handleStep('편집');
    } else if (currentStep === '기본정보') {
      handleStep('제품명');
    } else {
      handleStep('기본정보');
    }
  };
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
          suggestionColor={suggestionColor}
          setSuggestionColor={setSuggestionColor}
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
      <Funnel.Steps name="기본정보">
        <BasicInfoFirst
          clothName={clothName}
          clothImage={clothImage}
          clothCategory={clothCategory}
          clothBrand={clothBrand}
          clothColor={clothColor}
          clothIsOpen={clothIsOpen}
          setClothCategory={setClothCategory}
          setClothBrand={setClothBrand}
          handleStep={handleStep}
          setClothIsOpen={setClothIsOpen}
          setClothColor={setClothColor}
          suggestionColor={suggestionColor}
        />
      </Funnel.Steps>
      <Funnel.Steps name="추가정보">
        <AdditionalInfo
          clothName={clothName}
          clothBrand={clothBrand}
          clothCategory={clothCategory}
          clothImage={clothImage}
          clothMemo={clothMemo}
          clothWhereBuy={clothWhereBuy}
          clothSize={clothSize}
          setClothBuyDate={setClothBuyDate}
          setClothMemo={setClothMemo}
          onClickSubmitButton={onClickSubmitButton}
          setClothWhereBuy={setClothWhereBuy}
          setClothSize={setClothSize}
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
