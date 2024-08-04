import S from './style';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Body3 } from '@/components/UI';
import { CategoryListType } from '../Domain/AddCloth/ClothCategoryModal';
import ClothApi from '@/apis/domain/Cloth/ClothApi';

interface ClothCategoryModalProps {
  setCategoryList: Dispatch<SetStateAction<CategoryListType[] | null>>;
  setSelectedCategory: Dispatch<SetStateAction<CategoryListType[] | null>>;
  categoryList: CategoryListType[] | null;
  categoryInitital?: CategoryListType[] | null;
  type: 'one' | 'many';
}
/*
이름: 옷 카테고리 
역할: 옷 카테고리 리스트 컴포넌트 
*/
export default function ClothCategory({
  categoryList,
  categoryInitital,
  setCategoryList,
  setSelectedCategory,
  type,
}: ClothCategoryModalProps) {
  const { getClothCategory } = ClothApi();

  //큰 카테고리 현재 선택 인덱스
  const [bigCategoryClickedIndex, setbigCategoryClickedIndex] =
    useState<number>(0);
  //작은 카테고리 현재 선택 인덱스
  const [smallCategoryClickedIndex, setsmallCategoryClickedIndex] = useState<
    number | null
  >(null);

  const [init, setInit] = useState<number>(0);

  //카테고리 조회 api 호출 후 리스트로 업데이트
  useEffect(() => {
    const fetchCategory = async () => {
      const clothCategory = (await getClothCategory()) as CategoryListType[];

      if (clothCategory.length) {
        const newCategory = clothCategory.map((item) => {
          return {
            ...item,
            state: false,
            detailCategories: item.detailCategories!.map((items) => {
              return { ...items, state: false };
            }),
          };
        });
        setCategoryList(newCategory);
        setInit(init + 1);
      }
    };
    fetchCategory();
  }, []);

  //기존에 선택된 카테고리를 업데이트
  useEffect(() => {
    if (categoryInitital && categoryList) {
      let newCategory = JSON.parse(
        JSON.stringify(categoryList)
      ) as CategoryListType[];

      categoryInitital.map((item) => {
        if (item.state) {
          newCategory = newCategory.map((items) => {
            if (item.id === items.id) return { ...items, state: true };
            return items;
          });
          return;
        }
        for (let i = 0; i < newCategory.length; i++) {
          for (let j = 0; j < newCategory[i].detailCategories!.length; j++) {
            if (
              newCategory[i].detailCategories![j].id ===
              item.detailCategories![0].id
            ) {
              newCategory[i].detailCategories![j].state = true;
            }
          }
        }
      });
      setCategoryList(newCategory);
    }
  }, [init]);

  //상위 카테고리 선택 함수
  const onClickBigCategory = (id: number, index: number) => {
    setbigCategoryClickedIndex(index);

    let newCategory = JSON.parse(JSON.stringify(categoryList));

    //이미 선택되어있는 카테고리 선택 시 취소
    newCategory[index].state = !newCategory[index].state;

    //선택한 상위 카테고리의 하위 카테고리 모두 초기화
    newCategory[index].detailCategories = newCategory[
      index
    ].detailCategories?.map((item: CategoryListType) => {
      return { ...item, state: false };
    });

    setCategoryList(newCategory);
  };

  //하위 카테고리 선택 함수
  const onClickSmallCategory = (index: number) => {
    setsmallCategoryClickedIndex(index);

    const newCategory = JSON.parse(
      JSON.stringify(categoryList)
    ) as CategoryListType[];
    //하나만 선택 가능할 시 선택한 인덱스를 제외한 다른 인데스를 모두 초기화
    if (type === 'one') {
      const initialCategoryList = newCategory.map((item) => {
        return {
          ...item,
          state: false,
          detailCategories: item.detailCategories!.map((items) => {
            return { ...items, state: false };
          }),
        };
      });
      initialCategoryList[bigCategoryClickedIndex].state = false;
      initialCategoryList[bigCategoryClickedIndex].detailCategories![
        index
      ].state =
        !initialCategoryList[bigCategoryClickedIndex].detailCategories![index]
          .state;

      setCategoryList(initialCategoryList);
      return;
    }
    newCategory[bigCategoryClickedIndex].state = false;

    newCategory[bigCategoryClickedIndex].detailCategories![index].state =
      !newCategory[bigCategoryClickedIndex].detailCategories![index].state;

    setCategoryList(newCategory);
  };

  //카테고리 리스트에 변화가 생기면, 선택된 카테고리 리스트 상태 업데이트
  useEffect(() => {
    const selectedCategory = [] as CategoryListType[];

    if (categoryList) {
      for (let i = 0; i < categoryList?.length; i++) {
        if (categoryList[i].state) selectedCategory.push(categoryList[i]);
        if (
          categoryList[i].detailCategories &&
          categoryList[i].detailCategories!.length > 0
        )
          for (let j = 0; j < categoryList[i].detailCategories!.length; j++) {
            if (categoryList[i].detailCategories![j].state) {
              selectedCategory.push({
                id: categoryList[i].id,
                name: categoryList[i].name,
                state: categoryList[i].state,
                detailCategories: [categoryList![i].detailCategories![j]],
              });
            }
          }
      }
    }

    setSelectedCategory(selectedCategory.length > 0 ? selectedCategory : null);
  }, [categoryList]);

  return (
    <S.Layout>
      <S.Category>
        {/*상위 카테고리 */}
        <S.BigCategory>
          {categoryList &&
            categoryList.map((item, index) => {
              return (
                <S.BigCategorySpan
                  onClick={() => onClickBigCategory(item.id, index)}
                  state={index === bigCategoryClickedIndex}
                  key={index}
                >
                  <Body3>{item.name}</Body3>
                </S.BigCategorySpan>
              );
            })}
        </S.BigCategory>
        {/*하위 카테고리 */}
        <S.SmallCategory>
          {categoryList &&
            categoryList![bigCategoryClickedIndex].detailCategories?.map(
              (item, index) => {
                return (
                  <S.SmallCategorySpan
                    state={
                      type === 'one'
                        ? smallCategoryClickedIndex === index &&
                          item.state === true
                        : item.state === true
                    }
                    onClick={() => onClickSmallCategory(index)}
                    key={index}
                  >
                    <Body3>{item.name}</Body3>
                  </S.SmallCategorySpan>
                );
              }
            )}
        </S.SmallCategory>
      </S.Category>
    </S.Layout>
  );
}
