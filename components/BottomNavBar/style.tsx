import styled from 'styled-components';

const BottomComponent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 430px;
  background-color: ${(props) => props.theme.color.grey_100};
  position: fixed;
  bottom: 0;
  justify-content: space-around;
`;

const BottomComponentItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 56px;
  svg {
    width: 24px;
    height: 24px;
  }
`;

export { BottomComponent, BottomComponentItem };
