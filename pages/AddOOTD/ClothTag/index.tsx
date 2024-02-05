/* eslint-disable @next/next/no-img-element */
import S from './style';
import { Body3 } from '@/components/UI';
import NextButton from '@/components/NextButton';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import TagInformation from '@/components/ClothInformation/TagInformation';
import Carousel from '@/components/Carousel';
import AddTag, { ImageWithTag } from '@/components/Domain/AddOOTD/TagModal';

interface ClothTagProps {
  setImageAndTag: Dispatch<SetStateAction<ImageWithTag | undefined>>;
  handleStep: (next: string) => void;
  imageAndTag: ImageWithTag | undefined;
}

export default function ClothTag({
  setImageAndTag,
  handleStep,
  imageAndTag,
}: ClothTagProps) {
  const dragRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [componentWidth, setComponentWidth] = useState(0); //컴포넌트 길이
  const [componentHeight, setComponentHeight] = useState(0); //컴포넌트 높이
  const [addTag, setAddTag] = useState<Boolean>(false); //옷 추가 모달 (열기/닫기)
  const [init, setInit] = useState<Boolean>(false); // 초기 addTag 렌더링 방지
  const [slideIndex, setSlideIndex] = useState<number>(0); //OOTD 슬라이드 인덱스
  const [nextButtonState, setNextButtonState] = useState<Boolean>(false); //다음 버튼 상태

  //컴포넌트 크기 계산
  useEffect(() => {
    if (dragRef.current) {
      const w = dragRef.current.offsetWidth;
      const h = dragRef.current.offsetHeight;
      setComponentWidth(w);
      setComponentHeight(h);
    }
  }, []);

  //이미지, 태그 정보
  //다음 버튼 활성화 함수
  useEffect(() => {
    const filterdSamplData = imageAndTag!.filter((item) => item.tag);
    if (filterdSamplData.length) setNextButtonState(true);
    else setNextButtonState(false);
  }, [imageAndTag]);

  //드래그 함수
  const onDrag = (
    index: number,
    ootdIndex: number,
    e: DraggableEvent,
    data: DraggableData
  ) => {
    const updatedElements = JSON.parse(JSON.stringify(imageAndTag));

    updatedElements[ootdIndex].tag![index] = {
      ...updatedElements[ootdIndex].tag![index],
      xRate: String(data.lastX),
      yRate: String(data.lastY),
      deviceHeight: componentHeight,
      deviceWidth: componentWidth,
    };
    console.log(updatedElements[ootdIndex].tag![index]);
    setImageAndTag(updatedElements);
    e.stopPropagation();
  };

  //옷추가 모달창 열기
  const onClickImage = () => {
    setAddTag(true);
    setInit(true);
  };

  //다음 버튼 클릭
  const onClickNextButton = () => {
    if (nextButtonState) {
      handleStep('게시하기');
      setImageAndTag(imageAndTag);
    }
  };

  //이미지 + 태그 컴포넌트
  const ImageTag = () => {
    return (
      <Carousel
        slidesToShow={1}
        infinite={false}
        beforeChange={(_current: number, next: number) => setSlideIndex(next)}
      >
        {imageAndTag!.map((item, ootdIndex) => {
          return (
            <>
              <S.Image ref={dragRef}>
                {item.tag &&
                  item.tag.map((element, index) => {
                    return (
                      <Draggable
                        key={index}
                        bounds=".image"
                        onDrag={(e, data) => onDrag(index, ootdIndex, e, data)}
                        defaultPosition={{
                          x: Number(element.xRate),
                          y: Number(element.yRate),
                        }}
                      >
                        <div className="sample">
                          <TagInformation
                            clothId={element.clothId}
                            clothImage={element.clothImage}
                            caption={element.caption}
                            headline={element.headline}
                            bodyFirst={element.bodyFirst}
                            state={element.state as 'dark' | 'light'}
                          />
                        </div>
                      </Draggable>
                    );
                  })}
                {/* 이미지 */}
                <img
                  onClick={onClickImage}
                  className="image"
                  ref={imageRef}
                  src={item.ootdImage}
                  alt=""
                />
              </S.Image>
            </>
          );
        })}
      </Carousel>
    );
  };

  return (
    <S.Layout>
      {/* 이미지 + 태그 */}
      {ImageTag()}
      {/* 태그 가이드 */}
      <S.Tag>
        <Body3>원하는 곳을 터치해서 옷 정보를 태그해보세요.</Body3>
      </S.Tag>
      {/* 다음버튼 */}
      <NextButton
        className="nextButton"
        state={nextButtonState}
        onClick={onClickNextButton}
      >
        다음단계
      </NextButton>
      {/* 태그 모달창 */}
      <AddTag
        setAddTag={setAddTag}
        addTag={addTag}
        setImageAndTag={setImageAndTag}
        imageAndTag={imageAndTag}
        slideIndex={slideIndex}
      />
    </S.Layout>
  );
}
