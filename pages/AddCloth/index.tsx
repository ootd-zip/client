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

export interface ClothWhereBuy {
  letter: string;
  type: 'link' | 'write';
}

const AddCloth: ComponentWithLayout = () => {
  const steps = ['편집', '기본정보1', '기본정보2', '추가정보'];
  const [Funnel, currentStep, handleStep] = useFunnel(steps);
  const [clothImage, setClothImage] = useState<ImageWithTag | undefined>();

  const [clothCategory, setClothCategory] = useState<CategoryListType[] | null>(
    null
  );
  const [clothBrand, setClothBrand] = useState<string>('');
  const [clothWhereBuy, setClothWhereBuy] = useState<ClothWhereBuy>({
    letter: '',
    type: 'write',
  });
  const [clothColor, setClothColor] = useState<ColorListType | null>([]);
  const [clothSize, setClothSize] = useState<string>('');
  const [open, setOpen] = useState('공개');
  const [clothByName, setClothByName] = useState('');
  const [clothBuyDate, setClothBuyDate] = useState('');
  const [clothMemo, setClothMemo] = useState('');

  const router = useRouter();

  const onClickSubmitButton = () => {
    //옷 등록 api
    alert(
      `${clothCategory},  
      ${clothBrand}, 
      ${clothColor}, 
      ${clothImage}, 
      ${clothWhereBuy}, 
      ${open}
      ${clothByName}
      ${clothMemo}
      ${clothBuyDate}
      `
    );
  };

  const onClickAppbarLeftButton = () => {
    if (currentStep === '기본정보1') {
      handleStep('편집');
    } else if (currentStep === '기본정보2') {
      handleStep('기본정보1');
    } else {
      handleStep('기본정보2');
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
        middleProps={<Title1>의류등록</Title1>}
        rightProps={<></>}
      />
      <Funnel.Steps name="편집">
        <Gallery
          setImageAndTag={setClothImage}
          imageAndTag={clothImage!}
          handleStep={handleStep}
          nextStep="기본정보1"
          item="Cloth"
        />
      </Funnel.Steps>
      <Funnel.Steps name="기본정보1">
        <BasicInfoFirst
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
          clothImage={clothImage}
          clothCategory={clothCategory}
          clothBrand={clothBrand}
          clothWhereBuy={clothWhereBuy!}
          handleStep={handleStep}
          clothColor={clothColor}
          setClothColor={setClothColor}
          clothSize={clothSize}
          setClothSize={setClothSize}
          open={open}
          setOpen={setOpen}
        />
      </Funnel.Steps>
      <Funnel.Steps name="추가정보">
        <AdditionalInfo
          clothBrand={clothBrand}
          clothCategory={clothCategory}
          clothImage={clothImage}
          clothByName={clothByName}
          clothMemo={clothMemo}
          setClothByName={setClothByName}
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
