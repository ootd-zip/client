import { AnnoucementDataType } from '@/pages/announcement';
import S from './style';
import { Body3, Caption1 } from '@/components/UI';
import { useState } from 'react';

interface AnnouncementBlockProps extends AnnoucementDataType {
  isLast: Boolean;
}

/*
이름: 공지사항에서 사용되는 컴포넌트
역할: 공지사항에서 최신 글 여부에 따른 글
*/

export default function AnnouncementBlock({
  date,
  headline,
  newState,
  body,
  isLast,
}: AnnouncementBlockProps) {
  const [bodyIsOpen, setBodyIsOpen] = useState<Boolean>(false);
  return (
    <>
      <S.Layout
        isOpen={bodyIsOpen || isLast}
        onClick={() => setBodyIsOpen(!bodyIsOpen)}
      >
        <S.Title>
          {newState && <Caption1 className="new">new</Caption1>}
          <Caption1 className="date">{date}</Caption1>
        </S.Title>
        <Body3 className="body">{headline}</Body3>
      </S.Layout>
      {
        <S.Body isOpen={bodyIsOpen}>
          <Body3>{body}</Body3>
        </S.Body>
      }
    </>
  );
}
