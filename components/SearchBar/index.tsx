import { Dispatch, SetStateAction, useEffect } from 'react';
import { Layout, SearchIcon, SearchInput, Input, CloseIcon } from './style';
import { AiOutlineSearch, AiFillCloseCircle } from 'react-icons/ai';
import useDebounce from '@/hooks/useDebouce';

interface SearchProps {
  placeholder: string;
  letter: string;
  setLetter: Dispatch<SetStateAction<string>>;
  onChange?: any;
}

export default function SearchBar({
  placeholder,
  letter,
  setLetter,
  onChange,
}: SearchProps) {
  //input의 value

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

  //input 입력 시 실행되는 검색 api 함수에 디바운싱을 건 함수
  // useDebounce({
  //   func: () => search(),
  //   delay: 500,
  //   deps: [letter],
  // });

  return (
    <>
      <Layout state={letter?.length > 0}>
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
