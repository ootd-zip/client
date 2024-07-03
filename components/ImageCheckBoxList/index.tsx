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

export default function ImageCheckBoxList({
  data,
  checkBox,
  checkedItems,
  setCheckedItems,
  editing,
}: ImageCheckBoxListProps) {
  const toggleChecked = (ootdBookmarkId: number) => {
    if (checkedItems.includes(ootdBookmarkId)) {
      setCheckedItems(checkedItems.filter((id) => id !== ootdBookmarkId));
    } else {
      setCheckedItems([...checkedItems, ootdBookmarkId]);
    }
  };

  const router = useRouter();

  const handleClick = (item: ImageData) => {
    if (editing) {
      toggleChecked(item.ootdBookmarkId!);
    } else {
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
                (isChecked ? (
                  <S.Icon onClick={() => toggleChecked(item.ootdBookmarkId!)}>
                    <AiFillCheckSquare />
                  </S.Icon>
                ) : (
                  <Image
                    src={BookmarkCheckBoxFalse}
                    alt={`CheckBox False`}
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
