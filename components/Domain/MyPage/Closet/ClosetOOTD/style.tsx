import styled from 'styled-components';

const Layout = styled.div`
  padding: 0 20px;
`;

interface OOTDSortProps {
  state: Boolean;
}

const OOTDSort = styled.div<OOTDSortProps>`
  display: flex;
  align-items: center;
  gap: 8px;
  justify-content: flex-end;
  padding: 17px 0;

  svg {
    width: 1px;
    height: 13px;
  }

  .old {
    color: ${(props) => (props.state ? 'black' : props.theme.color.grey_50)};
  }
  .new {
    color: ${(props) => (!props.state ? 'black' : props.theme.color.grey_50)};
  }
`;

interface ScrollState {
  state: Boolean;
}
const OOTDList = styled.div<ScrollState>`
  height: calc(100vh - 200px);
  overflow-y: ${(props) => (props.state ? 'scroll' : 'hidden')};
`;

const Divider = styled.span`
  width: 1px;
  height: 12px;
  background-color: ${(props) => props.theme.color.grey_90};
`;

const S = { Layout, OOTDSort, OOTDList, Divider };

export default S;
