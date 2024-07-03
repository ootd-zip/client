import { Body3 } from '@/components/UI';
import Card from '../CardLayout';
import { Layout } from './style';
import LikeToggle from '@/components/Toggle/LikeToggle';
import { useState } from 'react';
import Link from 'next/link';
import { OOTDApi } from '@/apis/domain/OOTD/OOTDApi';
import { MainFavoriteCardProps } from '@/utils/types/OOTD.types';

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
