import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import S from './style';
import Comment, { CommentProps } from '../Comment';
import { Body4, Caption1, Title1 } from '../UI';
import { CommentStateType } from '@/pages/ootd/[...OOTDNumber]';
import { useRecoilValue } from 'recoil';
import { userId } from '@/utils/recoil/atom';
import { OOTDApi } from '@/apis/domain/OOTD/OOTDApi';
import { useRouter } from 'next/router';
import DeclarationModal from '../DeclarationModal';
import ReceivedDeclarationModal from '../ReceivedDeclarationModal';

interface PostingCommentData extends CommentProps {
  childComment?: {
    id: number;
    userName: string;
    userImage: string;
    content: string;
    timeStamp: string;
    parentId?: number;
    taggedUserName?: string;
    depth?: number;
    userId: number;
  }[];
}

interface PostingCommentProps {
  reRender: number;
  setReRender: Dispatch<SetStateAction<number>>;
  setComment: Dispatch<SetStateAction<CommentStateType>>;
  commentRef: MutableRefObject<any>;
  setCommentWriting: Dispatch<SetStateAction<Boolean>>;
  declaration: Boolean;
  setDeclaration: Dispatch<SetStateAction<Boolean>>;
  receivedDeclaration: Boolean;
  setReceivedDeclaration: Dispatch<SetStateAction<Boolean>>;
  setGoBackAfterBlock: Dispatch<SetStateAction<Boolean>>;
  setBlockStatus: Dispatch<SetStateAction<Boolean>>;
}
/*
이름: ootd 댓글
역할: ootd 상세페이지의 댓글 컴포넌트
*/
function PostingComment({
  reRender,
  setReRender,
  setComment,
  commentRef,
  setCommentWriting,
  declaration,
  setDeclaration,
  receivedDeclaration,
  setReceivedDeclaration,
  setGoBackAfterBlock,
  setBlockStatus,
}: PostingCommentProps) {
  //댓글 타입(미리보기/모두보기)로 나뉘어짐
  const [commentType, setCommentType] = useState<'preview' | 'all'>('preview');
  const localUserId = useRecoilValue(userId); //로그인한 유저의 id
  const router = useRouter();

  //댓글 더보기/닫기 버튼 클릭 함수
  const onClickCommentButton = () => {
    if (commentType === 'preview') setCommentType('all');
    if (commentType === 'all') setCommentType('preview');
  };

  const [data, setData] = useState<PostingCommentData[]>([]); //댓글 리스트
  const [totalCount, setTotalCount] = useState<Number>(0); //댓글 총 개수

  const { getOOTDComment } = OOTDApi();

  //댓글 조회 api 호출 후 전처리한 뒤 댓글 리스트 상태 업데이트
  useEffect(() => {
    const fetchData = async () => {
      if (!router.isReady) return;
      const { content } = await getOOTDComment({
        page: 0,
        size: 100,
        ootdId: Number(router.query.OOTDNumber![0]),
      });
      const map = new Map<number, PostingCommentData>();
      const resultData: PostingCommentData[] = [];

      setTotalCount(content.length);

      content.forEach((comment: PostingCommentData) => {
        if (comment.depth === 1) map.set(comment.id, comment);
      });

      content.forEach((comment: PostingCommentData) => {
        if (comment.parentId !== null) {
          const parentComment = map.get(comment.parentId!);
          if (parentComment) {
            if (!parentComment.childComment) {
              parentComment.childComment = [];
            }
            parentComment.childComment.push(comment);
          }
        } else {
          resultData.push(comment);
        }
      });
      setData(resultData);
    };
    fetchData();
  }, [router.isReady, reRender, router.query.OOTDNumber]);

  //대댓글 달기 버튼 클릭 함수
  const onClickReplyButton = (userName: string, commentId: number) => {
    setComment((previous) => {
      return {
        ...previous,
        taggedUserName: userName,
        parentDepth: 1,
        commentParentId: commentId,
      };
    });
    setCommentWriting(true);
    commentRef.current.focus();
  };

  //댓글 2개 미리보기 컴포넌트
  const ComentPreview = () => {
    return (
      <S.Layout>
        {data!.slice(0, 2).map((item) => (
          <>
            <Comment
              userId={item.userId}
              key={item.id}
              userImage={item.userImage}
              id={item.id}
              userName={item.userName}
              content={item.content}
              view="preview"
              timeStamp={item.timeStamp}
              reRender={reRender}
              setReRender={setReRender}
              setDeclaration={setDeclaration}
              setReportUserName={setReportUserName}
              setReportID={setReportID}
              setBlockID={setBlockID}
            />
          </>
        ))}
        <S.CommentOpenButton onClick={onClickCommentButton}>
          <Caption1>댓글 더보기</Caption1>
        </S.CommentOpenButton>
      </S.Layout>
    );
  };

  const [reportStatus, setReportStatus] = useState<Boolean>(false);
  const [reportUserName, setReportUserName] = useState<string>('');
  const [reportID, setReportID] = useState<number>(0); // 신고할 ID
  const [blockID, setBlockID] = useState<number>(0); // 사용자 차단할 ID

  //댓글 모두 보기 컴포넌트
  const ComentAll = () => {
    return (
      <S.Layout>
        <Body4 className="commentLength">총{String(totalCount)}개의 댓글</Body4>
        {data!.map((item, index) => (
          <>
            {/*본댓글*/}
            <Comment
              key={item.id}
              userId={item.userId}
              userImage={item.userImage}
              id={item.id}
              userName={item.userName}
              content={item.content}
              onClickReplyButton={() =>
                onClickReplyButton(data![index].userName, item.id)
              }
              timeStamp={item.timeStamp}
              myComment={localUserId === item.userId}
              reRender={reRender}
              setReRender={setReRender}
              setDeclaration={setDeclaration}
              setReportUserName={setReportUserName}
              setReportID={setReportID}
              setBlockID={setBlockID}
            />
            {/*대댓글*/}
            {item &&
              item.childComment?.map((items, indexs) => (
                <>
                  <Comment
                    key={items.id}
                    userId={items.userId}
                    userImage={items.userImage}
                    id={items.id}
                    userName={items.userName}
                    content={items.content}
                    onClickReplyButton={() =>
                      onClickReplyButton(
                        item.childComment![indexs].userName,
                        item.id
                      )
                    }
                    type="child"
                    taggedUserName={items.taggedUserName}
                    timeStamp={items.timeStamp}
                    myComment={localUserId === items.userId}
                    reRender={reRender}
                    setReRender={setReRender}
                    setDeclaration={setDeclaration}
                    setReportUserName={setReportUserName}
                    setReportID={setReportID}
                    setBlockID={setBlockID}
                  />
                  {receivedDeclaration && (
                    <ReceivedDeclarationModal
                      type="댓글"
                      reportStatus={reportStatus}
                      receivedDeclaration={receivedDeclaration}
                      setReceivedDeclaration={setReceivedDeclaration}
                      ID={blockID}
                      setGoBackAfterBlock={setGoBackAfterBlock}
                      setBlockStatus={setBlockStatus}
                    />
                  )}
                </>
              ))}
          </>
        ))}
        <S.CommentOpenButton onClick={onClickCommentButton}>
          <Caption1>댓글 접기</Caption1>
        </S.CommentOpenButton>
        {/*댓글 신고 모달*/}
        {declaration && (
          <DeclarationModal
            type="COMMENT"
            userName={reportUserName}
            ID={reportID}
            declaration={declaration}
            setDeclaration={setDeclaration}
            setReceivedDeclaration={setReceivedDeclaration}
            setReportStatus={setReportStatus}
          />
        )}
        {/*댓글 차단 모달*/}
        {receivedDeclaration && (
          <ReceivedDeclarationModal
            type="댓글"
            reportStatus={reportStatus}
            receivedDeclaration={receivedDeclaration}
            setReceivedDeclaration={setReceivedDeclaration}
            ID={blockID}
            setGoBackAfterBlock={setGoBackAfterBlock}
            setBlockStatus={setBlockStatus}
          />
        )}
      </S.Layout>
    );
  };
  {
    /*댓글이 없는 경우 보이는 컴포넌트*/
  }
  if (data.length === 0) {
    return (
      <S.CommentNone>
        <Title1 className="title">아직 작성된 댓글이 없습니다.</Title1>
        <Caption1 className="body">첫 번째 댓글을 남겨보세요.</Caption1>
      </S.CommentNone>
    );
  }
  return <>{commentType === 'preview' ? <ComentPreview /> : <ComentAll />}</>;
}

export default React.memo(PostingComment);
