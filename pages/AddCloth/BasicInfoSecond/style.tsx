import styled from 'styled-components';

interface BackgroundProps {
  isOpen: Boolean;
}

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

const Layout = styled.div`
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 48px);
  .nextButton {
    padding-bottom: 30px;
    background-color: white;
    bottom: 0;
    flex-grow: 0;
  }
`;

const BasicInfoFirst = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 24px 0 56px 0;
  .name {
    color: ${(props) => props.theme.color.grey_50};
  }
  img {
    width: 106px;
    height: 106px;
    margin-top: 20px;
    object-fit: cover;
  }
  hr {
    position: absolute;
    width: 100vw;
    left: -20px;
    color: red;
    border: 4px solid ${(props) => props.theme.color.grey_95};
    bottom: 0;
    margin: 0;
  }
`;

const BasicInfoSecond = styled.div`
  height: 43%;
  flex-grow: 1;
  .title {
    padding: 21px 0px;
  }
`;

const Title = styled.div`
  margin-bottom: 16px;
`;

const Information = styled.div`
  overflow-y: scroll;
  height: 70%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  .label {
    margin-bottom: 16px;
  }
  .helpertext {
    margin-top: 8px;
  }
`;

const ClothColorSpanList = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
`;

const Size = styled.div``;

const S = {
  Layout,
  BasicInfoFirst,
  Category,
  BasicInfoSecond,
  Background,
  Title,
  Information,
  ClothColorSpanList,
  Size,
};

export default S;
