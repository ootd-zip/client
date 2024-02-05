import styled from 'styled-components';

const Layout = styled.div`
  height: 100%;
  .main {
    height: 55%;
    margin-top: 16px;
    overflow-y: scroll;
  }
  .colorList {
    border-bottom: 1px solid ${(props) => props.theme.color.grey_95};
    padding-bottom: 10px;
  }
  .top {
    padding: 0 20px 8px 20px;
    color: ${(props) => props.theme.color.grey_50};
  }
`;

const SelectedFilter = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  width: 100%;
  padding: 16px 20px 16px 24px;
`;
const SelectedFilterSpan = styled.div`
  position: relative;
  flex-shrink: 0;
  padding: 8px 35px 8px 16px;
  background-color: ${(props) => props.theme.color.grey_10};
  color: ${(props) => props.theme.color.grey_100};
  border-radius: 17px;

  .close {
    color: ${(props) => props.theme.color.grey_100};
    position: absolute;
    right: 11px;
    top: 50%;
    transform: translate(0, -50%);
    width: 16px;
    height: 16px;
  }
`;

interface SelectedButtonState {
  state: Boolean;
}
const SelectedButton = styled.div<SelectedButtonState>`
  display: flex;
  padding: 0 20px;
  gap: 8px;
  .init {
    width: 30%;
    border: 1px solid ${(props) => props.theme.color.grey_80};
  }
  .submit {
    width: 70%;
  }
  ${(props) =>
    props.state &&
    ` 
    .init {
        border: 1px solid ${props.theme.color.grey_00};
        color:   ${props.theme.color.grey_00};
    }
    .submit {
        background-color: ${props.theme.color.grey_00};
        color:   ${props.theme.color.grey_100};
    }
  `}
`;

const S = { Layout, SelectedFilter, SelectedFilterSpan, SelectedButton };

export default S;
