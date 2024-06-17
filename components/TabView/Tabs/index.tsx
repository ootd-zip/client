import Slider from 'react-slick';
import React, { useRef, useEffect } from 'react';
import { useTabViewContext } from '@/hooks/use-tabview/context';
import Carousel from '@/components/Carousel';

interface TabsProps {
  children: React.ReactNode;
  dots?: boolean;
}

export default function Tabs({ children, dots }: TabsProps) {
  const { index, setIndex } = useTabViewContext();

  const afterChangeHandler = (currentIndex: number) => {
    setIndex(currentIndex + 1);
  };

  //슬라이더의 ref
  const ref = useRef<Slider | null>(null);

  //인덱스가 변경될 시 그 인덱스에 해당하는 슬라이드로 이동
  useEffect(() => {
    const slider = ref.current;
    if (slider) {
      slider.slickGoTo(index - 1);
    }
  }, [index]);

  return (
    <Carousel
      slidesToShow={1}
      infinite={false}
      afterChange={afterChangeHandler}
      ParentRef={ref}
      dots={dots}
      initialSlide={index - 1}
    >
      {children}
    </Carousel>
  );
}
