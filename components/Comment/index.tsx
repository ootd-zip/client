import React, { Dispatch, SetStateAction } from 'react';
import { Body3, Caption1 } from '../UI';
import S from './style';
import Avatar from '@/public/images/Avatar.svg';
import { OOTDApi } from '@/apis/domain/OOTD/OOTDApi';
import NextImage from '../NextImage';

export interface CommentProps {
  id: number;
  userId: number;
  userImage: string;
  userName: string;
  content: string;
  timeStamp: string;
  type?: 'child';
  view?: 'preview';
  onClickReplyButton?: () => void;
  taggedUserName?: string;
  myComment?: Boolean;
  parentId?: number;
  reRender: number;
  depth?: number;
  setReRender: Dispatch<SetStateAction<number>>;
  setDeclaration: Dispatch<SetStateAction<Boolean>>;
  setReportUserName: Dispatch<SetStateAction<string>>;
  setReportID: Dispatch<SetStateAction<number>>;
  setBlockID: Dispatch<SetStateAction<number>>;
}

/*
이름: 댓글
역할: ootd 상세 보기 페이지에서 사용되는 댓글 컴포넌트
*/
function Comment({
  id,
  userId,
  userName,
  userImage,
  content,
  timeStamp,
  type,
  view,
  onClickReplyButton,
  taggedUserName,
  myComment,
  reRender,
  setReRender,
  setDeclaration,
  setReportUserName,
  setReportID,
  setBlockID,
}: CommentProps) {
  const { deleteOOTDComment } = OOTDApi();

  //댓글 삭제 버튼 클릭 함수
  const onClickDeleteButton = async () => {
    try {
      await deleteOOTDComment(id);
      //삭제 후 댓글 재조회를 위한 상태 업데이트
      setReRender(reRender + 1);
    } catch (err) {
      console.log(err);
    }
  };

  //댓글 신고 버튼 클릭 함수
  const onClickReportButton = async () => {
    setReportID(id);
    setBlockID(userId);
    setReportUserName(userName);
    setDeclaration(true);
  };

  return (
    <>
      <S.Layout type={type}>
        {/*댓글 작성자 프로필 사진 */}
        <S.CommentLeft>
          {userImage === '' ? (
            <Avatar className="avatar" />
          ) : (
            <S.UserImage>
              <NextImage
                className="userImage"
                src={userImage}
                alt="유저 이미지"
                fill={false}
                width={type === 'child' ? 24 : 32}
                height={type === 'child' ? 24 : 32}
              />
            </S.UserImage>
          )}
        </S.CommentLeft>
        <S.CommentRight>
          {/*댓글 작성자, 작성 시간*/}
          <S.UserName>
            <Body3>{userName}</Body3>
            <Caption1 className="createAt">{timeStamp}</Caption1>
          </S.UserName>
          {/*댓글 본문*/}
          <S.UserComment>
            {/*태그한 유저의 이름*/}
            {taggedUserName && (
              <Body3 className="taggedUser">@{taggedUserName}</Body3>
            )}
            {/*댓글 내용*/}
            <Body3>{content}</Body3>
          </S.UserComment>
          {/*댓글 커뮤니케이션*/}
          {view !== 'preview' ? (
            <S.CommentCommunication>
              <Caption1 onClick={onClickReplyButton}>답글달기</Caption1>
              {myComment ? (
                <>
                  <Caption1 onClick={onClickDeleteButton}>삭제</Caption1>
                </>
              ) : (
                content !== '삭제된 댓글입니다.' && (
                  <Caption1 onClick={onClickReportButton}>신고</Caption1>
                )
              )}
            </S.CommentCommunication>
          ) : (
            ''
          )}
        </S.CommentRight>
      </S.Layout>
    </>
  );
}

export default React.memo(Comment);
