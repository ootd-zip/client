import styled from 'styled-components';

const Layout = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 999;
  transform: translate(-50%, -50%);
  border-radius: 14px;
  background: #e5e5e5;
  opacity: 0.87;
  backdrop-filter: blur(40px);
  text-align: center;
`;

const AlertPrompt = styled.div``;

const AlertHeadline = styled.div`
  padding-top: 19px;
`;

const AlertBody = styled.div`
  width: 238px;
  padding: 0px 16px 15px 16px;
  display: flex;
  flex-direction: column;
  white-space: nowrap;
  box-sizing: content-box;
  p {
    flex-shrink: 0;
  }
`;
const AlertButton = styled.div`
  button {
    width: 50%;
    border-radius: var(--Number, 0px);
    border-top: 0.333px solid rgba(60, 60, 67, 0.36);
    padding: 11px 41px;
    color: #007aff;
    &.yes p {
      font-weight: 600 !important;
    }
    &.no p {
      color: red;
    }
  }
`;

const S = {
  Layout,
  AlertPrompt,
  AlertHeadline,
  AlertBody,
  AlertButton,
};

export default S;
