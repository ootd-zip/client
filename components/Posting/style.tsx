import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Layout = styled.div`
  width: 100%;
  svg {
    width: 24px;
    height: 24px;
  }
  border-bottom: 1px solid ${(props) => props.theme.color.grey_95};
  .slick-dots {
    bottom: -30px;

    & li {
      width: 6px;
      height: 6px;
      margin: 2px;
    }
  }
`;

const PostingTop = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 10px 20px;

  .avatar {
    border-radius: 50%;
    width: 32px;
    height: 32px;
  }

  .userImage {
    border-radius: 50%;
  }

  .userName {
    flex-grow: 1;
  }

  .unfollow {
    background-color: ${(props) => props.theme.color.subdued};
    border-radius: 2px;
  }
  .following {
    background-color: ${(props) => props.theme.color.grey_90};
    border-radius: 2px;
  }
  p {
    padding: 2px 6px;
  }
`;

const PostingImage = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%;
  .tag {
    position: absolute;
    z-index: 1;
    left: 16px;
    bottom: 16px;
    color: white;
    background-color: #0000004d;
    border-radius: 50%;
    padding: 4px;
  }
`;

const ImageWithTag = styled.div`
  position: relative;
  height: 0;
  padding-bottom: 100%;
`;
interface ClothTagProps {
  xrate: string;
  yrate: string;
  clothTagOpen: Boolean;
}
const PostingClothTag = styled.div<ClothTagProps>`
  position: absolute;
  top: ${(props) => props.yrate}px;
  left: ${(props) => props.xrate}px;
  display: ${(props) => (props.clothTagOpen ? 'block' : 'none')};
  @keyframes fadeIns {
    from {
      opacity: 0;
    }
    to {
      opacity: 100;
    }
  }
  animation: ${(props) => (props.clothTagOpen ? 'fadeIns 1s ease-in-out' : '')};
`;
const PostingCommunication = styled.div`
  position: relative;
  padding: 16px 20px;
  width: 100%;
  display: flex;
  gap: 16px;

  .bookmark {
    flex-grow: 1;
    position: absolute;
    right: 20px;
    color: black;
  }
`;
const PostingExplanation = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0px 20px 16px 20px;
  .date {
    color: ${(props) => props.theme.color.grey_40};
  }
`;
const PostingStyleTag = styled.div`
  .styletag {
    color: ${(props) => props.theme.color.grey_70};
    margin-bottom: 18px;
  }
  padding: 16px 20px 32px 20px;
`;

const PostingStyleTagSpan = styled.div`
  display: inline;
  margin-right: 4px;
  p {
    padding: 6px 8px;
    background-color: ${(props) => props.theme.color.grey_90};
    display: inline;
    border-radius: 2px;
  }
`;

const LikeCount = styled.div`
  display: flex;

  gap: 2px;
`;

const S = {
  Layout,
  PostingTop,
  PostingImage,
  ImageWithTag,
  PostingClothTag,
  PostingCommunication,
  PostingExplanation,
  PostingStyleTag,
  PostingStyleTagSpan,
  LikeCount,
};

export default S;
