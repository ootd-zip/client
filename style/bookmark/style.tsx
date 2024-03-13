import styled from 'styled-components';

interface BackgroundProps {
  isOpen: Boolean;
}

const Background = styled.div<BackgroundProps>`
  background-color: ${(props) => props.theme.color.grey_00};
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  opacity: 0.3;
  z-index: 2;
  width: 100vw;
  height: calc(100vh - 48px);
  position: absolute;
`;

const Layout = styled.div``;

const ClothList = styled.div`
  height: 100vh;
  overflow-y: scroll;
  padding: 0px 20px;
`;

const TopButton = styled.div`
  position: fixed;
  bottom: 60px;
  right: 20px;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  padding: 10px;
  z-index: 9999;

  img {
    width: 48px;
    height: 48px;
  }
`;

const S = { Background, Layout, ClothList, TopButton };

export default S;
