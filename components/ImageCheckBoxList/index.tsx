import Image from 'next/image';
import S from './style';
import More from '@/public/images/More.png';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { useRouter } from 'next/router';
import NextImage from '../NextImage';
import { AiOutlineBorder, AiFillCheckSquare } from 'react-icons/ai';
import BookmarkCheckBoxFalse from '@/public/images/BookmarkCheckBoxFalse.png';

interface ImageData {
  ootdId?: number;
  ootdBookmarkId?: number;
  ootdImage?: string;
  ootdImageCount?: number;
}

interface ImageCheckBoxListProps {
  data: ImageData[];
  checkBox: Boolean;
  checkedItems: number[];
  setCheckedItems: Dispatch<SetStateAction<number[]>>;
  editing?: Boolean;
}

/*
이름: 이미지와 체크 박스가 함께 있는 컴포넌트
역할: 이미지와 체크 박스로 이루어져 토글 형식의 컴포넌트
*/

export default function ImageCheckBoxList({
  data,
  checkBox,
  checkedItems,
  setCheckedItems,
  editing,
}: ImageCheckBoxListProps) {
  // 이미지 아이디에 따라서 체크 박스 토글
  const toggleChecked = (ootdBookmarkId: number) => {
    if (checkedItems.includes(ootdBookmarkId)) {
      setCheckedItems(checkedItems.filter((id) => id !== ootdBookmarkId));
    } else {
      setCheckedItems([...checkedItems, ootdBookmarkId]);
    }
  };

  const router = useRouter();

  // 이미지 클릭 함수
  const handleClick = (item: ImageData) => {
    if (editing) {
      // 편집 중인 경우 체크 박스 토글
      toggleChecked(item.ootdBookmarkId!);
    } else {
      // 미편집인 경우 ootd 페이지로 이동
      router.push(`ootd/${item.ootdId}`);
    }
  };

  return (
    <S.Layout>
      {data &&
        data.map((item) => {
          const isChecked = checkedItems.includes(item.ootdBookmarkId!);

          return (
            <S.CheckBoxLayout key={item.ootdBookmarkId}>
              <NextImage
                src={item.ootdImage!}
                alt=""
                className={`clothImage ${isChecked ? 'checked' : ''}`}
                onClick={() => handleClick(item)}
                fill={true}
              />
              {checkBox &&
                // 체크인 경우 토글 형식
                (isChecked ? (
                  <S.Icon onClick={() => toggleChecked(item.ootdBookmarkId!)}>
                    <AiFillCheckSquare />
                  </S.Icon>
                ) : (
                  <Image
                    src={BookmarkCheckBoxFalse}
                    alt={`CheckBox False'`}
                    className="checkBoxImage"
                    onClick={() => toggleChecked(item.ootdBookmarkId!)}
                    width={24}
                    height={24}
                  />
                ))}
              {item.ootdImageCount! > 1 && (
                <Image
                  src={More}
                  alt="More"
                  className="moreIcon"
                  width={14}
                  height={14}
                />
              )}
            </S.CheckBoxLayout>
          );
        })}
    </S.Layout>
  );
}
