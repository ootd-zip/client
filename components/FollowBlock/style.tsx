import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  padding: 8px 20px;
  align-items: center;
  gap: 16px;
  align-self: stretch;

  img {
    width: 52px;
    height: 52px;
    object-fit: cover;
    flex-shrink: 0;
    border-radius: 50%;
  }
`;

const S = { Layout };

export default S;
