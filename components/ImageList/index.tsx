import Image from 'next/image';
import NextImage from '../NextImage';
import S from './style';
import More from '@/public/images/More.png';

interface ImageListProps {
  data: {
    clothId?: number;
    clothImage?: string;
    ootdId?: number;
    ootdImage?: string;
    ootdImageCount?: number;
  }[];
  onClick?: (index: number) => void;
  type: 'row' | 'column';
}
/*
이름: 이미지 리스트
역할: 공용으로 사용되는 이미지 리스트 컴포넌트
*/
export default function ImageList({ data, onClick, type }: ImageListProps) {
  return (
    <S.Layout type={type}>
      {data.map((item, index) => {
        {
          /*이미지 리스트가 옷일 경우*/
        }
        if (item.clothId !== undefined) {
          return (
            <S.Image key={index}>
              <NextImage
                onClick={() => (onClick ? onClick(item.clothId!) : '')}
                src={item.clothImage!}
                alt=""
                fill={true}
              />
            </S.Image>
          );
        }
        {
          /*이미지 리스트가 ootd일 경우*/
        }
        if (item.ootdId !== undefined) {
          return (
            <S.Image key={index}>
              <NextImage
                onClick={() => (onClick ? onClick(item.ootdId!) : '')}
                key={index}
                src={item.ootdImage!}
                alt=""
                fill={true}
              />
              {item.ootdImageCount! > 1 && (
                <Image
                  fill={false}
                  src={More}
                  alt="More"
                  className="moreIcon"
                  width={14}
                  height={14}
                />
              )}
            </S.Image>
          );
        }
      })}
    </S.Layout>
  );
}
