import { Title1, Button3 } from '@/components/UI';
import S from './style';
import Modal from '@/components/Modal';
import NextButton from '@/components/NextButton';
import { AiOutlineClose } from 'react-icons/ai';
import { Dispatch, SetStateAction, useState } from 'react';
import React from 'react';
import ColorList, { ColorListType } from '@/components/ColorList';
interface ColorModalProps {
  isOpen: Boolean;
  setIsOpen: Dispatch<SetStateAction<Boolean>>;
  setClothColor: Dispatch<SetStateAction<ColorListType | null>>;
  colorInitial: ColorListType | null;
}

/*
이름: 색상 모달
역할: 옷 등록 시 사용되는 색상 선택 모달
*/
const ColorModal = ({
  isOpen,
  setClothColor,
  setIsOpen,
  colorInitial,
}: ColorModalProps) => {
  //선택된 색상 리스트
  const [selectedColorList, setSelectedColorList] =
    useState<ColorListType | null>(null);

  //색상 리스트
  const [colorList, setColorList] = useState<ColorListType>([]);

  //다음 단계 버튼 클릭 이벤트
  const onClickNextButton = () => {
    setClothColor(selectedColorList);
    setIsOpen(false);
  };

  //선택된 색상 제거 버튼 클릭 이벤트
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
        {/*색상 리스트 */}
        <S.ColorList>
          <ColorList
            setSelectedColorList={setSelectedColorList}
            colorList={colorList}
            setColorList={setColorList}
            colorInitital={colorInitial}
          />
        </S.ColorList>
        {/*선택된 색상 리스트*/}
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
