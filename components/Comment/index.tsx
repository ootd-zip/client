import React, { Dispatch, SetStateAction } from 'react';
import { Body3, Caption1 } from '../UI';
import S from './style';
import Avatar from '@/public/images/Avatar.svg';
import { OOTDApi } from '@/apis/domain/OOTD/OOTDApi';
import NextImage from '../NextImage';
import { CommentProps } from '@/utils/types/OOTD.types';

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

  const onClickDeleteButton = async () => {
    try {
      await deleteOOTDComment(id);
      setReRender(reRender + 1);
    } catch (err) {
      console.log(err);
    }
  };

  const onClickReportButton = async () => {
    setReportID(id);
    setBlockID(userId);
    setReportUserName(userName);
    setDeclaration(true);
  };

  return (
    <>
      <S.Layout type={type}>
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
          <S.UserName>
            <Body3>{userName}</Body3>
            <Caption1 className="createAt">{timeStamp}</Caption1>
          </S.UserName>
          <S.UserComment>
            {taggedUserName && (
              <Body3 className="taggedUser">@{taggedUserName}</Body3>
            )}
            <Body3>{content}</Body3>
          </S.UserComment>
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
