import { Body4, Title2 } from '@/components/UI';
import S from './style';
import Image from 'next/image';
import { ClothInformationProps } from '@/utils/types/cloth.types';
import { AiFillCloseCircle } from 'react-icons/ai';

export default function TagInformation({
  clothImage,
  brand,
  category,
  clothSize,
  name,
  state,
  className,
  type,
  onClick,
  onTouchEnd,
}: ClothInformationProps) {
  return (
    <S.Layout onClick={onClick} className={className} state={state!}>
      <Image width={32} height={32} src={clothImage} alt="아이템" />
      <S.Information>
        <Title2>{brand}</Title2>
        <Body4>{name}</Body4>
        {clothSize && <Body4>{clothSize}</Body4>}
      </S.Information>
      <S.Close onTouchEnd={onTouchEnd} state={state!}>
        {type !== 'view' && (
          <div>
            <AiFillCloseCircle />
          </div>
        )}
      </S.Close>
    </S.Layout>
  );
}
