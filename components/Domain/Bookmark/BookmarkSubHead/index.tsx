import { Body4, Button3, Caption1, Headline2, Title1 } from '@/components/UI';
import S from './style';
import { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';
import Image from 'next/image';
import Rectangle from 'public/images/rectangle.png';

interface BookmarkSubHeadProps {
  editing: Boolean;
  setEditing: Dispatch<SetStateAction<Boolean>>;
  setAlertOpen: Dispatch<SetStateAction<Boolean>>;
  count: number;
  total: number;
}

/*
이름: 북마크 소 타이틀 컴포넌트
역할: 북마크 게시글 개수, 삭제와 편집에 관한 버튼 존재
*/

export default function BookmarSubHead({
  editing,
  setEditing,
  setAlertOpen,
  count,
  total,
}: BookmarkSubHeadProps) {
  return (
    <>
      <S.headLayout>
        {/* 게시글 편집 상태에 따른 멘트 변경 */}
        <S.Frame>
          <Body4 state="emphasis" className="bookmarkSubHeadText">
            {editing && count > 0 ? `${count}개의 게시글이 선택됨` : ``}
            {!editing && `${total}개의 게시물`}
          </Body4>
        </S.Frame>
        <S.Wrap>
          {/* 편집 여부에 따른 버튼 변경 */}
          {editing ? (
            <>
              <button
                onClick={() => setAlertOpen(true)}
                className="deleteButton"
              >
                <Button3 state="emphasis">삭제</Button3>
              </button>

              <Image src={Rectangle} alt="Rectangle" width={1} height={20} />

              <button
                onClick={() => setEditing(false)}
                className="cancelButton"
              >
                <Button3 state="emphasis">취소</Button3>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setEditing(true)}
                className="editingButton"
              >
                <Button3 state="emphasis">편집</Button3>
              </button>
            </>
          )}
        </S.Wrap>
      </S.headLayout>
    </>
  );
}
