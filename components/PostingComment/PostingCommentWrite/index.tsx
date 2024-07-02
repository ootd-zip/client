import { Body3, Button3 } from '@/components/UI';
import S from './style';
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { CommentStateType } from '@/utils/types/OOTD.types';
import { AiFillCloseCircle } from 'react-icons/ai';
import Avatar from '@/public/images/Avatar.svg';
import NextImage from '@/components/NextImage';
import { UserApi } from '@/apis/domain/User/UserApi';

interface PostingCommentWriteProps {
  comment: CommentStateType;
  setComment: Dispatch<SetStateAction<CommentStateType>>;
  commentRef: MutableRefObject<null>;
  commentWriting: Boolean;
  setCommentWriting: Dispatch<SetStateAction<Boolean>>;
  registerComment: () => void;
  setCommentFinish: Dispatch<SetStateAction<Boolean>>;
}
export default function PostingCommentWrite({
  comment,
  setComment,
  commentRef,
  commentWriting,
  setCommentWriting,
  registerComment,
  setCommentFinish,
}: PostingCommentWriteProps) {
  const { getProfile } = UserApi();

  const [userImage, setUserImage] = useState<string | null>(null);

  const fetchData = async () => {
    const data = await getProfile();
    setUserImage(data.profileImage);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <S.Layout>
      {commentWriting && (
        <S.CommentWriteState>
          <Body3 className="taggedUserName">{comment.taggedUserName}</Body3>
          <Body3>님에게 답글 남기는중</Body3>
          <AiFillCloseCircle
            onClick={() => {
              setComment({
                ...comment,
                content: '',
              });
              setCommentWriting(false);
            }}
            className="closeButton"
          />
        </S.CommentWriteState>
      )}

      <S.CommentWrite>
        <S.UserImage>
          {userImage === '' || userImage === null ? (
            <Avatar className="avatar" />
          ) : (
            <NextImage
              fill={false}
              width={32}
              height={32}
              src={userImage}
              alt="유저 프로필 이미지"
            />
          )}
        </S.UserImage>
        <S.Comment>
          <S.Text>
            <S.Input
              line={comment.content.split('\n').length}
              ref={commentRef}
              onChange={(e) => {
                setComment({ ...comment, content: e.target.value });
                setCommentFinish(false);
              }}
              placeholder="댓글을 남겨보세요."
              value={comment.content}
            />
          </S.Text>
          {comment.content.length > 0 && (
            <S.Upload>
              <Button3 onClick={registerComment}>등록</Button3>
            </S.Upload>
          )}
        </S.Comment>
      </S.CommentWrite>
    </S.Layout>
  );
}
