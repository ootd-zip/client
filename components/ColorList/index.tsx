import { Dispatch, SetStateAction, useEffect } from 'react';
import S from './style';
import BigColor from './BigColor';
import ClothApi from '@/apis/domain/Cloth/ClothApi';

export type ColorListType = {
  id: number;
  name: string;
  colorCode: string;
  state: Boolean;
}[];

interface ColorListProps {
  colorList: ColorListType;
  setColorList: Dispatch<SetStateAction<ColorListType>>;
  setSelectedColorList: Dispatch<SetStateAction<ColorListType | null>>;
  colorInitital: ColorListType | null;
  className?: string;
}

/*
이름: 색상 리스트
역할: 공용으로 사용되는 색상 리스트 컴포넌트
*/
export default function ColorList({
  setSelectedColorList,
  colorInitital,
  className,
  colorList,
  setColorList,
}: ColorListProps) {
  const { getColor } = ClothApi();

  //색상 조회 api를 가져와 기존에 선택된 색상을 업데이트
  useEffect(() => {
    const fetchColor = async () => {
      const color = (await getColor()) as ColorListType;

      const newColor = color.map((item) => {
        return { ...item, state: false };
      });

      if (!colorInitital) {
        setColorList(newColor);
        return;
      }

      const newColorList = newColor.map((color) => ({
        ...color,
        state:
          colorInitital &&
          colorInitital.some((initialColor) => initialColor.id === color.id),
      }));

      setColorList(newColorList);
    };
    fetchColor();
  }, []);

  //색상 리스트가 변경될 때 마다 선택된 색상 리스트를 업데이트
  useEffect(() => {
    const selectedColor = colorList.filter((item) => item.state);
    setSelectedColorList(selectedColor);
  }, [colorList]);

  //색상 선택 함수
  const onClickColorSpan = (index: number) => {
    setColorList((prevColorList) => {
      return prevColorList.map((item, i) =>
        i === index ? { ...item, state: !item.state } : item
      );
    });
  };

  return (
    <S.Layout className={className}>
      <S.ColorList>
        {colorList.map((item, index) => {
          return (
            <BigColor
              color={item.colorCode}
              name={item.name}
              state={item.state}
              key={index}
              index={index}
              onClick={() => onClickColorSpan(index)}
            />
          );
        })}
      </S.ColorList>
    </S.Layout>
  );
}
