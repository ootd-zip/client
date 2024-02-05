/* eslint-disable @next/next/no-img-element */
import S from './style';
import { Headline2, Body3 } from '../UI';

export default function EmptySearch() {
  return (
    <S.Layout>
      <Headline2>검색 결과가 없습니다.</Headline2>
      <Body3 state="center">
        다른 검색어를 입력하시거나 <br /> 철자와 띄어쓰기를 확인해보세요.
      </Body3>
    </S.Layout>
  );
}
