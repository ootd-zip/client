import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  p {
    color: ${(props) => props.theme.color.grey_50};
    display: inline-block;
  }
`;

const S = { Layout };

export default S;
