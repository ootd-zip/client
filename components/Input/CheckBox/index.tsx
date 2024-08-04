import S from './style';
import CheckBoxTrue from '@/public/images/CheckBoxTrue.svg';
import CheckBoxFalse from '@/public/images/CheckBoxFalse.svg';
import Body2 from '@/components/UI/TypoGraphy/Body2';

interface BoxProps {
  id: number;
  state?: Boolean;
  name: string;
}

interface CheckBoxProps {
  state: BoxProps[];
  setState: React.Dispatch<React.SetStateAction<BoxProps[]>>;
}
/*
이름: 체크 박스 인풋
역할: 공용으로 사용되는 체크 박스 인풋 컴포넌트
*/
const CheckBox = ({ state, setState }: CheckBoxProps) => {
  //체크 박스 클릭 함수
  const onClickCheckBox = (index: number) => {
    const {
      state: currentValue,
      name: currentTag,
      id: currentId,
    } = state[index];
    const leftCheckBox = state.slice(0, index);
    const rightCheckBox = state.slice(index + 1);
    setState([
      ...leftCheckBox,
      { state: !currentValue, name: currentTag, id: currentId },
      ...rightCheckBox,
    ]);
  };

  return (
    <S.Layout>
      {state &&
        state.map((item, index) => {
          return (
            <S.Box onClick={() => onClickCheckBox(index)} key={index}>
              <>
                <S.Image>
                  {item.state && <CheckBoxTrue className="checkBoxTrue" />}
                  {!item.state && <CheckBoxFalse alt="CheckBoxFalse" />}
                </S.Image>
                <S.Tag>
                  <Body2>{item.name}</Body2>
                </S.Tag>
              </>
            </S.Box>
          );
        })}
    </S.Layout>
  );
};

export default CheckBox;
