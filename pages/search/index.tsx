import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import SearchBar from '@/components/SearchBar';
import S from './style';
import { Headline2 } from '@/components/UI';
import SearchResult from '@/components/Domain/Search/SearchResult';

export default function Search() {
  const [keyword, setKeyword] = useState<string>('');

  return (
    <S.Layout>
      <S.SearchField>
        <SearchBar placeholder="검색" letter={keyword} setLetter={setKeyword} />
      </S.SearchField>
      <SearchResult />
    </S.Layout>
  );
}
