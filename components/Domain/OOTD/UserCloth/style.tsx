import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const Layout = styled.div`
  padding: 0 0 0 20px;
`;
const Title = styled.div`
  display: flex;
  padding: 21px 0;
  justify-content: space-between;
  p {
    color: ${(props) => props.theme.color.grey_90};
  }
`;
const Cloth = styled.div`
  padding: 16px 0 48px 0;
  .slick-track {
    margin: 0;
  }
`;
const CarouselItem = styled.div`
  display: flex !important;
  flex-direction: column;
  gap: 8px;
`;

const S = { Layout, Title, Cloth, CarouselItem };

export default S;
