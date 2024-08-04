import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Layout, SearchIcon, SearchInput, Input, CloseIcon } from './style';
import { AiOutlineSearch, AiFillCloseCircle } from 'react-icons/ai';

interface SearchProps {
  placeholder: string;
  letter: string;
  setLetter: Dispatch<SetStateAction<string>>;
  onChange?: any;
}

/*
이름: 검색 바
역할: 공용으로 사용되는 검색어가 바뀔때 마다 검색을 하는 검색창 컴포넌트
*/
export default function SearchBar({
  placeholder,
  letter,
  setLetter,
}: SearchProps) {
  //포커싱 상태
  const [focusState, setFocusState] = useState<Boolean>(false);

  //input 입력 시 letter를 업데이트 하는 함수
  const onChangeInput = (value: string) => {
    setLetter(value);
  };

  //console.log 자리에 검색 api가 올 예정
  const search = () => {
    console.log('출력', letter);
    // onChange!();
  };

  //delete 아이콘 클릭 시 실행되는 함수
  const onClickCloseIcon = () => {
    setLetter('');
  };

  useEffect(() => {
    search();
  }, [letter]);

  return (
    <>
      <Layout
        onFocus={() => setFocusState(true)}
        onBlur={() => setFocusState(false)}
        state={focusState}
      >
        <SearchIcon>
          <AiOutlineSearch />
        </SearchIcon>
        <SearchInput>
          <Input
            value={letter}
            onChange={(e) => onChangeInput(e.target.value)}
            placeholder={placeholder}
          />
        </SearchInput>
        {letter && (
          <CloseIcon>
            <AiFillCloseCircle onClick={onClickCloseIcon} />
          </CloseIcon>
        )}
      </Layout>
    </>
  );
}
