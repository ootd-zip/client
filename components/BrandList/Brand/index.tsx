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

export default function Brand({
  keyword,
  name,
  onClickBrandList,
  onClickIndex,
  state,
}: BrandProps) {
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
