import { Body3 } from '../../UI';
import S from './style';

interface ColorSpan {
  color: string;
  name: string;
  state: Boolean;
  onClick?: (index: number) => void;
  index: number;
}
/*
이름: 색상
역할: 옷 색상과 이름을 나타는 색상 컴포넌트
*/
export default function ColorSpan({
  color,
  name,
  state,
  onClick,
  index,
}: ColorSpan) {
  return (
    <S.Layout>
      {/*선택한 상태*/}
      {!state && (
        <S.ColorSpan
          onClick={() => (onClick ? onClick(index) : '')}
          color={color}
          name={name}
        />
      )}
      {/*미선택한 상태*/}
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
