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

export default function ClothSizeModal({
  isOpen,
  setClothSize,
  setIsOpen,
  categoryId,
  clothSizeInitial,
}: ClothSizeProps) {
  const [selectedClothSize, setSelectedClothSize] = useState<SizeItem | null>(
    null
  );

  const [sizeList, setSizeList] = useState<SizeListType | null>(null);

  const { getSize } = ClothApi();

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

  const onClickSize = (row: number, col: number) => {
    setSelectedClothSize(sizeList![row][col]);
  };

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
