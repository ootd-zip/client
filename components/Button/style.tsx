import styled from 'styled-components';
import { ButtonProps } from '.';

interface ButtonData {
  buttonData: ButtonProps;
  show: Boolean;
}

const Buttons = styled.button<ButtonData>`
  border: ${(props) => (props.buttonData.border ? '1px solid black' : 'none')};
  background-color: ${(props) =>
    props.theme.color[props.buttonData.backgroundColor]};
  color: ${(props) => props.theme.color[props.buttonData.color]};
`;

const LargeButton = styled(Buttons)`
  display: ${(props) => (props.show ? 'block' : 'none')};
  width: 100%;
  max-width: 385px;
  height: 48px;
  border-radius: 2px;
`;

const SmallButton = styled(Buttons)`
  display: ${(props) => (props.show ? 'inline' : 'none')};
  width: 70px;
  height: 30px;
  border-radius: ${(props) =>
    props.className === 'followButton' ? '2px' : '122px'};
`;

export { LargeButton, SmallButton };
