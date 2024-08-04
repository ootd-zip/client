import Gallery from '@/components/Gallery';
import { useFunnel } from '@/hooks/use-funnel';
import ClothTag from './ClothTag';
import WriteOOTD from './WriteOOTD';
import { useEffect, useState } from 'react';
import { AppLayoutProps } from '@/AppLayout';
import { ComponentWithLayout } from '../sign-up';
import AppBar from '@/components/Appbar';
import { AiOutlineArrowLeft, AiOutlineClose } from 'react-icons/ai';
import { Button3, Title1 } from '@/components/UI';
import { useRouter } from 'next/router';
import { ImageWithTag } from '@/components/Domain/AddOOTD/TagModal';
import {
  getReactNativeMessage,
  sendReactNativeMessage,
} from '@/utils/reactNativeMessage';

export interface Style {
  id: number;
  name: string;
  state?: Boolean;
}

/*
이름: ootd 추가 페이지
*/
const AddOOTD: ComponentWithLayout = () => {
  //ootd 등록 단계
  const steps = ['편집', '태그', '게시하기'];
  //단계별 처리를 위한 Funnel 사용
  const [Funnel, currentStep, handleStep] = useFunnel(steps);
  //ootd 이미지
  const [imageAndTag, setImageAndTag] = useState<ImageWithTag | undefined>([]); //이미지 + 태그
  const [string, setString] = useState(''); //게시글
  const [selectedStyle, setSelectedStyle] = useState<Style[]>([]);
  const [open, setOpen] = useState<Boolean>(true); //공개여부
  const [complete, setComplete] = useState<Boolean>(false); //게시 완료 여부
  const router = useRouter();
  const [tagSelectedState, setTagSelectedState] = useState<Boolean>(false); //ootd에 옷 태그 여부
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

  const [realImageURL, setRealImageURL] = useState<string[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      getReactNativeMessage(setRealImageURL);
    }
  }, []);
  const onClickSkipButton = () => {
    handleStep('게시하기');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <AppBar
        leftProps={<AppbarLeftProps />}
        middleProps={<Title1>{currentStep}</Title1>}
        rightProps={
          <>
            {!tagSelectedState && currentStep === '태그' && (
              <Button3 onClick={onClickSkipButton}>건너뛰기</Button3>
            )}
          </>
        }
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
            setTagSelectedState={setTagSelectedState}
            tagSelectedState={tagSelectedState}
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
