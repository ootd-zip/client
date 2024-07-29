import { AlarmApi } from '@/apis/domain/Alarm/AlarmApi';
import AppBar from '@/components/Appbar';
import Alarms, { AlarmType } from '@/components/Domain/Alarm';
import AlarmLayout from '@/components/Domain/Alarm/AlarmLayout';
import NoAlarm from '@/components/Domain/Alarm/NoAlarm';
import { Title1 } from '@/components/UI';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import S from '@/pageStyle/alarm/style';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

interface FetchedAlarmType {
  timeType: string;
  data: AlarmType[];
}

/*
이름: 알림 페이지
*/
export default function Alarm() {
  //읽지 않은 알림
  const [notIsReadAlarm, setNotIsReadAlarm] = useState<AlarmType[] | null>(
    null
  );
  //읽은 알림
  const [isReadAlarm, setIsReadAlarm] = useState<FetchedAlarmType[] | null>(
    null
  );

  const map = new Map<string, AlarmType[]>(); //전처리를 위한 map 자료구조

  const router = useRouter();

  const { getIsReadAlarm, getNotIsReadAlarm } = AlarmApi();

  //읽은 알림 조회 api 호출 함수
  const fetchIsReadAlarm = async (page: number, size: number) => {
    const data = await getIsReadAlarm({ page, size });

    data.content.forEach((item: AlarmType) => {
      if (map.has(item.timeType)) {
        map.set(item.timeType, [...map.get(item.timeType)!, item]);
      } else {
        map.set(item.timeType, [item]);
      }
    });

    const newIsReadAlarm = [] as FetchedAlarmType[];

    map.forEach((item, key) => {
      newIsReadAlarm.push({
        timeType: key,
        data: item,
      });
    });

    const newData = {
      content: newIsReadAlarm.length !== 0 && newIsReadAlarm,
      page: data.page,
      size: data.size,
      isLast: data.isLast,
    };

    return newData;
  };

  //읽지 않은 알림 조회 api 호출 함수
  const fetchNotIsReadAlarm = async () => {
    const { content: notIsReadData } = await getNotIsReadAlarm({
      page: 0,
      size: 100,
    });

    setNotIsReadAlarm(notIsReadData);
  };

  useEffect(() => {
    fetchNotIsReadAlarm();
  }, []);

  //읽은 댓글을 무한 스크롤 하기 위한 훅
  const { data: isReadAlarmList, containerRef } = useInfiniteScroll({
    fetchDataFunction: fetchIsReadAlarm,
    initialData: [],
    size: 20,
  });

  //읽은 댓글을 전처리 하는 함수
  useEffect(() => {
    const map = new Map();
    isReadAlarmList.length > 0 &&
      isReadAlarmList.forEach((item: FetchedAlarmType) => {
        if (map.has(item.timeType)) {
          map.set(item.timeType, [...map.get(item.timeType), ...item.data]);
        } else {
          map.set(item.timeType, item.data);
        }
      });

    const newIsReadAlarm = [] as FetchedAlarmType[];

    map.forEach((item, key) => {
      newIsReadAlarm.push({
        timeType: key,
        data: item,
      });
    });
    setIsReadAlarm(newIsReadAlarm);
  }, [isReadAlarmList]);

  return (
    <>
      <AppBar
        leftProps={<AiOutlineArrowLeft onClick={() => router.push('/main')} />}
        middleProps={<Title1>알림함</Title1>}
        rightProps={<></>}
      />
      {!notIsReadAlarm?.length && !isReadAlarm?.length && <NoAlarm />}
      <S.Layout ref={containerRef}>
        {notIsReadAlarm && notIsReadAlarm.length > 0 && (
          <AlarmLayout index={0}>
            <Title1 className="title">읽지 않음</Title1>
            {notIsReadAlarm?.map((item, index) => (
              <Alarms key={index} {...item} className={'isNotRead'} />
            ))}
          </AlarmLayout>
        )}
        {isReadAlarm?.map((item, index) => (
          <AlarmLayout index={notIsReadAlarm !== null ? index : 1} key={index}>
            <Title1 className="title">{item.timeType}</Title1>
            {item.data.map((innerItem, innerIndex) => (
              <Alarms key={innerIndex} {...innerItem} />
            ))}
          </AlarmLayout>
        ))}
      </S.Layout>
    </>
  );
}
