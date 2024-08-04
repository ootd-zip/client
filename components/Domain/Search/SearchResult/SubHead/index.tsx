import S from './style';
import { Body4, Caption1 } from '@/components/UI';
import Image from 'next/image';
import Rectangle from 'public/images/rectangle.png';
import { Dispatch, SetStateAction, useState } from 'react';

interface SubHeadProps {
  count: number;
  style?: string;
  state: string;
  setState: Dispatch<SetStateAction<string>>;
}

/*
이름: 검색 페이지 소 타이틀 컴포넌트
역할: 검색 페이지에서 사용되는 소 타이틀 컴포넌트
*/

export default function SubHead({
  count,
  style,
  state,
  setState,
}: SubHeadProps) {
  return (
    <S.Layout state={style}>
      <S.Frame>
        <Body4 state="emphasis">{count}개의 게시물</Body4>
      </S.Frame>
      <S.Wrap clicked={state}>
        <Caption1 className="LATEST" onClick={() => setState('LATEST')}>
          최신순
        </Caption1>
        <Image src={Rectangle} alt="Rectangle" />
        <Caption1 className="POPULARITY" onClick={() => setState('POPULARITY')}>
          인기순
        </Caption1>
      </S.Wrap>
    </S.Layout>
  );
}
