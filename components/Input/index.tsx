import TrueFalse from './TrueFalse';
import PrevNext from './PrevNext';
import HelperText from './HelperText';
import Label from './Label';
import Text from './Text';
import TextArea from './TextArea';
import CheckBox from './CheckBox';
import Modal from './Modal';
import ReadOnly from './ReadOnly';

interface InputProps {
  children: React.ReactNode;
}

/*
이름: 인풋
역할: 컴파운드 패턴을 활용해 적절하게 조합이 가능하도록 설계한 인풋 컴포넌트
*/
export default function Input({ children }: InputProps) {
  return <div>{children}</div>;
}

Input.Label = Label;
Input.Text = Text;
Input.HelperText = HelperText;
Input.TrueFalse = TrueFalse;
Input.PrevNext = PrevNext;
Input.TextArea = TextArea;
Input.CheckBox = CheckBox;
Input.Modal = Modal;
Input.ReadOnly = ReadOnly;
