import Image from 'next/image';
import S from './style';
import { Body4, Caption2 } from '@/components/UI';
import Avatar from '@/public/images/Avatar.svg';
import { useRouter } from 'next/router';
import { AlarmApi } from '@/apis/domain/Alarm/AlarmApi';
import React from 'react';
import { AlarmType } from '@/utils/types/setting.types';

export default function Alarms({
  id,
  profileImage,
  contentImage,
  timeStamp,
  message,
  content,
  userName,
  goUrl,
  userId,
  className,
}: AlarmType) {
  const router = useRouter();
  const { readAlarm } = AlarmApi();

  const onClickAlarm = async () => {
    await readAlarm(id);
    router.push(`/${goUrl}`);
  };

  const onClickUserName = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (userId !== 0) router.push(`/mypage/${userId}`);
  };

  return (
    <S.Layout className={className}>
      <S.Left onClick={() => router.push(`/mypage/${userId}`)}>
        {profileImage && (
          <Image
            width={32}
            height={32}
            src={profileImage}
            alt="프로필 이미지"
          />
        )}
        {!profileImage && <Avatar />}
      </S.Left>
      <S.Middle onClick={onClickAlarm}>
        <S.Message>
          <Body4
            onClick={onClickUserName}
            className="userName"
            state="emphasis"
          >
            {userName}
          </Body4>
          <Body4>{message}</Body4>
        </S.Message>
        {content && <Body4 className="content">{content}</Body4>}
        <Caption2 className="timeStamp">{timeStamp}</Caption2>
      </S.Middle>
      <S.Right onClick={onClickAlarm}>
        {contentImage && (
          <Image
            width={32}
            height={32}
            src={contentImage}
            alt="콘텐츠 이미지"
          />
        )}
      </S.Right>
    </S.Layout>
  );
}
