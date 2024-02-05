import AppBar from '@/components/Appbar';
import Headline from '@/components/UI/TypoGraphy/Title1';
import { AiOutlineClose } from 'react-icons/ai';
import S from './style';
import Body from '@/components/UI/TypoGraphy/Body2';
import { Headline1 } from '@/components/UI';
import { AppLayoutProps } from '@/AppLayout';
import { ComponentWithLayout } from '../sign-up';
import { SignInApi } from '@/apis/domain/SignIn/SignInApi';
import SocialLoginButton from '@/components/Domain/SignIn/SocialLoginButton';

const SignIn: ComponentWithLayout = () => {
  const [, routing] = SignInApi();

  return (
    <>
      <AppBar
        leftProps={<AiOutlineClose />}
        middleProps={<Headline>logo</Headline>}
        rightProps={<></>}
      />
      <S.Layout>
        <S.Main>
          <S.Logo>{}</S.Logo>
          <S.Text>
            <Headline1>ootd.zip</Headline1>
            <Body>
              Lorem ipsum dolor sit amet consectetur. Iaculis lorem viverra
              pellentesque etiam.
            </Body>
          </S.Text>
          <S.SocialLoginButton>
            <SocialLoginButton
              platform="KAKAO"
              onClick={() => routing('KAKAO')}
            />
            <SocialLoginButton
              platform="APPLE"
              onClick={() => routing('APPLE')}
            />
            <SocialLoginButton
              platform="GOOGLE"
              onClick={() => routing('GOOGLE')}
            />
          </S.SocialLoginButton>
        </S.Main>
      </S.Layout>
    </>
  );
};

export default SignIn;

SignIn.Layout = ({ children }: AppLayoutProps) => {
  return <>{children}</>;
};

SignIn.Layout.displayName = 'SignInLayout';
