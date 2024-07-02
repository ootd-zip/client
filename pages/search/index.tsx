import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import RecentsSearchBar from '@/components/RecentsSearchBar';
import S from '@/pageStyle/search/style';
import SearchResult from '@/components/Domain/Search/SearchResult';
import Recents from '@/components/Domain/Search/Recents';
import { useRouter } from 'next/router';
import Toast from '@/components/Toast';
import { keywordsInterface } from '@/utils/types/OOTD.types';

export default function Search() {
  const [keywords, setKeywords] = useState<keywordsInterface[]>([]);
  const [state, setState] = useState<Boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const result = localStorage.getItem('keywords') || '[]';
      setKeywords(JSON.parse(result));
    }
  }, []);

  useEffect(() => {
    if (keywords.length > 15) {
      const updatedKeywords = keywords.slice(0, 15);
      setKeywords(updatedKeywords);
      localStorage.setItem('keywords', JSON.stringify(updatedKeywords));
    } else {
      localStorage.setItem('keywords', JSON.stringify(keywords));
    }
  }, [keywords]);

  useEffect(() => {
    const { query } = router;
    const { q } = query;
    if (q) {
      setSearchValue(q.toString());
      setState(true);
    }
  }, [router.query]);

  const handleAddKeyword = (text: string) => {
    if (text.trim() === '') return; // 공백일 경우 무시

    const newKeyword = {
      id: Date.now(),
      text: text,
    };

    const updatedKeywords = keywords.filter((item) => item.text !== text); // 이미 존재하는 키워드가 있다면 제거
    setKeywords([newKeyword, ...updatedKeywords]); // 새로운 키워드를 배열의 맨 앞에 추가
  };

  const handleRemoveKeyword = (id: number) => {
    const nextKeyword = keywords.filter((thisKeyword) => {
      return thisKeyword.id != id;
    });
    setKeywords(nextKeyword);
  };

  const handleSearch = (text: string) => {
    setSearchValue(text);
    router.push(`/search?q=${encodeURIComponent(text)}`);
  };

  const [searchValue, setSearchValue] = useState<string>('');
  const [queryState, setQueryState] = useState<Boolean>(false);

  useEffect(() => {
    if (router.query.block !== undefined) {
      setQueryState(true);
    }
  }, []);

  return (
    <S.Layout>
      <S.SearchField>
        <RecentsSearchBar
          onAddKeyword={handleAddKeyword}
          state={state}
          setState={setState}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />
      </S.SearchField>
      {state ? (
        <SearchResult keywordsValue={searchValue} />
      ) : (
        <Recents
          setSearchValue={setSearchValue}
          handleClearKeywords={() => setKeywords([])}
          keywords={keywords}
          handleRemoveKeyword={handleRemoveKeyword}
          onSearch={handleSearch}
        />
      )}
      {queryState && (
        <Toast
          className="toast"
          text={
            router.query.block === 'true'
              ? '사용자를 차단하였습니다.'
              : '사용자를 이미 차단하였습니다.'
          }
          state={queryState}
          setState={setQueryState}
          actionText="차단한 계정 관리"
          actionFunction={() => router.push('/blocked-account')}
          isHelperText={true}
        />
      )}
    </S.Layout>
  );
}
