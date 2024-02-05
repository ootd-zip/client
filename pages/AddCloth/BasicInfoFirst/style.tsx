import styled from 'styled-components';

interface BackgroundProps {
  isOpen: Boolean;
}

const Layout = styled.div`
  height: calc(100% - 48px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  button {
    margin: 0 20px;
  }
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  p {
    margin-bottom: 0 !important;
  }
`;

const Background = styled.div<BackgroundProps>`
  background-color: ${(props) => props.theme.color.grey_00};
  display: ${(props) => (props.isOpen ? 'block' : 'none')};
  opacity: 0.3;
  z-index: 2;
  width: 100vw;
  height: calc(100vh - 48px);
  position: absolute;
`;

const ClothImage = styled.div`
  border-bottom: 8px solid ${(props) => props.theme.color.grey_95};
  padding: 24px 20px 48px 20px;
  img {
    width: 106px;
    height: 106px;
    object-fit: cover;
  }
`;

const BasicInfo = styled.div`
  padding: 0 20px;
  .title {
    padding: 21px 0px;
  }
`;

const Title = styled.div`
  margin-bottom: 16px;
`;

const Information = styled.div`
  p {
    margin-bottom: 16px;
  }
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const S = {
  Layout,
  Category,
  ClothImage,
  BasicInfo,
  Title,
  Information,
  Background,
};

export default S;
