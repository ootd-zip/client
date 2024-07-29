import { AiFillCheckSquare } from 'react-icons/ai';
import { Body2 } from '../../UI';
import S from './style';

interface BrandProps {
  keyword?: string;
  name: string;
  onClickBrandList: (index: number) => void;
  onClickIndex: number;
  state?: Boolean;
}

export interface BrandType {
  id: number;
  name: string;
  state?: Boolean;
}

/*
이름: 브랜드 컴포넌트
역할: 각가의 브랜드 컴포넌트
특이사항: 한글로만 이루어짐, 영어 버전 추가 예정
*/
export default function Brand({
  keyword,
  name,
  onClickBrandList,
  onClickIndex,
  state,
}: BrandProps) {
  //키워드가 존재할 시 키워드 글자를 강조하기 위한 컴포넌트
  const SearchBrand = () => {
    if (name.includes(keyword!)) {
      return (
        <>
          <Body2 state="emphasis">{keyword}</Body2>
          <Body2>{name.substring(keyword!.length)}</Body2>
        </>
      );
    }
    return <Body2>{name}</Body2>;
  };

  //브랜드 선택 함수
  const onClickBrand = () => {
    onClickBrandList(onClickIndex);
  };

  return (
    <S.Layout onClick={onClickBrand}>
      <S.Korean>
        {keyword !== undefined ? SearchBrand() : <Body2>{name}</Body2>}
      </S.Korean>
      {state && <AiFillCheckSquare className="selected" />}
    </S.Layout>
  );
}
