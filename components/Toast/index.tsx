import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Body3, Button3 } from '../UI';
import S from './style';
import { AiOutlineExclamationCircle } from 'react-icons/ai';

interface ToastProps {
  text: string;
  state: Boolean;
  setState: Dispatch<SetStateAction<Boolean>>;
  className?: string;
  actionText?: string;
  actionFunction?: () => void;
  isHelperText?: Boolean;
  alertState?: Boolean;
}

/*
이름: Toast 컴포넌트
역할: 하단의 Toast 메시지에서 사용되는 공통 컴포넌트
*/

export default function Toast({
  text,
  state,
  setState,
  className,
  actionText,
  actionFunction,
  isHelperText,
  alertState,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      setState(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <S.Layout className={className} state={state} alertState={alertState}>
      {isHelperText && <AiOutlineExclamationCircle />}
      <Body3 className="text">{text}</Body3>
      {actionText && actionFunction && (
        <Button3
          className="actionText"
          onClick={actionFunction}
          state="emphasis"
        >
          {actionText}
        </Button3>
      )}
    </S.Layout>
  );
}
