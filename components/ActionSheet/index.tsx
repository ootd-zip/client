import S from './style';
import { Button2 } from '../UI';

interface buttonProps {
  buttonClick: () => void;
  name: string;
}

interface ActionSheetProps {
  buttons?: buttonProps[];
}

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
