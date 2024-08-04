import { Body3, Headline2 } from '@/components/UI';
import S from './style';

/*
이름: 필터된 검색 결과 없을 경우 사용되는 컴포넌트
역할: 검색 페이지에서 필터 결과가 없을 경우 사용
*/

export default function EmptyFilteredResult() {
  return (
    <S.Layout>
      <Headline2>필터링된 결과가 없습니다.</Headline2>
      <Body3 className="sub">다른 필터를 적용해보세요.</Body3>
    </S.Layout>
  );
}
