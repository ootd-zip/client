import { Body3 } from '@/components/UI';
import Card from '../CardLayout';
import { Layout } from './style';
import LikeToggle from '@/components/Toggle/LikeToggle';
import { useState } from 'react';
import Link from 'next/link';
import { OOTDApi } from '@/apis/domain/OOTD/OOTDApi';

export interface MainFavoriteCardProps {
  ootdId: number;
  ootdImageUrl: string;
  ootdImageCount: number;
  writerId: number;
  writerProfileImage?: string;
  writerName: string;
  onClick?: () => void;
}
/*
이름: 메인 찜 카드
역할: 메인에서 사용되는 내가 좋아요 한 ootd를 보여주는 카드 
*/
export default function MainFavoriteCard({
  ootdId,
  ootdImageUrl,
  ootdImageCount,
  writerId,
  writerProfileImage,
  writerName,
  onClick,
}: MainFavoriteCardProps) {
  const [favoriteState, setFavoriteState] = useState<Boolean>(true);
  const { postOOTDLike, deleteOOTDLike } = OOTDApi();

  //좋아요 버튼 클릭 함수
  const onClickLikeToggle = async () => {
    if (favoriteState) {
      deleteOOTDLike(ootdId);
      return;
    }
    postOOTDLike(ootdId);
  };

  return (
    <Card
      onClick={onClick}
      data={{ src: ootdImageUrl, alt: 'ootdimage', caption: '' }}
      size="228px"
    >
      <Layout>
        <Link className="userName" href={`/mypage/${writerId}`}>
          <Body3>{writerName}</Body3>
        </Link>
        <LikeToggle
          state={favoriteState}
          setState={setFavoriteState}
          onClick={onClickLikeToggle}
        />
      </Layout>
    </Card>
  );
}
