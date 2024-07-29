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
이름: 소 타이틀 컴포넌트
역할: 게시물 개수와 정렬 기준의 소 타이틀 컴포넌트
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
        <Caption1
          style={{ color: state === 'old' ? '#030303' : '#8B8B8B' }}
          onClick={() => setState('old')}
        >
          오래된 순
        </Caption1>
        <Image src={Rectangle} alt="Rectangle" />
        <Caption1
          style={{ color: state === 'new' ? '#030303' : '#8B8B8B' }}
          onClick={() => setState('new')}
        >
          최신순
        </Caption1>
      </S.Wrap>
    </S.Layout>
  );
}
