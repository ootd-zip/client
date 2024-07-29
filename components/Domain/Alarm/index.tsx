import Image from 'next/image';
import S from './style';
import { Body4, Caption2 } from '@/components/UI';
import Avatar from '@/public/images/Avatar.svg';
import { useRouter } from 'next/router';
import { AlarmApi } from '@/apis/domain/Alarm/AlarmApi';
import React from 'react';

export interface AlarmType {
  id: number;
  profileImage: string | null;
  timeType: string;
  timeStamp: string;
  message: string;
  userName: string;
  content?: string;
  contentImage?: string;
  goUrl: string;
  userId: number;
  className: string;
}
/*
이름: 알림
역할: 단일 알림 컴포넌트
*/
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

  //알림 클릭 함수
  const onClickAlarm = async () => {
    await readAlarm(id); //읽음처리
    router.push(`/${goUrl}`);
  };

  //유저 이름 클릭 함수
  const onClickUserName = (e: React.MouseEvent) => {
    e.stopPropagation(); // 유저 이름과 알림이 둘 다 클릭되는 현상 방지
    if (userId !== 0) router.push(`/mypage/${userId}`);
  };

  return (
    <S.Layout className={className}>
      {/*알림을 유발한 유저의 프로필 사진 */}
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
      {/*알림 본문 */}
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
      {/*알림 이미지 */}
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
