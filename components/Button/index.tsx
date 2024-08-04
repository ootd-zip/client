import { MouseEventHandler } from 'react';
import { LargeButton, SmallButton } from './style';

interface ButtonProps {
  children: React.ReactNode;
  size: string;
  backgroundColor: string;
  color: string;
  border: Boolean;
  onClick: MouseEventHandler;
  className?: string;
}

/*
이름: 버튼 컴포넌트
역할: 공용으로 사용되는 버튼 컴포넌트 
*/
export default function Button(props: ButtonProps) {
  return (
    <>
      <LargeButton
        onClick={props.onClick}
        show={props.size === 'big'}
        buttonData={props}
        className={props.className}
      >
        {props.children}
      </LargeButton>

      <SmallButton
        onClick={props.onClick}
        show={props.size === 'small'}
        buttonData={props}
        className={props.className}
      >
        {props.children}
      </SmallButton>
    </>
  );
}

export type { ButtonProps };
