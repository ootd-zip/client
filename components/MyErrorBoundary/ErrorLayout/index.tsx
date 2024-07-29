import { Button3, Headline2 } from '@/components/UI';
import S from './style';
import { useRouter } from 'next/router';
import Portal from '@/components/Portal';
import Toast from '@/components/Toast';
import { Dispatch, SetStateAction } from 'react';

interface ErrorLayoutPropsType {
  headline: string;
  body: React.ReactNode;
  resetErrorBoundary: () => void;
  URLState?: Boolean;
  setURLState?: Dispatch<SetStateAction<Boolean>>;
}

/*
이름: 에러 레이아웃
역할: 에러 바운더리 페이지에서 사용되는 에러 레이아웃
*/
export default function ErrorLayout({
  headline,
  body,
  URLState,
  resetErrorBoundary,
  setURLState,
}: ErrorLayoutPropsType) {
  const router = useRouter();

  const onClickPrev = () => {
    router.back();
    resetErrorBoundary();
  };

  return (
    <Portal>
      <S.Layout>
        <S.Alert>
          <Headline2>{headline}</Headline2>
          <S.Body>{body}</S.Body>
          <S.Button>
            <button onClick={onClickPrev} className="left">
              <Button3>이전 화면으로 돌아가기</Button3>
            </button>
            <button onClick={() => resetErrorBoundary()} className="right">
              <Button3>다시 시도하기</Button3>
            </button>
          </S.Button>
        </S.Alert>
        {URLState && (
          <Toast
            state={URLState}
            setState={setURLState!}
            text="이메일이 클립보드에 복사되었습니다."
          />
        )}
      </S.Layout>
    </Portal>
  );
}
