/* eslint-disable @next/next/no-img-element */
import S from './style';
import { Body3 } from '@/components/UI';
import Button from '../Button';

interface FollowBlockProps {
  data: {
    profileId: number;
    name: string;
    profileImage: string;
    followCheck?: Boolean;
  };
  onClick: () => void;
  state?: string;
}

export default function FollowBlock({
  data,
  onClick,
  state,
}: FollowBlockProps) {
  return (
    <S.Layout>
      <img src={data.profileImage} alt="" />
      <Body3 state="emphasis" style={{ flex: '1 0 0' }}>
        {data.name}
      </Body3>
      {data.followCheck ? (
        <Button
          border={false}
          size="small"
          backgroundColor="grey_95"
          color="grey_00"
          className="followButton"
          onClick={onClick}
        >
          <Body3>{state === 'blcok' ? '해제' : '팔로잉'}</Body3>
        </Button>
      ) : (
        <Button
          border={true}
          size="small"
          backgroundColor="grey_100"
          color="grey_00"
          className="followButton"
          onClick={onClick}
        >
          <Body3>팔로우</Body3>
        </Button>
      )}
    </S.Layout>
  );
}
