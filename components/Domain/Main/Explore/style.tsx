import styled from 'styled-components';

const SubHeadDiv = styled.div`
  padding: 16px 0px 0px 0px;
`;

const Layout = styled.div`
  padding: 0px 20px;
`;

const ClothList = styled.div`
  overflow-y: scroll;
  height: calc(100vh - 202px);
`;

const TopButton = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  bottom: 162px;
  right: 20px;
  position: fixed;
  z-index: 7;

  img {
    width: 48px;
    height: 48px;
    z-index: 7;
  }
`;

const S = { SubHeadDiv, Layout, ClothList, TopButton };

export default S;
