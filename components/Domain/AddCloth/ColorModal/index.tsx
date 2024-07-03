import { Title1, Button3 } from '@/components/UI';
import S from './style';
import Modal from '@/components/Modal';
import NextButton from '@/components/NextButton';
import { AiOutlineClose } from 'react-icons/ai';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import React from 'react';
import ColorList from '@/components/ColorList';
import ClothApi from '@/apis/domain/Cloth/ClothApi';
import { ColorListType } from '@/utils/types/OOTD.types';
interface ColorModalProps {
  isOpen: Boolean;
  setIsOpen: Dispatch<SetStateAction<Boolean>>;
  setClothColor: Dispatch<SetStateAction<ColorListType | null>>;
  colorInitial: ColorListType | null;
}

const ColorModal = ({
  isOpen,
  setClothColor,
  setIsOpen,
  colorInitial,
}: ColorModalProps) => {
  const [selectedColorList, setSelectedColorList] =
    useState<ColorListType | null>(null);

  const [colorList, setColorList] = useState<ColorListType>([]);

  const onClickNextButton = () => {
    setClothColor(selectedColorList);
    setIsOpen(false);
  };

  const onClickCloseColorButton = (colorId: number) => {
    const newColorList = colorList.map((item) => {
      if (item.id === colorId) {
        return { ...item, state: false };
      }
      return item;
    });

    setColorList(newColorList!);
  };

  return (
    <Modal isOpen={isOpen} height="70">
      <S.Layout>
        <S.Title>
          <Title1 className="title">색상</Title1>
          <AiOutlineClose onClick={() => setIsOpen(false)} className="close" />
        </S.Title>
        <S.ColorList>
          <ColorList
            setSelectedColorList={setSelectedColorList}
            colorList={colorList}
            setColorList={setColorList}
            colorInitital={colorInitial}
          />
        </S.ColorList>
        {selectedColorList !== null && selectedColorList.length > 0 && (
          <>
            <hr />
            <S.SelectedColorList>
              {selectedColorList.map((item, index) => {
                return (
                  <S.SelectedColor key={index}>
                    <Button3 className="selectedColor">{item.name}</Button3>
                    <AiOutlineClose
                      onClick={() => onClickCloseColorButton(item.id)}
                    />
                  </S.SelectedColor>
                );
              })}
            </S.SelectedColorList>
          </>
        )}

        <NextButton
          onClick={onClickNextButton}
          state={selectedColorList !== null && selectedColorList.length > 0}
          className="nextButton"
        >
          선택완료
        </NextButton>
      </S.Layout>
    </Modal>
  );
};

export default ColorModal;
