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
import BrandList from '@/components/BrandList';
import { CategoryListType } from '@/components/Domain/AddCloth/ClothCategoryModal';
import { MyPageApi } from '@/apis/domain/MyPage/MyPageApi';
import { useRouter } from 'next/router';
import ClothApi from '@/apis/domain/Cloth/ClothApi';
import {
  GenderTypes,
  SearchFilterData,
} from '@/components/Domain/Search/SearchResult/ClosetCloth';

interface FilterModalProps {
  isOpen: Boolean;
  setFilterModalIsOpen: Dispatch<SetStateAction<Boolean>>;
  categoryInitital: CategoryListType[] | null;
  colorInitital: ColorListType | null;
  brandInitial: BrandType[] | null;
  setFilter: Dispatch<SetStateAction<SearchFilterData>>;
  initialIndex: number;
  page: 'mypage' | 'search';
  gender?: GenderTypes;
}
/*
이름: 마이페이지 옷 검색 필터 모달
역할: 마이페이지에서 사용되는 유저의 옷을 구분하기 위한 필터 모달 컴포넌트
*/
export default function FilterModal({
  isOpen,
  setFilterModalIsOpen,
  setFilter,
  categoryInitital,
  colorInitital,
  brandInitial,
  initialIndex,
  page,
  gender,
}: FilterModalProps) {
  //선택된 색상 리스트
  const [selectedColorList, setSelectedColorList] =
    useState<ColorListType | null>(null);

  //선택된 브랜드
  const [selectedBrand, setSelectedBrand] = useState<BrandType[] | null>(null);

  //선택된 카테고리
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryListType[] | null
  >(null);

  //카테고리 리스트
  const [categoryList, setCategoryList] = useState<CategoryListType[] | null>(
    null
  );

  //색상 리스트
  const [colorList, setColorList] = useState<ColorListType>([]);

  //브랜드 리스트
  const [brandList, setBrandList] = useState<BrandType[] | null>(null);

  const { getUserBrand } = MyPageApi();
  const { getBrand } = ClothApi();

  const router = useRouter();

  //유저가 가지고 있는 브랜드 조회 api 호출 함수
  const fetchBrandDataFunction = async () => {
    if (!router.isReady) return;
    if (page === 'mypage') {
      const data = await getUserBrand(Number(router.query.UserId![0]));
      setBrandList(data);
    } else {
      const data = await getBrand('');
      setBrandList(data);
    }
  };

  useEffect(() => {
    fetchBrandDataFunction();
  }, []);

  //완료 버튼 클릭 함수
  const onClickSubmitButton = () => {
    //마이페이지와 검색 모두 사용되는 컴포넌트, 구분해줌
    if (page === 'mypage') {
      setFilter({
        category: selectedCategory,
        color: selectedColorList,
        brand: selectedBrand,
        isOpen: null,
      });
    } else {
      setFilter({
        category: selectedCategory,
        color: selectedColorList,
        brand: selectedBrand,
        isOpen: true,
        gender: gender,
      });
    }

    setFilterModalIsOpen(false);
  };

  //초기화 버튼 클릭 함수
  const onClickInitButton = () => {
    setSelectedBrand(null);
    setSelectedCategory(null);
    setSelectedColorList(null);
    setCategoryList(
      categoryList &&
        categoryList?.map((item) => {
          return {
            ...item,
            state: false,
            detailCategories: item.detailCategories?.map((items) => {
              return { ...items, state: false };
            }),
          };
        })
    );
    setColorList(
      colorList.map((item) => {
        return { ...item, state: false };
      })
    );
    setBrandList(
      brandList &&
        brandList.map((item) => {
          return { ...item, state: false };
        })
    );
  };

  //선택된 카테고리 해제 버튼 클릭 함수
  const onClickCloseCategoryButton = (
    categoryId: number,
    type: 'big' | 'small'
  ) => {
    let newCategoryList = [] as CategoryListType[] | undefined;
    //상위 카테고리인 경우
    if (type === 'big') {
      newCategoryList = categoryList?.map((item) => {
        if (item.id === categoryId) {
          return { ...item, state: false };
        }
        return item;
      });
    } //하위 카테고리인 경우
    else {
      newCategoryList = categoryList?.map((item) => {
        return {
          ...item,
          detailCategories: item.detailCategories!.map((items) => {
            if (items.id === categoryId) return { ...items, state: false };
            return items;
          }),
        };
      });
    }
    setCategoryList(newCategoryList ? newCategoryList : null);
  };

  //선택된 색상 해제 버튼 클릭 함수
  const onClickCloseColorButton = (colorId: number) => {
    const newColorList = colorList.map((item) => {
      if (item.id === colorId) {
        return { ...item, state: false };
      }
      return item;
    });

    setColorList(newColorList!);
  };

  //선택된 브랜드 해제 버튼 클릭 함수
  const onClickCloseBrandButton = (brandId: number) => {
    const newBrandList = brandList!.map((item) => {
      if (item.id === brandId) {
        return { ...item, state: false };
      }
      return item;
    });

    setBrandList(newBrandList);
  };

  return (
    <Modal isOpen={isOpen} height="65">
      <S.Layout>
        {/*슬라이드를 통해 옆 필터로 이동하기 위해 TabView 사용 */}
        <TabView initialIndex={initialIndex}>
          <TabView.TabBar
            tab={['카테고리', '색상', '브랜드']}
            display="block"
          />
          <div className="main">
            <TabView.Tabs>
              <TabView.Tab>
                {/*카테고리*/}
                <ClothCategory
                  type="many"
                  categoryList={categoryList}
                  setCategoryList={setCategoryList}
                  setSelectedCategory={setSelectedCategory}
                  categoryInitital={categoryInitital}
                />
              </TabView.Tab>
              <TabView.Tab>
                {/*색상*/}
                <ColorList
                  setSelectedColorList={setSelectedColorList}
                  className="colorList"
                  colorList={colorList}
                  colorInitital={colorInitital}
                  setColorList={setColorList}
                />
              </TabView.Tab>
              <TabView.Tab>
                {/*브랜드*/}
                <Body4 className="top" state="emphasis">
                  {brandList
                    ? `총 ${brandList!.length}개의 브랜드`
                    : `총 0개의 브랜드`}
                </Body4>
                {brandList && (
                  <BrandList
                    many="many"
                    brandList={brandList}
                    setBrandList={setBrandList}
                    brandInitial={brandInitial}
                    setSelectedBrand={setSelectedBrand}
                  />
                )}
              </TabView.Tab>
            </TabView.Tabs>
          </div>
        </TabView>
        {/*선택된 필터들*/}
        {
          <S.SelectedFilter
            state={
              (selectedCategory !== null && selectedCategory.length !== 0) ||
              (selectedBrand !== null && selectedBrand.length !== 0) ||
              (selectedColorList !== null && selectedColorList.length !== 0)
            }
          >
            {/*카테고리*/}
            {selectedCategory?.map((item, index) => {
              return (
                <S.SelectedFilterSpan key={index}>
                  {!item.state ? (
                    <Button3>{item.detailCategories![0].name}</Button3>
                  ) : (
                    <Button3>{item.name}</Button3>
                  )}
                  <AiOutlineClose
                    onClick={() =>
                      onClickCloseCategoryButton(
                        item.state ? item.id : item.detailCategories![0].id,
                        item.state ? 'big' : 'small'
                      )
                    }
                    className="close"
                  />
                </S.SelectedFilterSpan>
              );
            })}
            {/*색상*/}
            {selectedColorList?.map((item, index) => {
              return (
                <S.SelectedFilterSpan key={index}>
                  <Button3>{item.name}</Button3>
                  <AiOutlineClose
                    onClick={() => onClickCloseColorButton(item.id)}
                    className="close"
                  />
                </S.SelectedFilterSpan>
              );
            })}
            {/*브랜드*/}
            {selectedBrand?.map((item, index) => {
              return (
                <S.SelectedFilterSpan key={index}>
                  <Button3>{item.name}</Button3>
                  <AiOutlineClose
                    onClick={() => onClickCloseBrandButton(item.id)}
                    className="close"
                  />
                </S.SelectedFilterSpan>
              );
            })}
          </S.SelectedFilter>
        }
        {/*버튼*/}
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
            backgroundColor="grey_00"
            border={false}
          >
            <Button3>완료</Button3>
          </Button>
        </S.SelectedButton>
      </S.Layout>
    </Modal>
  );
}
