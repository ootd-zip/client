import S from './style';
import { Body4, Caption1 } from '@/components/UI';
import Image from 'next/image';
import Rectangle from 'public/images/rectangle.png';

interface SubHeadProps {
  count: number;
  clicked: string;
  state?: string;
}

export default function SubHead({ count, clicked, state }: SubHeadProps) {
  return (
    <S.Layout state={state}>
      <S.Frame>
        <Body4 style={{ fontWeight: '500', color: '#BBBBBB' }}>{count}</Body4>
        <Body4 style={{ color: '#BBBBBB' }}>개의 게시물</Body4>
      </S.Frame>
      <S.Wrap>
        <Caption1 style={{ color: clicked === 'old' ? '#030303' : '#8B8B8B' }}>
          오래된 순
        </Caption1>
        <Image src={Rectangle} alt="Rectangle" />
        <Caption1 style={{ color: clicked === 'new' ? '#030303' : '#8B8B8B' }}>
          최신순
        </Caption1>
      </S.Wrap>
    </S.Layout>
  );
}
