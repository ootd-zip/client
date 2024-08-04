import styled from 'styled-components';

const Layout = styled.div``;

const BookmarkList = styled.div`
  height: calc(100vh - 56px);
  overflow-y: scroll;
  padding: 0px 20px 100px 20px;
`;

const TopButton = styled.div`
  position: fixed;
  bottom: 71px;
  right: 20px;
  width: 48px;
  height: 48px;
  flex-shrink: 0;
  z-index: 7;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const S = { Layout, BookmarkList, TopButton };

export default S;
