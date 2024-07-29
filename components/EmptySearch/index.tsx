import S from './style';
import { Headline2, Body3 } from '../UI';
/*
이름: 빈 검색 결과
역할: 검색 결과가 없다고 알려주는 컴포넌트
*/
export default function EmptySearch() {
  return (
    <S.Layout>
      <Headline2>검색 결과가 없습니다.</Headline2>
      <Body3 className="text">
        다른 검색어를 입력하시거나 <br /> 철자와 띄어쓰기를 확인해보세요.
      </Body3>
    </S.Layout>
  );
}
