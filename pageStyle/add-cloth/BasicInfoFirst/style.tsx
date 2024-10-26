import styled from 'styled-components';

const Layout = styled.div`
  height: calc(100vh - 48px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  justify-content: space-between;
  .nextButton {
    padding: 20px 20px;
  }
  .divider {
    overflow-y: scroll;
  }
  .helpertext {
    margin-top: 8px;
  }
`;

const ClothName = styled.div`
  color: ${(props) => props.theme.color.grey_50};
  padding: 24px 20px 0 20px;
`;

const Category = styled.div`
  display: flex;
  align-items: center;
  svg {
    width: 24px;
    height: 24px;
  }
  p {
    margin-bottom: 0 !important;
  }
`;

const ClothImage = styled.div`
  border-bottom: 8px solid ${(props) => props.theme.color.grey_95};
  padding: 16px 20px 48px 20px;
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
  .label {
    margin-bottom: 16px;
  }
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const ClothColorSpanList = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 16px;
`;

const S = {
  Layout,
  ClothName,
  Category,
  ClothImage,
  BasicInfo,
  Title,
  Information,
  ClothColorSpanList,
};

export default S;
