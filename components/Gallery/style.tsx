import styled from 'styled-components';

const Layout = styled.div`
  .nextButton {
    padding: 16px 20px 0px 16px;
    position: fixed;
    bottom: 20px;
  }
  .helperText {
    padding: 42px 0 18px 0;
    text-align: center;
    color: #aaaaaa;
  }
  .selectedImage {
  }
`;

interface ImageProps {
  state?: Boolean;
}

const BigImage = styled.div<ImageProps>`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  border-bottom: 8px solid ${(props) => props.theme.color.grey_95};
`;

const SmallImage = styled.div<ImageProps>`
  position: relative;
  width: 106px !important;
  height: 106px;
  margin-right: 4px;
  .smallImage {
    width: 106px;
    height: 106px;
    object-fit: cover;
    border-radius: 2px;
    opacity: ${(props) => (props.state ? 0.5 : 1)};
  }
`;

interface ImageListProps {
  imageListlength?: number;
}

const ImageList = styled.div<ImageListProps>`
  margin: 0 16px;
  ${(props) =>
    props.imageListlength! <= 3 &&
    `
    width: calc(106px * ${props.imageListlength} + 8px);
  `}
  .selected {
    color: ${(props) => props.theme.color.grey_30};
    margin: 24px 4px 8px 4px;
    width: 100px;
  }
`;

interface ImageNumberProps {
  state: Boolean;
}

const ImageNumber = styled.div<ImageNumberProps>`
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 1px solid
    ${(props) =>
      props.state ? props.theme.color.grey_00 : props.theme.color.grey_100};
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  background-color: ${(props) => (props.state ? '#00EACE' : '#9A9A9A')};
`;

const S = { Layout, BigImage, SmallImage, ImageList, ImageNumber };

export default S;
