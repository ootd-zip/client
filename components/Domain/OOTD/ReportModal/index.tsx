import Modal from '@/components/Modal';
import S from './style';
import { Button1 } from '@/components/UI';
import { Dispatch, SetStateAction } from 'react';

interface ReportModalProps {
  reportModalIsOpen: Boolean;
  setReportModalIsOpen: Dispatch<SetStateAction<Boolean>>;
  setDeclaration: Dispatch<SetStateAction<Boolean>>;
}

/*
이름: ootd신고 모달
역할: ootd 상세 페이지에서 사용되는 ootd 신고 모달
*/
export default function ReportModal({
  reportModalIsOpen,
  setReportModalIsOpen,
  setDeclaration,
}: ReportModalProps) {
  const onClickReportButton = () => {
    setReportModalIsOpen(false);
  };

  return (
    <>
      <S.Layout onClick={onClickReportButton}>
        <Modal className="modal" isOpen={reportModalIsOpen} height="10">
          <S.Report>
            <Button1 className="report" onClick={() => setDeclaration(true)}>
              신고
            </Button1>
          </S.Report>
        </Modal>
      </S.Layout>
    </>
  );
}
