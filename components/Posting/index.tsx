import {
  AiFillHeart,
  AiFillTag,
  AiOutlineEllipsis,
  AiOutlineHeart,
} from 'react-icons/ai';
import { Body2, Body3, Body4, Button3 } from '../UI';
import S from './style';
import BookmarkOutlined from '@/public/images/BookmarkOutlined.svg';
import BookmarkFilled from '@/public/images/BookmarkFilled.svg';
import ShareOutlined from '@/public/images/shareOutlined.svg';
import MessageOutlined from '@/public/images/MessageOutlined.svg';
import {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import TagInformation from '../ClothInformation/TagInformation';
import Carousel from '../Carousel';
import ReportModal from '../Domain/OOTD/ReportModal';
import DeclarationModal from '../DeclarationModal';
import ReceivedDeclarationModal from '../ReceivedDeclarationModal';
import { useRecoilValue } from 'recoil';
import { userId } from '@/utils/recoil/atom';
import { OOTDApi } from '@/apis/domain/OOTD/OOTDApi';
import { useRouter } from 'next/router';
import PublicApi from '@/apis/domain/Public/PublicApi';
import Avatar from '@/public/images/Avatar.svg';
import Toast from '../Toast';
import FixModal from '../Domain/OOTD/FixModal';
import LikeToggle from '../Toggle/LikeToggle';
import { OOTDType } from '@/pages/ootd/[...OOTDNumber]';
import Image from '../NextImage';
import NextImage from '../NextImage';
import Background from '../Background';

interface PostingProps {
  data: OOTDType;
  commentRef: MutableRefObject<any>;
  myPost: Boolean;
  setGetPostReRender: Dispatch<SetStateAction<number>>;
  getPostReRender: number;
  setGoBackAfterBlock: Dispatch<SetStateAction<Boolean>>;
  setBlockStatus: Dispatch<SetStateAction<Boolean>>;
}

export default function Posting({
  data,
  commentRef,
  myPost,
  getPostReRender,
  setGetPostReRender,
  setGoBackAfterBlock,
  setBlockStatus,
}: PostingProps) {
  const [followState, setFollowState] = useState<Boolean>(false); //팔로잉 상태
  const [heartState, setHeartState] = useState<Boolean>(false); //좋아요 상태
  const [bookMarkState, setBookMarkState] = useState<Boolean>(false); //북마크 상태
  const [componentWidth, setComponentWidth] = useState(0); //컴포넌트 길이
  const [componentHeight, setComponentHeight] = useState(0); //컴포넌트 높이
  const [clothTagOpen, setClothTagOpen] = useState<Boolean>(true); //옷 태그 렌더링 여부
  const [reportModalIsOpen, setReportModalIsOpen] = useState<Boolean>(false); //신고 모달 렌더링 여부
  const [declaration, setDeclaration] = useState<Boolean>(false); // 신고 Modal 렌더링 여부
  const [receivedDeclaration, setReceivedDeclaration] =
    useState<Boolean>(false); // 신고 후 차단 Modal 렌더링 여부
  const [fixModalIsOpen, setFixModalIsOpen] = useState<Boolean>(false); //더보기 모달 렌더링 여부
  const [toastOpen, setToastOpen] = useState<Boolean>(false);

  const imgRef = useRef<HTMLDivElement>(null);
  const myId = useRecoilValue(userId); //로그인한 유저 id
  const { postOOTDLike, deleteOOTDLike, postOOTDBookmark, deleteOOTDBookmark } =
    OOTDApi();
  const { follow, unFollow } = PublicApi();
  const router = useRouter();

  //좋아요, 북마크, 팔로잉 여부 업데이트
  useEffect(() => {
    setHeartState(data.isLike);
    setBookMarkState(data.isBookmark);
    setFollowState(data.isFollowing);
  }, [data]);

  //컴포넌트 크기 계산
  useEffect(() => {
    if (imgRef.current) {
      const w = imgRef.current.offsetWidth;
      const h = imgRef.current.offsetHeight;

      setComponentHeight(h);
      setComponentWidth(w);
    }
  }, [data]);

  //좋아요 버튼 클릭 함수
  const onClickHeartButton = async () => {
    if (!heartState) await postOOTDLike(Number(router.query.OOTDNumber![0]));
    if (heartState) await deleteOOTDLike(Number(router.query.OOTDNumber![0]));
    setHeartState(!heartState);
  };

  const [reportStatus, setReportStatus] = useState<Boolean>(false);

  const onClickShareButton = () => {
    //웹에서는 정상 작동하나 웹뷰에서는 작동하지 않음
    //xcode를 활용해서 해결해야할 것 같아 이후에 처리 예정
    //참고 블로그 https://velog.io/@igun0423/expo-react-native-webview%EC%97%90%EC%84%9C-%EA%B0%84%EB%8B%A8%ED%95%98%EA%B2%8C-%EC%99%B8%EB%B6%80-%EC%95%B1-%EC%97%B0%EA%B2%B0%ED%95%98%EA%B8%B0
    // const url = 'https://www.google.co.kr';
    // if (window.Kakao) {
    //   const kakao = window.Kakao;
    //   if (!kakao.isInitialized()) {
    //     kakao.init(NEXT_PUBLIC_KAKAO_JS_KEY);
    //   }
    //   kakao.Share.sendDefault({
    //     objectType: 'feed',
    //     content: {
    //       title: '어버이날 모의고사',
    //       description: '부모님 얼마나 알고계신가요?',
    //       imageUrl: '',
    //       link: {
    //         mobileWebUrl: url,
    //         webUrl: url,
    //       },
    //     },
    //     buttons: [
    //       {
    //         title: '채점하러 가기',
    //         link: {
    //           mobileWebUrl: url,
    //           webUrl: url,
    //         },
    //       },
    //     ],
    //   });
    // }
  };

  //북마크 버튼 클릭 함수
  const onClickBookmarkButton = async () => {
    if (!bookMarkState)
      await postOOTDBookmark(Number(router.query.OOTDNumber![0]));
    if (bookMarkState)
      await deleteOOTDBookmark(Number(router.query.OOTDNumber![0]));
    setBookMarkState(!bookMarkState);
  };

  //팔로우 버튼 클릭 함수
  const onClickFollowButton = async () => {
    setFollowState(!followState);
    if (!followState) await follow(data.userId);
    if (followState) await unFollow(data.userId);
  };

  //배경 클릭 함수
  const onClickBackground = () => {
    if (reportModalIsOpen) {
      setReportModalIsOpen(false);
    }
    if (declaration) {
      setDeclaration(false);
    }
    if (receivedDeclaration) {
      setReceivedDeclaration(false);
    }
    if (reportModalIsOpen) {
      setReportModalIsOpen(false);
    }
    if (fixModalIsOpen) {
      setFixModalIsOpen(false);
    }
  };

  //더보기 버튼 클릭 함수
  const onClickKebabButton = () => {
    if (myId === data.userId) {
      setFixModalIsOpen(true);
      return;
    }
    setReportModalIsOpen(true);
  };

  return (
    <>
      <Background
        onClick={onClickBackground}
        isOpen={
          reportModalIsOpen ||
          declaration ||
          receivedDeclaration ||
          reportModalIsOpen ||
          fixModalIsOpen
        }
      />
      <S.Layout>
        <S.PostingTop>
          {/*ootd를 작성한 유저의 프로필*/}
          {data.userImage !== '' ? (
            <NextImage
              onClick={() => router.push(`/mypage/${data.userId}`)}
              src={data.userImage}
              className="userImage"
              alt="유저 이미지"
              width={32}
              height={32}
              fill={false}
            />
          ) : (
            <Avatar
              onClick={() => router.push(`/mypage/${data.userId}`)}
              className="avatar"
            />
          )}

          <Body3
            onClick={() => router.push(`/mypage/${data.userId}`)}
            className="userName"
          >
            {data.userName}
          </Body3>
          {!myPost && !followState && (
            <Button3 onClick={onClickFollowButton} className="unfollow">
              팔로우
            </Button3>
          )}
          {!myPost && followState && (
            <Button3 className="following" onClick={onClickFollowButton}>
              팔로잉
            </Button3>
          )}
          <AiOutlineEllipsis onClick={onClickKebabButton} />
        </S.PostingTop>
        {/*ootd 이미지*/}
        <S.PostingImage ref={imgRef}>
          <AiFillTag
            onClick={() => setClothTagOpen(!clothTagOpen)}
            className="tag"
          />
          <Carousel
            infinite={false}
            slidesToShow={1}
            dots={true}
            initialSlide={0}
          >
            {data.ootdImages?.map((item, index) => {
              return (
                <S.ImageWithTag key={index}>
                  <NextImage
                    src={item.ootdImage}
                    alt="포스팅 이미지"
                    fill={true}
                  />
                  {/*해당 ootd에 태그된 옷 정보*/}
                  {item.ootdImageClothesList &&
                    item.ootdImageClothesList.map((items, index) => {
                      return (
                        <S.PostingClothTag
                          key={index}
                          clothTagOpen={clothTagOpen}
                          xrate={String(
                            Number(items.coordinate?.xrate) -
                              Number(
                                items.deviceSize?.deviceWidth - componentWidth
                              )
                          )}
                          yrate={String(
                            Number(items.coordinate?.yrate) -
                              Number(
                                items.deviceSize?.deviceHeight - componentHeight
                              )
                          )}
                        >
                          <TagInformation
                            onClick={() =>
                              router.push(`/cloth/${items.clothesId}`)
                            }
                            clothId={items.clothesId}
                            clothImage={items.clothesImage}
                            caption={'tag'}
                            brand={items.brand.name}
                            name={items.clothesName}
                            size="small"
                            type="view"
                          />
                        </S.PostingClothTag>
                      );
                    })}
                </S.ImageWithTag>
              );
            })}
          </Carousel>
        </S.PostingImage>
        {/*ootd에 대한 좋아요, 북마크 등 커뮤니케이션 기능*/}
        <S.PostingCommunication>
          <LikeToggle
            state={heartState}
            setState={setHeartState}
            onClick={onClickHeartButton}
          />
          <MessageOutlined
            className="comment"
            onClick={() => commentRef.current.focus()}
            alt="댓글"
          />
          {/* <ShareOutlined
            className="share"
            onClick={onClickShareButton}
            alt="공유하기"
          /> */}
          {bookMarkState ? (
            <BookmarkFilled
              className="bookmark"
              onClick={onClickBookmarkButton}
              alt="북마크"
            />
          ) : (
            <BookmarkOutlined
              className="bookmark"
              onClick={onClickBookmarkButton}
              alt="북마크"
            />
          )}
        </S.PostingCommunication>
        {/*ootd에 대한 설명*/}
        <S.PostingExplanation>
          <S.LikeCount>
            <Body4 state="emphasis">좋아요</Body4>
            <Body4 state="emphasis">{data.likeCount}개</Body4>
          </S.LikeCount>
          <Body2 className="description">{data.contents}</Body2>
          <Body4 className="date">{data.createAt}</Body4>
        </S.PostingExplanation>
        {/*ootd스타일 태그*/}
        <S.PostingStyleTag>
          <Body3 className="styletag">스타일태그</Body3>
          {data.styles &&
            data.styles.map((item, index) => {
              return (
                <S.PostingStyleTagSpan key={index}>
                  <Button3>{item.name}</Button3>
                </S.PostingStyleTagSpan>
              );
            })}
        </S.PostingStyleTag>
        {/*다른 유저 ootd더보기 모달*/}
        {reportModalIsOpen && (
          <ReportModal
            reportModalIsOpen={reportModalIsOpen}
            setReportModalIsOpen={setReportModalIsOpen}
            setDeclaration={setDeclaration}
          />
        )}
        {/*내 ootd더보기 모달*/}
        <FixModal
          setToastOpen={setToastOpen}
          reportModalIsOpen={fixModalIsOpen}
          setReportModalIsOpen={setFixModalIsOpen}
          isPrivate={data.isPrivate}
          setGetPostReRender={setGetPostReRender}
          getPostReRender={getPostReRender}
        />
        {/*ootd 차단 모달*/}
        {declaration && (
          <DeclarationModal
            type="OOTD"
            userName={data.userName}
            ID={Number(router.query.OOTDNumber![0])}
            declaration={declaration}
            setDeclaration={setDeclaration}
            setReceivedDeclaration={setReceivedDeclaration}
            setReportStatus={setReportStatus}
          />
        )}
        {/*ootd 신고 모달*/}
        {receivedDeclaration && (
          <ReceivedDeclarationModal
            ID={data.userId}
            type="게시글"
            reportStatus={reportStatus}
            receivedDeclaration={receivedDeclaration}
            setReceivedDeclaration={setReceivedDeclaration}
            setGoBackAfterBlock={setGoBackAfterBlock}
            setBlockStatus={setBlockStatus}
          />
        )}
        {/*비공개 -> 공개*/}
        {toastOpen && !data.isPrivate && (
          <Toast
            text="다른 사람이 이 ootd를 볼 수 있도록 변경되었습니다."
            setState={setToastOpen}
            state={toastOpen}
          />
        )}
        {/*공개 -> 비공개*/}
        {toastOpen && data.isPrivate && (
          <Toast
            text="다른 사람이 이 ootd를 볼 수 없도록 변경되었습니다."
            setState={setToastOpen}
            state={toastOpen}
          />
        )}
      </S.Layout>
    </>
  );
}
