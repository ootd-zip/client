import Modal from '@/components/Modal';
import S from './style';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Title1 } from '@/components/UI';
import NextButton from '@/components/NextButton';
import ClothCategory from '@/components/ClothCategory';
import { AiOutlineClose } from 'react-icons/ai';
import { CategoryListType } from '@/utils/types/OOTD.types';

interface ClothCategoryModalProps {
  isOpen: Boolean;
  setClothCategory: Dispatch<SetStateAction<CategoryListType[] | null>>;
  setIsOpen: Dispatch<SetStateAction<Boolean>>;
  categoryInitial?: CategoryListType[] | null;
}

export default function ClothCategoryModal({
  isOpen,
  setIsOpen,
  setClothCategory,
  categoryInitial,
}: ClothCategoryModalProps) {
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryListType[] | null
  >(null);

  const [categoryList, setCategoryList] = useState<CategoryListType[] | null>(
    null
  );
  const [submitButtonState, setSubmitButtonState] = useState<Boolean>(false);

  useEffect(() => {
    const filteredCategoryList = [];
    categoryList?.forEach((item: CategoryListType) => {
      item.detailCategories!.forEach((items) => {
        if (items.state) {
          filteredCategoryList.push(1);
        }
        return;
      });
    });
    if (filteredCategoryList.length !== 0) {
      setSubmitButtonState(true);
      return;
    }
    setSubmitButtonState(false);
  }, [categoryList]);

  const onClickNextButton = () => {
    setClothCategory(selectedCategory);
    setIsOpen(false);
  };

  return (
    <Modal height="60" isOpen={isOpen}>
      <S.Layout>
        <S.Title>
          <Title1 className="title">카테고리</Title1>
          <AiOutlineClose onClick={() => setIsOpen(false)} className="close" />
        </S.Title>
        <ClothCategory
          categoryList={categoryList}
          setCategoryList={setCategoryList}
          setSelectedCategory={setSelectedCategory}
          type="one"
          categoryInitital={categoryInitial}
        />
        <NextButton
          className="nextButton"
          state={submitButtonState}
          onClick={onClickNextButton}
        >
          선택 완료
        </NextButton>
      </S.Layout>
    </Modal>
  );
}
