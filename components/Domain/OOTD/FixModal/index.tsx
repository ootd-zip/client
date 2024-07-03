import S from './style';
import { Body3, Button1, Title1 } from '@/components/UI';
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

export default function FixModal({
  reportModalIsOpen,
  setReportModalIsOpen,
  getPostReRender,
  setGetPostReRender,
  isPrivate,
  setToastOpen,
}: ReportModalProps) {
  const onClickReportButton = () => {
    setReportModalIsOpen(false);
  };

  const router = useRouter();
  const myId = useRecoilValue(userId);

  const { deleteOOTD, patchOOTDIsPrivate } = OOTDApi();

  const [deleteAlertIsOpen, setDeleteAlertIsOpen] = useState<Boolean>(false);

  const { reset } = useRememberScroll({ key: `mypage-${myId}-ootd` });

  const onClickYesButton = async () => {
    const result = await deleteOOTD(Number(router.query!.OOTDNumber![0]));
    setDeleteAlertIsOpen(false);
    reset();
    if (result) router.push(`/mypage/${myId}`);
  };

  const onClickIsPrivateButton = async () => {
    await patchOOTDIsPrivate(Number(router.query!.OOTDNumber![0]), {
      isPrivate: !isPrivate,
    });
    setGetPostReRender(getPostReRender + 1);
    setDeleteAlertIsOpen(false);
    setToastOpen(true);
  };

  const onClickDeleteButton = async () => {
    setDeleteAlertIsOpen(true);
  };

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
