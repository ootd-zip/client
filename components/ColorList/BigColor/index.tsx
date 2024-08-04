import { Body3 } from '../../UI';
import S from './style';

interface BigColorProps {
  color: string;
  name: string;
  state: Boolean;
  onClick?: (index: number) => void;
  index: number;
}
export default function BigColor({
  color,
  name,
  state,
  onClick,
  index,
}: BigColorProps) {
  return (
    <S.Layout>
      {!state && (
        <S.ColorSpan
          onClick={() => (onClick ? onClick(index) : '')}
          color={color}
          name={name}
        />
      )}
      {state && (
        <S.BigColorSpan>
          <S.SmallColorSpan
            onClick={() => (onClick ? onClick(index) : '')}
            color={color}
          />
        </S.BigColorSpan>
      )}
      <S.ColorName>
        <Body3>{name}</Body3>
      </S.ColorName>
    </S.Layout>
  );
}
