import { Body3 } from '@/components/UI';
import S from './style';

interface MiniColorProps {
  color: string;
  name: string;
}

export default function MiniColor({ color, name }: MiniColorProps) {
  return (
    <S.MiniColorLayout>
      <S.MiniColorSpan color={color} />
      <S.MiniColorName>
        <Body3>{name}</Body3>
      </S.MiniColorName>
    </S.MiniColorLayout>
  );
}
