import styled from 'styled-components';

interface ToggleProps {
  state: Boolean;
}

const ToggleLayout = styled.div`
  position: relative;
  width: 34px;
  height: 20px;
`;

const ToggleContainer = styled.div<ToggleProps>`
  width: 34px;
  height: 20px;
  background-color: ${(props) =>
    props.state ? props.theme.color.grey_90 : props.theme.color.correct};
  border-radius: 100px;
  transition: 0.5s;
`;

const ToggleCircle = styled.div<ToggleProps>`
  width: 18px;
  height: 18px;
  position: absolute;
  top: 1px;
  background-color: ${(props) => props.theme.color.grey_100};
  left: ${(props) => (props.state ? '1px' : '15px')};
  border-radius: 50%;
  transition: 0.5s;
`;

export { ToggleLayout, ToggleContainer, ToggleCircle };
