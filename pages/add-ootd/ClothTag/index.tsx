import S from '@/pageStyle/add-ootd/ClothTag/style';
import { Body3 } from '@/components/UI';
import NextButton from '@/components/NextButton';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import TagInformation from '@/components/ClothInformation/TagInformation';
import Carousel from '@/components/Carousel';
import AddTag, { ImageWithTag } from '@/components/Domain/AddOOTD/TagModal';
import NextImage from '@/components/NextImage';
import Background from '@/components/Background';

interface ClothTagProps {
  setImageAndTag: Dispatch<SetStateAction<ImageWithTag | undefined>>;
  handleStep: (next: string) => void;
  imageAndTag: ImageWithTag | undefined;
  setTagSelectedState: Dispatch<SetStateAction<Boolean>>;
  tagSelectedState: Boolean;
}

/*
이름: 옷 태그
역할: ootd 등록 단계에서 사용되는 옷 태그 컴포넌트
*/
export default function ClothTag({
  setImageAndTag,
  handleStep,
  imageAndTag,
  setTagSelectedState,
  tagSelectedState,
}: ClothTagProps) {
  const dragRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);

  const [componentWidth, setComponentWidth] = useState(0); //컴포넌트 길이
  const [componentHeight, setComponentHeight] = useState(0); //컴포넌트 높이
  const [addTag, setAddTag] = useState<Boolean>(false); //옷 추가 모달 (열기/닫기)
  const [slideIndex, setSlideIndex] = useState<number>(0); //OOTD 슬라이드 인덱스
  const [isDragging, setIsDragging] = useState(false);

  //컴포넌트 크기 계산
  useEffect(() => {
    if (dragRef.current) {
      const w = dragRef.current.offsetWidth;
      setComponentWidth(w);
      setComponentHeight(w);
    }
  }, []);

  //이미지, 태그 정보
  //다음 버튼 활성화 함수
  useEffect(() => {
    const filterdSamplData = imageAndTag!.filter(
      (item) =>
        item.ootdImageClothesList && item.ootdImageClothesList.length > 0
    );
    if (filterdSamplData.length) {
      setTagSelectedState(true);
    } else {
      setTagSelectedState(false);
    }
  }, [imageAndTag]);

  //드래그 함수
  const onDrag = (
    index: number,
    ootdIndex: number,
    e: DraggableEvent,
    data: DraggableData
  ) => {
    setIsDragging(true);
    const updatedElements = JSON.parse(JSON.stringify(imageAndTag));

    updatedElements[ootdIndex].ootdImageClothesList![index] = {
      ...updatedElements[ootdIndex].ootdImageClothesList![index],
      coordinate: {
        xrate: String(data.lastX),
        yrate: String(data.lastY),
      },
      deviceSize: {
        deviceHeight: componentHeight,
        deviceWidth: componentWidth,
      },
    };
    setImageAndTag(updatedElements);
    e.stopPropagation();
  };

  const handleStopDrag = () => {
    // 드래그가 끝날 때 이벤트 핸들러
    setTimeout(() => {
      setIsDragging(false); // 드래그가 끝날 때 flag변수를 false로 업데이트 해준다.
    }, 100);
  };

  //옷추가 모달창 열기
  const onClickImage = () => {
    setAddTag(true);
  };

  //다음 버튼 클릭
  const onClickNextButton = () => {
    if (tagSelectedState) {
      handleStep('게시하기');
      setImageAndTag(imageAndTag);
    }
  };

  const onClickCloseButton = (ootdIndex: number, clothIndex: number) => {
    if (isDragging) return;
    const updatedElements = [...imageAndTag!];
    updatedElements[ootdIndex].ootdImageClothesList?.splice(clothIndex, 1);
    setImageAndTag(updatedElements);
  };

  //이미지 + 태그 컴포넌트
  const ImageTag = () => {
    return (
      <Carousel
        slidesToShow={1}
        infinite={false}
        beforeChange={(_current: number, next: number) => setSlideIndex(next)}
        dots={true}
        initialSlide={0}
      >
        {imageAndTag?.map((item, ootdIndex) => {
          return (
            <>
              <S.Image ref={dragRef}>
                {item.ootdImageClothesList &&
                  item.ootdImageClothesList?.map((element, index) => {
                    return (
                      <Draggable
                        key={index}
                        bounds=".image"
                        onDrag={(e, data) => onDrag(index, ootdIndex, e, data)}
                        onStop={handleStopDrag}
                        position={{
                          x: Number(element.coordinate.xrate),
                          y: Number(element.coordinate.yrate),
                        }}
                      >
                        <div className="sample">
                          <TagInformation
                            clothId={element.clothesId}
                            clothImage={element.clothesImage}
                            caption={element.caption}
                            brand={element.brand}
                            clothSize={element.size}
                            category={element.category}
                            name={element.name}
                            state={element.state as 'dark' | 'light'}
                            onTouchEnd={() =>
                              onClickCloseButton(ootdIndex, index)
                            }
                          />
                        </div>
                      </Draggable>
                    );
                  })}
                {/* 이미지 */}
                <S.BigImage>
                  <NextImage
                    onClick={onClickImage}
                    className="image"
                    ref={imageRef}
                    src={item.ootdImage}
                    alt=""
                    fill={true}
                  />
                </S.BigImage>
              </S.Image>
            </>
          );
        })}
      </Carousel>
    );
  };

  return (
    <S.Layout>
      <Background isOpen={addTag} onClick={() => setAddTag(false)} />
      {/* 이미지 + 태그 */}
      {ImageTag()}
      {/* 태그 가이드 */}
      <S.Tag>
        <Body3>원하는 곳을 터치해서 옷 정보를 태그해보세요.</Body3>
      </S.Tag>
      {/* 다음버튼 */}
      <NextButton
        className="nextButton"
        state={tagSelectedState}
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
        componentHeight={componentHeight}
        componentWidth={componentWidth}
      />
    </S.Layout>
  );
}
