import Modal from '@/components/Modal';
import S from './style';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Title1 } from '@/components/UI';
import NextButton from '@/components/NextButton';
import ClothCategory from '@/components/ClothCategory';
import { AiOutlineClose } from 'react-icons/ai';

interface ClothCategoryModalProps {
  isOpen: Boolean;
  setClothCategory: Dispatch<SetStateAction<CategoryListType[] | null>>;
  setIsOpen: Dispatch<SetStateAction<Boolean>>;
  categoryInitial?: CategoryListType[] | null;
}

export type CategoryType = {
  id: number;
  name: string;
  state?: Boolean;
};

export type CategoryListType = {
  id: number;
  name: string;
  state?: Boolean;
  detailCategories?: CategoryType[];
};
/*
이름: 옷 카테고리 모달
역할: 옷 등록 페이지에서 사용되는 옷 카테고리 선택 모달 컴포넌트
*/
export default function ClothCategoryModal({
  isOpen,
  setIsOpen,
  setClothCategory,
  categoryInitial,
}: ClothCategoryModalProps) {
  //선택된 카테고리 리스트
  const [selectedCategory, setSelectedCategory] = useState<
    CategoryListType[] | null
  >(null);

  //카테고리 리스트
  const [categoryList, setCategoryList] = useState<CategoryListType[] | null>(
    null
  );
  //제출 가능 상태
  const [submitButtonState, setSubmitButtonState] = useState<Boolean>(false);

  //카테고리 리스트 상태 변경 시 카테고리 중 선택된게 있다면 제출 가능 상태를 true로 업데이트
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

  //다음 단계 버튼 클릭 이벤트
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
