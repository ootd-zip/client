import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import S from '@/pageStyle/cloth/style';
import AppBar from '@/components/Appbar';
import { AiOutlineArrowLeft, AiOutlineEllipsis } from 'react-icons/ai';
import DetailClothHeader from '@/components/DetailCloth/DetailClothHeader';
import DetailClothDiscription from '@/components/DetailCloth/DetailClothDiscription';
import DetailClothDetailInfo from '@/components/DetailCloth/DetailClothDetailInfo';
import ClothOOTD from '@/components/DetailCloth/ClothOOTD';

import {
  getReactNativeMessage,
  sendReactNativeMessage,
} from '@/utils/reactNativeMessage';

import ActionSheet from '@/components/ActionSheet';
import { useRouter } from 'next/router';
import DeleteAlert from '@/components/DetailCloth/DeleteAlert';
import Toast from '@/components/Toast';
import ClothApi from '@/apis/domain/Cloth/ClothApi';
import { useRecoilValue } from 'recoil';
import { userId } from '@/utils/recoil/atom';
import DeclarationModal from '@/components/DeclarationModal';
import ReceivedDeclarationModal from '@/components/ReceivedDeclarationModal';
import NextImage from '@/components/NextImage';
import Background from '@/components/Background';

export interface ClothDataType {
  id: number;
  name: string;
  userName: string;
  brand: { id: number; name: string };
  category: { id: number; categoryName: string; parentCategoryName: string };
  size: { id: number; name: string; lineNo: string };
  colors: { id: number; name: string; colorCode: string }[];
  isPrivate: Boolean;
  memo: string;
  purchaseStore: string;
  purchaseStoreType: string;
  purchaseDate: string;
  imageUrl: string;
  createdAt: string;
  userId: number;
}

const Cloth = () => {
  const router = useRouter();
  const [data, setData] = useState<ClothDataType | null>(null);
  const [reRender, setReRender] = useState(0);
  const { getClothDetail, deleteCloth, patchClothIsPrivate } = ClothApi();

  const [reportModalIsOpen, setReportModalIsOpen] = useState<Boolean>(false);
  const [declaration, setDeclaration] = useState<Boolean>(false); // 신고 Modal
  const [receivedDeclaration, setReceivedDeclaration] =
    useState<Boolean>(false); // 신고 후 차단 Modal
  const [reportStatus, setReportStatus] = useState<Boolean>(false);

  const localUserId = useRecoilValue(userId);

  useEffect(() => {
    const fetchData = async () => {
      if (!router.isReady) return;
      const result = await getClothDetail(Number(router.query.ClothNumber![0]));
      setData(result);
    };
    fetchData();
  }, [router.isReady, reRender]);

  const modifyButton = () => {
    router.push(`/edit-cloth/${router.query.ClothNumber![0]}`);
  };

  const [URLState, setURLState] = useState<Boolean>(false);

  const shareButton = () => {
    console.log('공유');
    // 공유 버튼
    setURLState(false); // 재공유 toast 노출 초기화
    sendReactNativeMessage({ type: 'shareURL' }); // native로 클립보드 복사 처리
    setClickedRight(false); // ActionSheet 숨기기
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      getReactNativeMessage(setURLState);
    }
  }, []);

  const deleteButton = async () => {
    // 삭제 버튼
    setDeleteOpen(true);
  };

  const onClickYesButton = async () => {
    const result = await deleteCloth(Number(router.query.ClothNumber![0]));
    if (result) router.replace(`/mypage/${localUserId}`);
  };

  const onClickNoButton = () => {
    setDeleteOpen(false);
  };

  const delclationButton = () => {
    setDeclaration(true);
  };

  const isOpenButton = async () => {
    const payload = { isPrivate: !data!.isPrivate };
    const result = await patchClothIsPrivate(
      Number(router.query.ClothNumber![0]),
      payload
    );
    setReRender(reRender + 1);
    setClickedRight(false); // ActionSheet 숨기기
  };

  const myButtons = [
    {
      name: !data?.isPrivate ? '비공개로 변경' : '공개로 변경',
      buttonClick: isOpenButton,
    },
    { name: '게시글 수정', buttonClick: modifyButton },
    // { name: '공유', buttonClick: shareButton },
    { name: '삭제', buttonClick: deleteButton },
  ];

  const otherButtons = [
    // { name: '공유', buttonClick: shareButton },
    { name: '신고', buttonClick: delclationButton },
  ];

  const [clickedRight, setClickedRight] = useState<Boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState<Boolean>(false);

  const onClickAppbarButton = () => {
    setClickedRight(!clickedRight);
  };

  const onClickBackground = () => {
    if (clickedRight) setClickedRight(false);
    if (deleteOpen) setDeleteOpen(false);
  };

  const [goBackAfterBlock, setGoBackAfterBlock] = useState<Boolean>(false); // 사용자 차단 이후 스낵바 이용하여 이동
  const [blockStatus, setBlockStatus] = useState<Boolean>(false); // 사용자 차단 상태 값

  return (
    <>
      <AppBar
        leftProps={<AiOutlineArrowLeft onClick={() => router.back()} />}
        middleProps={<></>}
        rightProps={<AiOutlineEllipsis onClick={onClickAppbarButton} />}
      />
      <Background
        isOpen={clickedRight || deleteOpen}
        onClick={onClickBackground}
      />
      {data && (
        <DetailClothHeader
          isPublic={!data?.isPrivate}
          bigCategory={data?.category.parentCategoryName!}
          smallCategory={data?.category.categoryName!}
          brand={data?.brand.name!}
          clothByName={data?.name!}
        />
      )}
      <S.Img>
        {data && <NextImage fill={true} alt="옷 사진" src={data.imageUrl} />}
      </S.Img>
      <DetailClothDiscription
        isLink={data?.purchaseStoreType === 'Link'}
        purchasing={data?.purchaseStore!}
        uploadDate={new Date(data?.createdAt!).toLocaleDateString('ko-kr')}
        memo={data?.memo}
      />
      <DetailClothDetailInfo
        color={data?.colors!.map((item) => {
          return { ...item, color: item.colorCode };
        })}
        size={data?.size.name}
        buyDate={data?.purchaseDate}
      />
      {router.isReady && (
        <ClothOOTD clothId={Number(router.query.ClothNumber![0])} />
      )}
      {clickedRight && localUserId === data?.userId && (
        <ActionSheet buttons={myButtons} />
      )}
      {clickedRight && localUserId !== data?.userId && (
        <ActionSheet buttons={otherButtons} />
      )}
      {deleteOpen && (
        <DeleteAlert
          onClickYesButton={onClickYesButton}
          onClickNoButton={onClickNoButton}
        />
      )}
      {declaration && (
        <DeclarationModal
          type="CLOTHES"
          userName={data?.userName}
          ID={Number(router.query.ClothNumber![0])}
          declaration={declaration}
          setDeclaration={setDeclaration}
          setReceivedDeclaration={setReceivedDeclaration}
          setReportStatus={setReportStatus}
        />
      )}
      {data && receivedDeclaration && (
        <ReceivedDeclarationModal
          type="게시글"
          reportStatus={reportStatus}
          receivedDeclaration={receivedDeclaration}
          setReceivedDeclaration={setReceivedDeclaration}
          ID={Number(data.userId)}
          setGoBackAfterBlock={setGoBackAfterBlock}
          setBlockStatus={setBlockStatus}
        />
      )}
      {URLState && (
        <Toast
          text="URL이 클립보드에 복사되었습니다."
          setState={setURLState}
          state={URLState}
        />
      )}
    </>
  );
};

export default Cloth;
