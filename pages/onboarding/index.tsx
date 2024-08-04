/* eslint-disable @next/next/no-img-element */
import { AppLayoutProps } from '@/AppLayout';
import { ComponentWithLayout } from '../sign-up';
import S from '@/pageStyle/onboarding/style';
import { Body3, Body4, Button3, Headline1 } from '@/components/UI';
import Button from '@/components/Button';
import { useRouter } from 'next/router';
import Link from 'next/link';

/*
이름: 온보딩 페이지 
*/
const Onboarding: ComponentWithLayout = () => {
  const router = useRouter();

  return (
    <S.Layout>
      <S.TypoGraphy>
        <Headline1 className="headline">
          오늘도 옷장 앞에서 <br /> 고민하는 당신을 위해
        </Headline1>
        <Body3 className="body">
          내가 따라입고 싶은 옷도 좋지만
          <br />내 옷장에서 바로 꺼내입을 수 있는 ootd를 알려드릴게요.
        </Body3>
      </S.TypoGraphy>
      <Button
        onClick={() => router.push('/sign-in')}
        size="big"
        backgroundColor="accent"
        color="grey_00"
        border={false}
        className="button"
      >
        <Button3>시작하기</Button3>
      </Button>
      <S.Login>
        <Body4 className="isuser">이미 계정이 있다면?</Body4>
        <Link href="/sign-in">
          <Body4 className=" login" state="emphasis">
            로그인
          </Body4>
        </Link>
      </S.Login>
    </S.Layout>
  );
};
export default Onboarding;

Onboarding.Layout = ({ children }: AppLayoutProps) => {
  return <>{children}</>;
};

Onboarding.Layout.displayName = 'OnbardingLayout';
