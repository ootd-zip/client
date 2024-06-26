import { Dispatch, SetStateAction, useEffect, useLayoutEffect } from 'react';
import S from './style';
import ColorSpan from './ColorSpan';
import ClothApi from '@/apis/domain/Cloth/ClothApi';
import { ColorListType } from '@/utils/types/OOTD.types';

interface ColorListProps {
  colorList: ColorListType;
  setColorList: Dispatch<SetStateAction<ColorListType>>;
  setSelectedColorList: Dispatch<SetStateAction<ColorListType | null>>;
  colorInitital: ColorListType | null;
  className?: string;
}

export default function ColorList({
  setSelectedColorList,
  colorInitital,
  className,
  colorList,
  setColorList,
}: ColorListProps) {
  const { getColor } = ClothApi();

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

  useEffect(() => {
    const selectedColor = colorList.filter((item) => item.state);
    setSelectedColorList(selectedColor);
  }, [colorList]);

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
            <ColorSpan
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
