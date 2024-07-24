import styled from 'styled-components';

interface LayoutProps {
  state: Boolean;
  className?: string;
}

const Layout = styled.div<LayoutProps>`
  visibility: ${(props) => (props.state ? 'visible' : 'hidden')};
  display: flex;
  width: calc(100% - 16px);
  position: fixed;
  bottom: ${(props) =>
    props.className === 'brandSuggestion' ? '90px' : '71px'};
  margin: 0px 8px;
  padding: 10px 16px;
  align-items: flex-start;
  background-color: ${(props) => props.theme.color.grey_00};
  color: ${(props) => props.theme.color.grey_100};
  border-radius: 2px;

  svg {
    width: 18px;
    height: 18px;
  }

  .text {
    flex-grow: 1;
    align-self: flex-start;
    margin-left: 4px;
  }
  .actionText {
    color: ${(props) => props.theme.color.accent};
    border-left: 1px solid ${(props) => props.theme.color.grey_30};
    padding-left: 16px;
  }
`;

const S = {
  Layout,
};

export default S;
