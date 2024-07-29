import React from 'react';
import S from './style';

interface AlarmLayoutProps {
  children: React.ReactNode;
  index: number;
}

/*
이름: 알림 레이아웃
역할: 알림 컴포넌트를 만들기 위한 레이아웃
*/
export default function AlarmLayout({ children, index }: AlarmLayoutProps) {
  return <S.Layout index={index}>{children}</S.Layout>;
}
