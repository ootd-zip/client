import AppBar from '@/components/Appbar';
import S from '@/pageStyle/brand-suggestion/style';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useRouter } from 'next/router';
import {
  Body2,
  Body3,
  Body4,
  Button3,
  Headline1,
  Headline2,
} from '@/components/UI';
import { ComponentWithLayout } from '../sign-up';
import { AppLayoutProps } from '@/AppLayout';
import Input from '@/components/Input';
import { useEffect, useState } from 'react';
import ClothApi from '@/apis/domain/Cloth/ClothApi';

/*
이름: 브랜드 건의하기 페이지
역할: 브랜드 건의하기 페이지
*/

const BrandSuggestion: ComponentWithLayout = () => {
  const router = useRouter();

  const [noBrandName, setNoBrandName] = useState<string>('');
  const [possible, setPossible] = useState<Boolean>(false);

  const { postBrand } = ClothApi();

  const onClickSubmitButton = async () => {
    if (noBrandName !== '' && possible) {
      const result = await postBrand({ requestContents: noBrandName });
      if (result) {
        router.push({
          pathname: `/settings`,
          query: { state: 'brandSuggestionSuccess' },
        });
      } else {
        alert('실패');
      }
    }
  };

  useEffect(() => {
    if (noBrandName) {
      setPossible(true);
    } else {
      setPossible(false);
    }
  }, [noBrandName]);

  return (
    <>
      <S.Layout>
        <AppBar
          leftProps={
            <AiOutlineArrowLeft
              onClick={() => router.back()}
              className="arrowleft"
            />
          }
          middleProps={<></>}
          rightProps={<></>}
        />
        <S.Content>
          <Headline2>찾고 있는 브랜드를</Headline2>
          <Headline2>알려주세요.</Headline2>
          <div className="warning">
            <Body3>저희에게 알려주시면 최대한 빨리 업데이트하겠습니다.</Body3>
            <Body3>업데이트가 완료되면 알림을 통해 바로 알려드릴게요!</Body3>
          </div>
          <Input>
            <Input.Text
              placeholder="브랜드명 (나이키, cos 등)"
              size="big"
              line="outline"
              state={true}
              onChange={setNoBrandName}
            />
          </Input>
        </S.Content>
        <S.Button state={possible} onClick={onClickSubmitButton}>
          <Button3>제출하기</Button3>
        </S.Button>
      </S.Layout>
    </>
  );
};

export default BrandSuggestion;

BrandSuggestion.Layout = ({ children }: AppLayoutProps) => {
  return <>{children}</>;
};

BrandSuggestion.Layout.displayName = 'BrandSuggestion';
