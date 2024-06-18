import AppBar from '@/components/Appbar';
import S from '@/pageStyle/setting/style';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { Body3, Title1 } from '@/components/UI';
import Header from '@/components/Header';
import SettingBlock from '@/components/Setting/SettingBlock';
import {
  getReactNativeMessage,
  sendReactNativeMessage,
} from '@/utils/reactNativeMessage';
import Toast from '@/components/Toast';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { UserApi } from '@/apis/domain/User/UserApi';

export default function Setting() {
  const router = useRouter();

  const [queryState, setQueryState] = useState<Boolean>(false);
  const [URLState, setURLState] = useState<any>(false);
  const [platform, setPlatform] = useState<string>('');

  const { getSocilLoginProvider } = UserApi();

  useEffect(() => {
    const ferchData = async () => {
      const result = await getSocilLoginProvider();
      setPlatform(result);
    };

    ferchData();
  }, []);

  const { logout } = UserApi();

  const shareButton = () => {
    console.log('이메일 복사');
    setURLState(false); // 재공유 toast 노출 초기화
    sendReactNativeMessage({ type: 'copyEmail' }); // native로 클립보드 복사 처리
  };

  useEffect(() => {
    if (router.query.state !== undefined) {
      setQueryState(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      getReactNativeMessage(setURLState);
    }
  }, []);

  const onClickLogoutButton = async () => {
    const result = await logout();
    if (result) router.push('/sign-in');
  };

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
          middleProps={<Title1>설정</Title1>}
          rightProps={<></>}
        />
        <S.SettingDiv>
          <S.MyAccount>
            <Header text="내 계정" />

            <S.Social>
              <Body3 className="socialTitle">소셜 로그인 정보</Body3>
              <Body3 className="socialInfo">{platform}</Body3>
            </S.Social>

            <SettingBlock
              text="내 취향정보 수정"
              buttonClick={() => router.push('/like-info')}
            />
            <SettingBlock
              text="차단한 계정"
              buttonClick={() => router.push('/blocked-account')}
            />
          </S.MyAccount>

          <S.ServiceInfo>
            <Header text="서비스 정보" />
            <SettingBlock text="문의하기" shareButton={shareButton} />
            {/* <SettingBlock
              text="이용 정책"
              buttonClick={() => router.push('/UsagePolicy')}
            />
            <SettingBlock
              text="패널티 정책"
              buttonClick={() => router.push('/PanaltyInfo')}
            />
            <SettingBlock
              text="커뮤니티 가이드라인"
              buttonClick={() => router.push('/CommunityGuideline')}
            /> */}
            <SettingBlock
              text="이용약관"
              buttonClick={() => router.push('/agree-policy')}
            />
            <SettingBlock
              text="개인정보 처리 방침"
              buttonClick={() => router.push('/privacy-policy')}
            />
            <SettingBlock
              text="공지사항"
              buttonClick={() => router.push('/announcement')}
            />
            {/* <SettingBlock
              text="오픈소스 라이선스"
              buttonClick={() => router.push('/License')}
            /> */}
          </S.ServiceInfo>

          <S.AccountInfo>
            <S.Text onClick={onClickLogoutButton}>
              <Body3>로그아웃</Body3>
            </S.Text>
          </S.AccountInfo>

          <S.AccountInfo>
            <S.Text onClick={() => router.push('/with-draw')}>
              <Body3>탈퇴하기</Body3>
            </S.Text>
          </S.AccountInfo>

          {URLState && (
            <Toast
              text="이메일이 클립보드에 복사되었습니다."
              setState={setURLState}
              state={URLState}
            />
          )}
          {queryState && (
            <Toast
              text="취향정보 수정이 완료되었습니다."
              setState={setQueryState}
              state={queryState}
            />
          )}
        </S.SettingDiv>
      </S.Layout>
    </>
  );
}
