import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  width: 100%;
  max-width: 350px;
  height: 42px;
`;

interface ButtonProps {
  state: Boolean;
}

const LeftButton = styled.button<ButtonProps>`
  background-color: ${(props) =>
    props.state ? props.theme.color.blue_100 : 'white'};
  border-radius: 2px 0 0 2px;
  color: ${(props) =>
    props.state ? props.theme.color.blue_500 : props.theme.color.grey_50};
  width: 50%;
  border: 1px solid
    ${(props) =>
      props.state ? props.theme.color.blue_500 : props.theme.color.grey_90};
  border-right: ${(props) => !props.state && 'none'};
`;
const RightButton = styled.button<ButtonProps>`
  background-color: ${(props) =>
    !props.state ? props.theme.color.blue_100 : 'white'};
  color: ${(props) =>
    !props.state ? props.theme.color.blue_500 : props.theme.color.grey_50};
  width: 50%;
  border-radius: 0 2px 2px 0;
  border: 1px solid
    ${(props) =>
      !props.state ? props.theme.color.blue_500 : props.theme.color.grey_90};
  border-left: ${(props) => props.state && 'none'};
`;

const S = { Layout, LeftButton, RightButton };

export default S;
