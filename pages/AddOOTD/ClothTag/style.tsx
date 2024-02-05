import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Layout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  img {
    width: 100%;
    height: 100%;
    max-height: 100vw;
    object-fit: cover;
  }

  .slick-slider {
    margin: 0;
  }

  .slick-dots {
    bottom: 0;
    li {
      margin: 0;
      button:before {
        color: white;
        opacity: 1;
        font-size: 5px;
      }
    }
    .slick-active {
      button:before {
        font-size: 10px;
      }
    }
  }

  .nextButton {
    padding: 0 20px;
  }
`;

const Image = styled.div`
  .sample {
    position: absolute;
    z-index: 4;
    width: 146px;
    height: 48px;
    cursor: 'move';
  }
  position: relative;
`;

const Tag = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  p {
    color: ${(props) => props.theme.color.grey_60};
  }
`;

const S = { Layout, Tag, Image };

export default S;
