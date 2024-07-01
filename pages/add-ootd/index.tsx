import Gallery from '@/components/Gallery';
import { useFunnel } from '@/hooks/use-funnel';
import ClothTag from './ClothTag';
import WriteOOTD from './WriteOOTD';
import { useEffect, useState } from 'react';
import { AppLayoutProps } from '@/AppLayout';
import { ComponentWithLayout } from '../sign-up';
import AppBar from '@/components/Appbar';
import { AiOutlineArrowLeft, AiOutlineClose } from 'react-icons/ai';
import { Title1 } from '@/components/UI';
import { useRouter } from 'next/router';
import { ImageWithTag } from '@/utils/types/OOTD.types';

export interface Style {
  id: number;
  name: string;
  state?: Boolean;
}

const AddOOTD: ComponentWithLayout = () => {
  const steps = ['편집', '태그', '게시하기'];
  const [Funnel, currentStep, handleStep] = useFunnel(steps);
  const [imageAndTag, setImageAndTag] = useState<ImageWithTag | undefined>(); //이미지 + 태그
  const [string, setString] = useState<string>(''); //게시글
  const [selectedStyle, setSelectedStyle] = useState<Style[]>([]);
  const [open, setOpen] = useState<Boolean>(true); //공개여부
  const [complete, setComplete] = useState<Boolean>(false); //게시 완료 여부
  const router = useRouter();

  //앱바 왼쪽 네비게이션 관리
  const AppbarLeftProps = () => {
    if (currentStep === '편집') {
      return <AiOutlineClose onClick={onClickAppbarLeftButton} />;
    } else {
      return <AiOutlineArrowLeft onClick={onClickAppbarLeftButton} />;
    }
  };

  //앱바 왼쪽 네비게이션 클릭
  const onClickAppbarLeftButton = () => {
    if (currentStep === '편집') {
      router.back();
    } else if (currentStep === '태그') {
      handleStep('편집');
    } else {
      handleStep('태그');
    }
  };

  //등록완료 조건
  useEffect(() => {
    if (string.length && imageAndTag?.length && selectedStyle?.length) {
      setComplete(true);
      return;
    }
    setComplete(false);
  }, [string, imageAndTag, selectedStyle]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <AppBar
        leftProps={<AppbarLeftProps />}
        middleProps={<Title1>{currentStep}</Title1>}
        rightProps={<></>}
      />
      <Funnel>
        <Funnel.Steps name="편집">
          <Gallery
            imageAndTag={imageAndTag}
            setImageAndTag={setImageAndTag}
            handleStep={handleStep}
            nextStep="태그"
            item="OOTD"
          />
        </Funnel.Steps>
        <Funnel.Steps name="태그">
          <ClothTag
            setImageAndTag={setImageAndTag}
            imageAndTag={imageAndTag!}
            handleStep={handleStep}
          />
        </Funnel.Steps>
        <Funnel.Steps name="게시하기">
          <WriteOOTD
            imageAndTag={imageAndTag!}
            string={string}
            setString={setString}
            open={open}
            setOpen={setOpen}
            selectedStyle={selectedStyle}
            setSelectedStyle={setSelectedStyle}
            complete={complete}
          />
        </Funnel.Steps>
      </Funnel>
    </div>
  );
};

export default AddOOTD;

AddOOTD.Layout = ({ children }: AppLayoutProps) => {
  return <>{children}</>;
};

AddOOTD.Layout.displayName = 'AddOOTDLayout';
