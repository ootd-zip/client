import styled from 'styled-components';

const Layout = styled.div`
  padding: 0 16px;
  background-color: white;
  position: fixed;
  z-index: 15;
  bottom: 70px;
  width: 160px;
  left: 50%;
  transform: translate(-50%, 0);
  border-block: 2px solid black;
  @keyframes addModalFadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 100;
    }
  }
  animation: 0.3s addModalFadeIn ease-in-out;
`;
const OOTD = styled.div`
  padding: 12px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 10px;
  svg {
    width: 24px;
    height: 24px;
    color: ${(props) => props.theme.color.accent};
  }
`;
const Closet = styled(OOTD)`
  border-top: 2px solid ${(props) => props.theme.color.grey_95};
`;

const S = { Layout, OOTD, Closet };

export default S;
