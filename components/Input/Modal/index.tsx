import S from './style';
import { AiOutlineEdit, AiOutlineSearch } from 'react-icons/ai';
import { Dispatch, SetStateAction } from 'react';
import ReadOnly from '../ReadOnly';

interface ModalProps {
  result: React.ReactNode;
  setModalOpen: Dispatch<SetStateAction<Boolean>>;
  state: Boolean;
  type?: 'Link' | 'Write';
  action?: 'write';
}
/*
이름: 인풋 모달
역할: 클릭 시 모달로 넘어가는 인풋
특이사항: 값 선택전에는 disable한 상태
*/
export default function Modal({
  result,
  setModalOpen,
  state,
  type,
  action,
}: ModalProps) {
  const onClickSearchIcon = () => {
    setModalOpen(true);
  };

  return (
    <S.Layout onClick={onClickSearchIcon}>
      <ReadOnly state={state} result={result} type={type}></ReadOnly>
      <S.SearchIcon>
        {action === 'write' ? <AiOutlineEdit /> : <AiOutlineSearch />}
      </S.SearchIcon>
    </S.Layout>
  );
}
