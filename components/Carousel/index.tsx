import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

interface CarouselProps {
  children: React.ReactNode;
  slidesToShow: number;
  infinite: Boolean;
  ParentRef?: React.MutableRefObject<Slider | null>;
  afterChange?: (currentIndex: number) => void;
  beforeChange?: (currentIndex: number, nextIndex: number) => void;
  swipe?: boolean;
  dots?: boolean;
  initialSlide?: number;
}
/*
이름: 캐러셀
역할: 이미지 슬라이드 컴포넌트
특이사항: react-slick 사용
*/
export default function Carousel({
  children,
  slidesToShow,
  ParentRef,
  infinite,
  dots,
  afterChange,
  beforeChange,
  initialSlide,
}: CarouselProps) {
  //react-slick 설정
  const sliderSettings = {
    speed: 400, //이동 속도
    infinite: infinite as boolean, //무한 슬라이드 true,
    slidesToShow: slidesToShow, //한 슬라이드에서 보여줄 사진 개수
    afterChange, //슬라이드 후 실행되는 함수
    beforeChange, //슬라이드전에 실행되는 함수
    arrows: false, //양쪽 화살표 유무
    dots: dots, //아래 인덱스 점 유무
    slickGoTo: 4,
    initialSlide: initialSlide, //최초 슬라이드 인덱스
  };

  return (
    <Slider ref={ParentRef} {...sliderSettings}>
      {children}
    </Slider>
  );
}
