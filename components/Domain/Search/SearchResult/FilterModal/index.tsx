import Modal from '@/components/Modal';
import S from './style';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import TabView from '@/components/TabView';
import ClothCategory from '@/components/ClothCategory';
import ColorList, { ColorListType } from '@/components/ColorList';
import { Body4, Button3 } from '@/components/UI';
import { AiOutlineClose } from 'react-icons/ai';
import Button from '@/components/Button';
import { BrandType } from '@/components/BrandList/Brand';
import { FilterData } from '../ClosetCloth';
import BrandList from '@/components/BrandList';
import {
  CategoryListType,
  SelectedCategoryType,
} from '@/components/Domain/AddCloth/ClothCategoryModal';

interface FilterModalProps {
  isOpen: Boolean;
  setFilterModalIsOpen: Dispatch<SetStateAction<Boolean>>;
  categoryInitital: CategoryListType[] | null;
  colorInitital: ColorListType | null;
  brandInitial: BrandType[] | null;
  setFilter: Dispatch<SetStateAction<FilterData>>;
}

export default function FilterModal({
  isOpen,
  setFilterModalIsOpen,
  setFilter,
  colorInitital,
  brandInitial,
}: FilterModalProps) {
  const [selectedColorList, setSelectedColorList] =
    useState<ColorListType | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<
    SelectedCategoryType[] | null
  >(null);

  const [selectedBrand, setSelectedBrand] = useState<BrandType[] | null>(null);

  const [bigCategoryList, setBigCategoryList] = useState<CategoryListType[]>(
    []
  );
  const [smallCategoryList, setSmallCategoryList] = useState<
    CategoryListType[]
  >([]);

  const [colorList, setColorList] = useState<ColorListType>([
    { colorId: 0, color: '#BB193E', name: '버건디', state: false },
    { colorId: 1, color: '#D50C0C', name: '레드', state: false },
    { colorId: 2, color: '#F66800', name: '오렌지', state: false },
    { colorId: 3, color: '#F3E219', name: '옐로우', state: false },
    { colorId: 4, color: '#764006', name: '브라운', state: false },
    { colorId: 5, color: '#C47C26', name: '카멜', state: false },
    { colorId: 6, color: '#EBBD87', name: '탄', state: false },
    { colorId: 7, color: '#F5ECC3', name: '베이지', state: false },
    { colorId: 8, color: '#F5ECC3', name: '아이보리', state: false },
    { colorId: 9, color: '#5AD99F', name: '민트', state: false },
    { colorId: 10, color: '#21BA21', name: '그린', state: false },
    { colorId: 11, color: '#71842F', name: '카키', state: false },
  ]);

  const [brandList, setBrandList] = useState<BrandType[] | null>([
    { brandId: 0, korean: '나이키', english: 'Nike', state: false },
    { brandId: 1, korean: '아디다스', english: 'Adidas', state: false },
    { brandId: 2, korean: '퓨마', english: 'Puma', state: false },
    { brandId: 3, korean: '조던', english: 'Jordan', state: false },
  ]);

  const onClickSubmitButton = () => {
    setFilter({
      // category: selectedCategory,
      // color: selectedColorList,
      category: selectedCategory,
      color: selectedColorList,
      brand: selectedBrand,
      isMan: null,
    });
    setFilterModalIsOpen(false);
  };

  const onClickInitButton = () => {
    setFilter({
      category: null,
      color: null,
      brand: null,
      isMan: null,
    });
    setFilterModalIsOpen(false);
  };

  const onClickCloseCategoryButton = (categoryId: number) => {
    const newSmallCategoryList = smallCategoryList.map((item) => {
      if (item.categoryId === categoryId) {
        return { ...item, state: false };
      }
      return item;
    });
    console.log(newSmallCategoryList);
    setSmallCategoryList(newSmallCategoryList);
  };

  const onClickCloseColorButton = (colorId: number) => {
    const newColorList = colorList.map((item) => {
      if (item.colorId === colorId) {
        return { ...item, state: false };
      }
      return item;
    });

    setColorList(newColorList!);
  };

  const onClickCloseBrandButton = (brandId: number) => {
    const newBrandList = brandList!.map((item) => {
      if (item.brandId === brandId) {
        return { ...item, state: false };
      }
      return item;
    });

    setBrandList(newBrandList);
  };

  useEffect(() => {
    console.log(selectedCategory);
  }, [selectedCategory]);

  return (
    <Modal isOpen={isOpen} height="60">
      <S.Layout>
        <TabView>
          <TabView.TabBar tab={['카테고리', '색상', '브랜드']} />
          <div className="main">
            <TabView.Tabs>
              <TabView.Tab>
                <ClothCategory
                  smallCategoryList={smallCategoryList}
                  bigCategoryList={bigCategoryList}
                  setBigCategoryList={setBigCategoryList}
                  setSmallCategoryList={setSmallCategoryList}
                  setSelectedCategory={setSelectedCategory}
                />
              </TabView.Tab>
              <TabView.Tab>
                <ColorList
                  colorInitital={colorInitital}
                  setSelectedColorList={setSelectedColorList}
                  className="colorList"
                  selectedColorList={selectedColorList}
                  colorList={colorList}
                  setColorList={setColorList}
                />
              </TabView.Tab>
              <TabView.Tab>
                <Body4 className="top" state="emphasis">
                  {brandList
                    ? `총${brandList!.length}개의 브랜드`
                    : `총 0개의 브랜드`}
                </Body4>
                <BrandList
                  brandList={brandList}
                  setBrandList={setBrandList}
                  brandInitial={brandInitial}
                  setSelectedBrand={setSelectedBrand}
                />
              </TabView.Tab>
            </TabView.Tabs>
          </div>
        </TabView>
        <S.SelectedFilter>
          {selectedCategory?.map((item, index) => {
            return (
              <S.SelectedFilterSpan key={index}>
                {item.smallCategory ? (
                  <Button3>{item.smallCategory}</Button3>
                ) : (
                  <Button3>{item.bigCategory}</Button3>
                )}
                <AiOutlineClose
                  onClick={() => onClickCloseCategoryButton(item.categoryId)}
                  className="close"
                />
              </S.SelectedFilterSpan>
            );
          })}
          {selectedColorList?.map((item, index) => {
            return (
              <S.SelectedFilterSpan key={index}>
                <Button3>{item.name}</Button3>
                <AiOutlineClose
                  onClick={() => onClickCloseColorButton(item.colorId)}
                  className="close"
                />
              </S.SelectedFilterSpan>
            );
          })}
          {selectedBrand?.map((item, index) => {
            return (
              <S.SelectedFilterSpan key={index}>
                <Button3>{item.korean}</Button3>
                <AiOutlineClose
                  onClick={() => onClickCloseBrandButton(item.brandId)}
                  className="close"
                />
              </S.SelectedFilterSpan>
            );
          })}
        </S.SelectedFilter>
        <S.SelectedButton
          state={
            (selectedCategory !== null && selectedCategory.length > 0) ||
            (selectedColorList !== null && selectedColorList.length > 0) ||
            (selectedBrand !== null && selectedBrand.length > 0)
          }
        >
          <Button
            className="init"
            size="big"
            onClick={onClickInitButton}
            color="grey_40"
            backgroundColor="grey_100"
            border={false}
          >
            <Button3>초기화</Button3>
          </Button>
          <Button
            className="submit"
            size="big"
            onClick={onClickSubmitButton}
            color="grey_100"
            backgroundColor="grey_90"
            border={false}
          >
            <Button3>완료</Button3>
          </Button>
        </S.SelectedButton>
      </S.Layout>
    </Modal>
  );
}
