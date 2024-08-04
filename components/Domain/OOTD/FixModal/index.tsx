import S from './style';
import { Body3 } from '@/components/UI';
import { Dispatch, SetStateAction, useState } from 'react';
import Alert from '@/components/Alert';
import { useRouter } from 'next/router';
import { OOTDApi } from '@/apis/domain/OOTD/OOTDApi';
import ActionSheet from '@/components/ActionSheet';
import { useRecoilValue } from 'recoil';
import { userId } from '@/utils/recoil/atom';
import Background from '@/components/Background';
import useRememberScroll from '@/hooks/useRememberScroll';

interface ReportModalProps {
  reportModalIsOpen: Boolean;
  setReportModalIsOpen: Dispatch<SetStateAction<Boolean>>;
  isPrivate: Boolean;
  setGetPostReRender: Dispatch<SetStateAction<number>>;
  getPostReRender: number;
  setToastOpen: Dispatch<SetStateAction<Boolean>>;
}
/*
이름: ootd 더보기 모달
역할: ootd 상세페이지에서 케밥 버튼을 클릭 했을 때 나오는 더보기 모달
특이사항: 네이밍 변경이 필요해보임, ActionSheet로 수정 해야할 것 같음
*/
export default function FixModal({
  reportModalIsOpen,
  setReportModalIsOpen,
  getPostReRender,
  setGetPostReRender,
  isPrivate,
  setToastOpen,
}: ReportModalProps) {
  const router = useRouter();
  const myId = useRecoilValue(userId); //로그인 한 유저의 id

  const { deleteOOTD, patchOOTDIsPrivate } = OOTDApi();

  //정말 삭제하겠습니까 모달 렌더링 여부
  const [deleteAlertIsOpen, setDeleteAlertIsOpen] = useState<Boolean>(false);

  //ootd 상세 페이지 스크롤을 기억하기 위한 훅
  const { reset } = useRememberScroll({ key: `mypage-${myId}-ootd` });

  //정말 삭제하겠습니까 Alert창 확인 버튼 클릭 함수
  const onClickYesButton = async () => {
    const result = await deleteOOTD(Number(router.query!.OOTDNumber![0]));
    setDeleteAlertIsOpen(false);
    reset();
    if (result) router.push(`/mypage/${myId}`);
  };

  //공개/비공개 전환 버튼 클릭 함수
  const onClickIsPrivateButton = async () => {
    await patchOOTDIsPrivate(Number(router.query!.OOTDNumber![0]), {
      isPrivate: !isPrivate,
    });
    setGetPostReRender(getPostReRender + 1);
    setDeleteAlertIsOpen(false);
    setToastOpen(true);
  };

  //삭제 버튼 클릭 함수
  const onClickDeleteButton = async () => {
    setDeleteAlertIsOpen(true);
  };

  //신고 버튼 클릭 함수
  const onClickReportButton = () => {
    setReportModalIsOpen(false);
  };

  //버튼 요소들
  const buttons = [
    {
      name: (!isPrivate ? '비' : '') + `공개로 설정`,
      buttonClick: onClickIsPrivateButton,
      color: 'error',
    },
    {
      name: 'ootd 수정',
      buttonClick: () =>
        router.push(`/edit-ootd/${Number(router.query.OOTDNumber![0])}`),
    },
    {
      name: 'ootd 삭제',
      buttonClick: onClickDeleteButton,
    },
  ];
  return (
    <>
      <Background onClick={() => ''} isOpen={deleteAlertIsOpen} />
      <S.Layout onClick={onClickReportButton}>
        {reportModalIsOpen && <ActionSheet buttons={buttons} />}
        {deleteAlertIsOpen && (
          <Alert
            headline="게시글을 삭제하시겠습니까?"
            body={<Body3>삭제된 게시글은 다시 복구할 수 없습니다. </Body3>}
            yes="삭제"
            no="취소"
            yesColor="error"
            onClickYesButton={onClickYesButton}
            onClickNoButton={() => setDeleteAlertIsOpen(false)}
          />
        )}
      </S.Layout>
    </>
  );
}
