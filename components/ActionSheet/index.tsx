import S from './style';
import { Button2 } from '../UI';

interface colorProps {
  buttonClick: () => void;
  name: string;
}

interface ActionSheetProps {
  buttons?: colorProps[];
}

/*
이름: ActionSheet 컴포넌트
역할: 유저의 고를 수 있는 항목 여러 개 중 선택할 수 있는 컴포넌트
*/

export default function ActionSheet({ buttons }: ActionSheetProps) {
  return (
    <S.Layout>
      {buttons &&
        buttons.map((item, index) => {
          return (
            <S.ButtonWrap
              onClick={item.buttonClick}
              key={index}
              name={item.name}
            >
              <Button2>{item.name}</Button2>
            </S.ButtonWrap>
          );
        })}
    </S.Layout>
  );
}
