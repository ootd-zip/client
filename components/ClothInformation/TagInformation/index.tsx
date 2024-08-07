import { Body4, Title2 } from '@/components/UI';
import S from './style';
import Image from 'next/image';
import { ClothInformationProps } from '../type';
import { AiFillCloseCircle } from 'react-icons/ai';

/*
이름: 태그 정보
역할: ootd에 옷 태그 시 사용되는 태그 컴포넌트  
*/
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
      {/*드래그와 클릭을 구분하기 위해 onTouchEnd 이벤트 사용*/}
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
