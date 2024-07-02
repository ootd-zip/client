import S from './style';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Body3 } from '@/components/UI';
import { CategoryListType } from '@/utils/types/OOTD.types';
import ClothApi from '@/apis/domain/Cloth/ClothApi';

interface ClothCategoryModalProps {
  setCategoryList: Dispatch<SetStateAction<CategoryListType[] | null>>;
  setSelectedCategory: Dispatch<SetStateAction<CategoryListType[] | null>>;
  categoryList: CategoryListType[] | null;
  categoryInitital?: CategoryListType[] | null;
  type: 'one' | 'many';
}

export default function ClothCategory({
  categoryList,
  categoryInitital,
  setCategoryList,
  setSelectedCategory,
  type,
}: ClothCategoryModalProps) {
  const { getClothCategory } = ClothApi();

  const [bigCategoryClickedIndex, setbigCategoryClickedIndex] =
    useState<number>(0);
  const [smallCategoryClickedIndex, setsmallCategoryClickedIndex] = useState<
    number | null
  >(null);

  const [init, setInit] = useState<number>(0);

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

  const onClickBigCategory = (id: number, index: number) => {
    setbigCategoryClickedIndex(index);

    let newCategory = JSON.parse(JSON.stringify(categoryList));

    newCategory[index].state = !newCategory[index].state;

    newCategory[index].detailCategories = newCategory[
      index
    ].detailCategories?.map((item: CategoryListType) => {
      return { ...item, state: false };
    });

    setCategoryList(newCategory);
  };

  const onClickSmallCategory = (index: number) => {
    setsmallCategoryClickedIndex(index);

    const newCategory = JSON.parse(
      JSON.stringify(categoryList)
    ) as CategoryListType[];
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
