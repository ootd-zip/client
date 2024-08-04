import S from '@/pageStyle/ootd/style';
import Posting from '@/components/Posting';
import PostingComment from '@/components/PostingComment';
import PostingCommentWrite from '@/components/PostingComment/PostingCommentWrite';
import { useEffect, useRef, useState } from 'react';
import { AppLayoutProps } from '@/AppLayout';
import { ComponentWithLayout } from '../sign-up';
import UserCloth from '@/components/Domain/OOTD/UserCloth';
import SimilarOOTD from '@/components/Domain/OOTD/SimilarOOTD';
import { OOTDApi } from '@/apis/domain/OOTD/OOTDApi';
import { useRouter } from 'next/router';
import { useRecoilValue } from 'recoil';
import { userId } from '@/utils/recoil/atom';
import UserOtherOOTD from '@/components/Domain/OOTD/UserOtherOOTD';
import Toast from '@/components/Toast';
import AppBar from '@/components/Appbar';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import Background from '@/components/Background';

export interface CommentStateType {
  ootdId: number;
  parentDepth: number;
  content: string;
  taggedUserName?: string;
  commentParentId?: number;
}

export interface OOTDType {
  id: number;
  contents: string; //본문
  viewCount: number; //조회수
  reportCount: number; //신고 횟수
  likeCount: number; //좋아요 개수
  userName: string; //유저명
  userImage: string; //유저 프로필 이미지
  userId: number;
  createAt: string; //작성일
  isBookmark: Boolean;
  isLike: Boolean;
  isPrivate: Boolean;
  isFollowing: Boolean;
  ootdImages: {
    ootdImage: string; //ootd 이미지
    ootdImageClothesList?: {
      clothesId: number;
      clothesImage: string;
      brand: { id: number; name: string }; //옷 브랜드
      category: {
        id: number;
        smallCategory: string;
        bigCategory: string;
      };
      size: string;
      clothesName: string; //옷 별칭
      coordinate: {
        xrate: string;
        yrate: string;
      };
      deviceSize: {
        deviceWidth: number;
        deviceHeight: number;
      };
    }[];
  }[];
  styles: {
    styleId: number;
    name: string;
  }[];
  comment?: {
    id: number;
    userName: string;
    userImage: string;
    content: string;
    timeStamp: string;
    childComment?: {
      id: number;
      userName: string;
      userImage: string;
      content: string;
      createAt: string;
      taggedUserName: string;
    }[];
  }[];
}

/*
이름: ootd 상세 페이지 
*/
const OOTD: ComponentWithLayout = () => {
  const { getOOTDDetail, postOOTDComment } = OOTDApi();

  const router = useRouter();

  //재 호출을 위한 상태
  const [reRender, setReRender] = useState(0);
  const [getPostReRender, setGetPostReRender] = useState(0);

  //뒤로 가기 버튼 클릭 함수
  const onClickBackButton = () => {
    if (router.query.OOTDNumber![1] === 'explore') {
      router.push('/main/explore');
    } else if (router.query.OOTDNumber![1] === 'curation') {
      router.push('/main/curation');
    } else {
      router.back();
    }
  };

  //ootd 상세 정보 조회 api
  useEffect(() => {
    const fetchData = async () => {
      if (!router.isReady) return;
      try {
        const result = (await getOOTDDetail(
          Number(router.query.OOTDNumber![0])
        )) as OOTDType;

        setData({
          ...result,
          createAt: new Date(result.createAt).toLocaleDateString('ko-KR'),
        });
        setComment({
          ootdId: Number(router.query.OOTDNumber![0]),
          parentDepth: 0,
          content: '',
        });
      } catch (err) {
        // router.push('/main');
      }
    };
    fetchData();
  }, [router.isReady, getPostReRender, router.query.OOTDNumber]);

  //ootd 상세 정보
  const [data, setData] = useState<OOTDType | null>(null);

  //ootd 댓글 리스트
  const [comment, setComment] = useState<CommentStateType>({
    ootdId: 0,
    parentDepth: 0,
    content: '',
  });

  //ootd 댓글 작성중 상태
  const [commentWriting, setCommentWriting] = useState<Boolean>(false);
  //댓글 작성 완료 상태
  const [commentFinish, setCommentFinish] = useState<Boolean>(false);
  const commentRef = useRef<any>();

  //댓글 작성 완료 함수
  const registerComment = async () => {
    if (comment.content === '') return;
    await postOOTDComment(comment);
    setReRender(reRender + 1);
    setComment({
      ...comment,
      content: '',
    });
    setCommentWriting(false);
    setCommentFinish(true);
    //댓글 등록 api 연동
  };

  const myId = useRecoilValue(userId);

  //대댓글 작성이 끝나면 댓글 초기화
  useEffect(() => {
    if (!commentWriting) setComment({ ...comment, parentDepth: 0 });
  }, [commentWriting]);

  const [declaration, setDeclaration] = useState<Boolean>(false);
  const [receivedDeclaration, setReceivedDeclaration] =
    useState<Boolean>(false);

  //배경 클릭 함수
  const onClickBackground = () => {
    if (declaration) setDeclaration(false);
    if (receivedDeclaration) setReceivedDeclaration(false);
  };

  const [goBackAfterBlock, setGoBackAfterBlock] = useState<Boolean>(false); // 사용자 차단 이후 스낵바 이용하여 이동
  const [blockStatus, setBlockStatus] = useState<Boolean>(false); // 사용자 차단 상태 값

  // 사용자 차단 이후 이전 페이지로 이동
  useEffect(() => {
    if (goBackAfterBlock) {
      if (router.query.OOTDNumber![1] === 'explore') {
        router.push(`/main/explore?block=${blockStatus}`);
      } else if (router.query.OOTDNumber![1] === 'curation') {
        router.push(`/main/curation?block=${blockStatus}`);
      } else if (router.query.OOTDNumber![1] === 'search') {
        router.push(`/search?block=${blockStatus}`);
      } else {
        router.back();
      }
    }
  }, [goBackAfterBlock]);

  return (
    <>
      <S.Layout>
        <Background
          isOpen={declaration || receivedDeclaration}
          onClick={onClickBackground}
        />
        <AppBar
          leftProps={<AiOutlineArrowLeft onClick={onClickBackButton} />}
          middleProps={<></>}
          rightProps={<></>}
        />
        {data && (
          <Posting
            data={data}
            commentRef={commentRef}
            myPost={data.userId === Number(myId)}
            setGetPostReRender={setGetPostReRender}
            getPostReRender={getPostReRender}
            setGoBackAfterBlock={setGoBackAfterBlock}
            setBlockStatus={setBlockStatus}
          />
        )}
        <PostingComment
          declaration={declaration}
          setDeclaration={setDeclaration}
          receivedDeclaration={receivedDeclaration}
          setReceivedDeclaration={setReceivedDeclaration}
          setComment={setComment}
          commentRef={commentRef}
          setCommentWriting={setCommentWriting}
          reRender={reRender}
          setReRender={setReRender}
          setGoBackAfterBlock={setGoBackAfterBlock}
          setBlockStatus={setBlockStatus}
        />
        {data && <UserCloth userName={data.userName} userId={data.userId} />}
        {data && (
          <UserOtherOOTD userName={data.userName} userId={data.userId} />
        )}
        <SimilarOOTD />
        <PostingCommentWrite
          setComment={setComment}
          commentRef={commentRef}
          comment={comment}
          commentWriting={commentWriting}
          setCommentWriting={setCommentWriting}
          registerComment={registerComment}
          setCommentFinish={setCommentFinish}
        />
        {commentFinish && (
          <Toast
            text="댓글이 등록되었습니다."
            setState={setCommentFinish}
            state={commentFinish}
          />
        )}
      </S.Layout>
    </>
  );
};

export default OOTD;

OOTD.Layout = ({ children }: AppLayoutProps) => {
  return <>{children}</>;
};

OOTD.Layout.displayName = 'SignInLayout';
