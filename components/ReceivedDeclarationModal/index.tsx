import Modal from '@/components/Modal';
import S from './style';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineExclamationCircle } from 'react-icons/ai';
import { Button3, Caption1, Headline2, Body3 } from '../UI';
import Toast from '../Toast';
import { BlockApi } from '@/apis/domain/Block/BlockApi';
import { useRouter } from 'next/router';

interface ReceivedDeclarationModalProps {
  type: string;
  reportStatus: Boolean;
  receivedDeclaration: Boolean;
  setReceivedDeclaration: Dispatch<SetStateAction<Boolean>>;
  ID: number;
  setGoBackAfterBlock: Dispatch<SetStateAction<Boolean>>;
  setBlockStatus: Dispatch<SetStateAction<Boolean>>;
}

export default function ReceivedDeclarationModal({
  type,
  reportStatus,
  receivedDeclaration,
  setReceivedDeclaration,
  ID,
  setGoBackAfterBlock,
  setBlockStatus,
}: ReceivedDeclarationModalProps) {
  const { postUserBlock } = BlockApi();
  const router = useRouter();

  const blockUserButton = async () => {
    const blockUser = await postUserBlock({ userId: ID });

    if (blockUser.divisionCode === 'UB003') {
      setReceivedDeclaration(false); // 차단 모달 닫기
      setBlockStatus(false);
      setGoBackAfterBlock(true);
    } else if (blockUser === '성공') {
      setReceivedDeclaration(false); // 차단 모달 닫기
      setBlockStatus(true);
      setGoBackAfterBlock(true);
    }
  };

  return (
    <Modal isOpen={receivedDeclaration} height="55">
      <S.Layout>
        <S.Header>
          <AiOutlineClose
            onClick={() => setReceivedDeclaration(false)}
            className="close"
          />
        </S.Header>
        <S.Frame>
          <AiOutlineExclamationCircle className="infoIcon" />
          <Headline2 className="reportTitle">
            {reportStatus === true
              ? '신고가 완료되었습니다.'
              : `이미 신고한 ${type}입니다.`}
          </Headline2>
          <S.ColorSpan>
            <Body3>
              추가 조치로 해당 사용자를 차단할 수 있습니다.
              <br />
              차단하시겠습니까?
              <br />
              ‘설정 {'>'} 내 계정 {'>'} 차단한 계정’에서 해제할 수 있습니다.
              <br />
              오른쪽 위 닫기를 누르면 해당 페이지에서 벗어나게 됩니다.
            </Body3>
          </S.ColorSpan>
        </S.Frame>
        <S.Button onClick={blockUserButton}>
          <Button3>사용자 차단하기</Button3>
        </S.Button>
      </S.Layout>
    </Modal>
  );
}
