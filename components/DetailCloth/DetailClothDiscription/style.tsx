import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  padding: 16px 20px 32px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  border-bottom: 1px solid ${(props) => props.theme.color.grey_95};
`;

const Category = styled.div`
  display: flex;
  width: calc(100% - 22px);
  align-items: center;
  gap: 8px;
  align-self: stretch;
  p {
    height: 22px;
    color: ${(props) => props.theme.color.grey_70};
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const IconSpan = styled.span`
  display: flex;
  align-items: center;
  width: 22px;
  height: 22px;

  //아이콘 크기
  svg {
    width: 20px;
    height: 20px;
    color: ${(props) => props.theme.color.grey_70};
  }
`;

const S = {
  Layout,
  Category,
  IconSpan,
};

export default S;
