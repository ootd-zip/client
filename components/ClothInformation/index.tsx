import { ClothInformationProps } from './type';
import S from './style';
import { Body4, Title2 } from '../UI';
import ImageWithCaption from '../UI/ImageWithCaption';

/*
이름: 옷 정보
역할: 옷의 상세한 정보를 표현하는 컴포넌트
*/
export default function ClothInformation({
  clothImage,
  caption,
  brand,
  category,
  name,
  clothSize,
  size,
  onClick,
}: ClothInformationProps) {
  return (
    <S.Layout size={size!} onClick={onClick}>
      <S.ListImage>
        <ImageWithCaption
          caption={caption}
          size="70px"
          src={clothImage}
          alt="옷정보"
        />
      </S.ListImage>
      <S.Information>
        <S.Headline>
          <Title2>{brand}</Title2>
          <S.Divider>|</S.Divider>
          <Body4 className="category">{category}</Body4>
        </S.Headline>
        <S.BodyFirst>
          <Body4>{name}</Body4>
        </S.BodyFirst>
        <S.BodySecond>
          <Body4>사이즈 {clothSize}</Body4>
        </S.BodySecond>
      </S.Information>
    </S.Layout>
  );
}
