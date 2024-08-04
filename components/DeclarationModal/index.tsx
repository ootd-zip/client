import Modal from '@/components/Modal';
import S from './style';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { Button3, Caption1, Title1 } from '../UI';
import WithdrawBlock from '../Setting/WithdrawBlock';
import ReportApi from '@/apis/domain/Report/ReportApi';

export type withdrawBlockType = {
  id: number;
  message: string;
}[];

interface DeclarationModalProps {
  type: string;
  userName?: string;
  ID: number;
  declaration: Boolean;
  setDeclaration: Dispatch<SetStateAction<Boolean>>;
  setReceivedDeclaration: Dispatch<SetStateAction<Boolean>>;
  setReportStatus: Dispatch<SetStateAction<Boolean>>;
}

/*
이름: 신고 모달 컴포넌트
역할: 유저가 다른 유저를 신고할 때 사용되는 모달
*/

export default function DeclarationModal({
  type,
  userName,
  ID,
  declaration,
  setDeclaration,
  setReceivedDeclaration,
  setReportStatus,
}: DeclarationModalProps) {
  const [checks, setChecks] = useState<Array<Boolean>>([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [possible, setPossible] = useState<Boolean>(false);

  // 신고 사유 어느 한 개라도 해당되면 신고하기 버튼 활성화 가능
  useEffect(() => {
    setPossible(checks.some((check) => check));
  }, [checks]);

  const { getReport, postReport } = ReportApi();

  // 신고 사유 API 데이터
  const [withdrawBlockTitles, setWithdrawBlockTitles] =
    useState<withdrawBlockType>([]);

  useEffect(() => {
    const fetchReport = async () => {
      const report = await getReport();

      setWithdrawBlockTitles(report);
    };

    fetchReport();
  }, []);

  // 신고 사유 클릭 후 최종 신고하기 버튼
  const onClickDeclarationButton = async () => {
    const trueIndices: number[] = checks.reduce(
      (acc: number[], currentValue: Boolean, currentIndex: number) => {
        if (currentValue === true) {
          acc.push(currentIndex);
        }
        return acc;
      },
      []
    );

    const payload = {
      reportIds: trueIndices,
      targetId: Number(ID),
      reportType: type,
    };

    const addReportSuccess = await postReport(payload);

    if (addReportSuccess.divisionCode === 'R002') {
      setReceivedDeclaration(true); // 차단 모달 열기
      setDeclaration(false); // 신고하기 모달 닫기
      setReportStatus(false);
    } else if (
      addReportSuccess.result &&
      addReportSuccess.result.id &&
      addReportSuccess.result.reportCount > 0
    ) {
      setReceivedDeclaration(true); // 차단 모달 열기
      setDeclaration(false); // 신고하기 모달 닫기
      setReportStatus(true);
    } else {
      alert('신고 실패');
    }
  };

  return (
    <Modal isOpen={declaration} height="85">
      <S.Layout>
        <S.Header>
          <AiOutlineClose
            onClick={() => setDeclaration(false)}
            className="close"
          />
        </S.Header>
        <S.Frame>
          <Title1>{userName}님의</Title1>
          {type === 'COMMENT' ? (
            <Title1>댓글을 신고합니다.</Title1>
          ) : (
            <Title1>게시글을 신고합니다.</Title1>
          )}
          <Caption1 className="ment">
            아래에서 신고 사유를 선택해주세요. 회원님의 신고는 익명으로
            처리됩니다.
          </Caption1>
        </S.Frame>
        {withdrawBlockTitles.map((item, index) => (
          <WithdrawBlock
            key={item.id}
            title={item.message}
            checked={checks[item.id]}
            lastItem={withdrawBlockTitles.length - 1 === index}
            setChecked={() => {
              const newChecks = [...checks];
              newChecks[item.id] = !newChecks[item.id];
              setChecks(newChecks);
            }}
          />
        ))}
        <S.Button state={possible} onClick={onClickDeclarationButton}>
          <Button3>신고하기</Button3>
        </S.Button>
      </S.Layout>
    </Modal>
  );
}
