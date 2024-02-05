import { Body4, Caption2 } from '@/components/UI';
import S from './style';
import { useEffect, useState } from 'react';
import FollowBlock from '@/components/FollowBlock';
import { useRouter } from 'next/router';

interface FollowProps {
  profileList?: FollowType[];
}

export type FollowType = {
  profileId: number;
  name: string;
  profileImage: string;
  followCheck: boolean;
};

export default function Profile({ profileList }: FollowProps) {
  const router = useRouter();

  const onClickFollow = () => {
    console.log('클릭');
  };

  return (
    <>
      <S.Layout>
        {profileList &&
          profileList.map((item, index) => {
            return (
              <FollowBlock key={index} data={item} onClick={onClickFollow} />
            );
          })}
      </S.Layout>
    </>
  );
}
