import styled from 'styled-components';

interface LayoutProps {
  state?: string;
}

const headLayout = styled.div<LayoutProps>`
  display: flex;
  padding: 12px 20px;
  justify-content: flex-end;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  background-color: ${(props) => props.theme.color.grey_100};
  z-index: 7;
  height: 44px;
`;

const Frame = styled.div`
  display: flex;
  align-items: flex-start;
  flex: 1 0 0;

  .bookmarkSubHeadText {
    color: ${(props) => props.theme.color.grey_50};
  }
`;

const Wrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 14px;

  .deleteButton {
    padding: 0px;
    color: ${(props) => props.theme.color.error};
  }

  .cancelButton {
    padding: 0px;
    color: ${(props) => props.theme.color.grey_50};
  }

  .editingButton {
    padding: 0px;
    color: ${(props) => props.theme.color.grey_00};
  }
`;

const S = { headLayout, Frame, Wrap };

export default S;
