import Modal from '@/components/Modal';
import S from './style';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Body2, Title1 } from '@/components/UI';
import NextButton from '@/components/NextButton';
import ClothApi from '@/apis/domain/Cloth/ClothApi';
import { AiOutlineClose } from 'react-icons/ai';

interface ClothSizeProps {
  isOpen: Boolean;
  setClothSize: Dispatch<SetStateAction<SizeItem | null>>;
  setIsOpen: Dispatch<SetStateAction<Boolean>>;
  categoryId: number;
  clothSizeInitial: SizeItem | null;
}

export type SizeItem = {
  id: number;
  name: string;
};

export type SizeListType = SizeItem[][];

/*
이름: 옷 사이즈 모달
역할: 옷 등록 페이지에서 사용된 옷 사이즈 모달
특이사항: 옷 카테고리에 따라 다른 사이즈 등장
*/
export default function ClothSizeModal({
  isOpen,
  setClothSize,
  setIsOpen,
  categoryId,
  clothSizeInitial,
}: ClothSizeProps) {
  //선택된 옷 사이즈
  const [selectedClothSize, setSelectedClothSize] = useState<SizeItem | null>(
    null
  );

  //사이즈 리스트
  const [sizeList, setSizeList] = useState<SizeListType | null>(null);

  const { getSize } = ClothApi();

  //사이즈 조회 api 를 가져와 기존에 선택된 사이즈를 업데이트
  useEffect(() => {
    const fetchData = async () => {
      const result = await getSize(categoryId);
      const newSizeList = [] as SizeListType;
      if (clothSizeInitial) setSelectedClothSize(clothSizeInitial);

      for (let size of result) {
        if (newSizeList.length === 0) {
          newSizeList.push([{ id: size.id, name: size.name }]);
          continue;
        }

        //lineNo에 의해 줄이 결정됨, 같은 lineNo끼리 모아줌
        if (newSizeList.length === size.lineNo) {
          newSizeList[newSizeList.length - 1].push({
            id: size.id,
            name: size.name,
          });
          continue;
        }
        newSizeList.push([{ id: size.id, name: size.name }]);
      }
      setSizeList(newSizeList);
    };
    if (categoryId === 0) {
      alert('카테고리를 선택해주세요');
      setIsOpen(false);
      return;
    }
    fetchData();
  }, []);

  //사이즈 버튼 클릭 함수
  const onClickSize = (row: number, col: number) => {
    setSelectedClothSize(sizeList![row][col]);
  };

  //다음 단계 버튼 클릭 함수
  const onClickNextButton = () => {
    setClothSize(selectedClothSize);
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} height="70">
      <S.Layout>
        <S.Title>
          <Title1 className="title">사이즈</Title1>
          <AiOutlineClose onClick={() => setIsOpen(false)} className="close" />
        </S.Title>
        <S.SizeLayout>
          {sizeList &&
            sizeList.map((item, index) => {
              return (
                <S.SizeBlock key={index}>
                  {item.map((items, indexs) => {
                    return (
                      <S.Size
                        onClick={() => onClickSize(index, indexs)}
                        key={indexs}
                        many={item.length}
                        state={selectedClothSize?.id === items.id}
                      >
                        <Body2>{items.name}</Body2>
                      </S.Size>
                    );
                  })}
                </S.SizeBlock>
              );
            })}
        </S.SizeLayout>
        <NextButton
          state={selectedClothSize !== null}
          onClick={onClickNextButton}
          className="nextButton"
        >
          선택 완료
        </NextButton>
      </S.Layout>
    </Modal>
  );
}
