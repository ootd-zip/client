/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */

import { BottomComponent, BottomComponentItem } from './style';

import {
  AiOutlineUser,
  AiOutlinePlusSquare,
  AiOutlineHome,
  AiFillHome,
  AiOutlineSearch,
} from 'react-icons/ai';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import BookmarkOutlined from '@/public/images/BookmarkOutlined.svg';
import BookmarkFilled from '@/public/images/BookmarkFilled.svg';
import UserFilled from '@/public/images/UserFilled.svg';
import SearchFilled from '@/public/images/SearchFilled.svg';
import { useRecoilValue } from 'recoil';
import { userId } from '@/utils/recoil/atom';
import FilledSquare from '@/public/images/FilledPlusSquare.svg';
import Link from 'next/link';

const icons = [
  <AiOutlineHome />,
  <AiOutlineSearch />,
  <AiOutlinePlusSquare />,
  <BookmarkOutlined />,
  <AiOutlineUser />,
];

const activeIcons = [
  <AiFillHome />,
  <SearchFilled />,
  <FilledSquare />,
  <BookmarkFilled />,
  <UserFilled />,
];

interface BottomNavBarProps {
  addModalState: Boolean;
  setAddModalState: Dispatch<SetStateAction<Boolean>>;
}

interface BottomNavBarType {
  icon: JSX.Element;
  click: () => void;
}

/*
이름: 하단 네비게이션 바
역할: 유저의 컨텐츠 이동을 돕는 컴포넌트
특이사항: url를 기반으로 작동함 
*/
export default function BottomNavBar({
  addModalState,
  setAddModalState,
}: BottomNavBarProps) {
  const router = useRouter();
  const path = router.asPath;
  const myId = useRecoilValue(userId);

  //네비게이션 클릭 시 이동하는 주소
  const routes = [
    '/main/explore',
    '/search',
    '/plus',
    '/bookmark',
    `/mypage/${myId}`,
  ];

  //현재 위치하고 있는 라우터의 인덱스를 얻는 함수
  const getActiveIndex = () =>
    routes.findIndex((route) => path.includes(route));

  //현재 위치하고 있는 인덱스
  const activeIndex = getActiveIndex();

  //바텀 네비게이션 바의 정보를 담고있는 상태, 아이콘과 동작 이벤트로 이루어져있음
  const [bottomNavBarLinkers, setBottomNavBarLinkers] =
    useState<BottomNavBarType[]>();

  //페이지 렌더링 시 바텀 네비게이션 바를 세팅
  useEffect(() => {
    setBottomNavBarLinkers(
      icons.map((icon, index) => ({
        icon: index === activeIndex ? activeIcons[index] : icon,
        click: () => {
          router.push(routes[index]);
          setAddModalState(false);
          sessionStorage.clear();
        },
      }))
    );
  }, []);

  //페이지 이동 시 바텀 네비게이션 바 변경
  useEffect(() => {
    const newLinkers = icons.map((icon, index) => ({
      icon: index === activeIndex ? activeIcons[index] : icon,
      click: () => {
        router.push(routes[index]);
        setAddModalState(false);
        sessionStorage.clear();
      },
    }));
    setBottomNavBarLinkers(newLinkers);
  }, [router, activeIndex]);

  //아이템 추가 버튼 클릭 함수
  const onClickPlusButton = () => {
    setAddModalState(!addModalState);
  };

  return (
    <BottomComponent>
      {bottomNavBarLinkers &&
        bottomNavBarLinkers.map((item, index) =>
          index === 2 ? (
            <BottomComponentItem key={index} onClick={onClickPlusButton}>
              {addModalState ? <FilledSquare /> : <AiOutlinePlusSquare />}
            </BottomComponentItem>
          ) : (
            <Link key={index} href={routes[index]}>
              <BottomComponentItem onClick={item.click}>
                {path.substring(1, 7) === 'mypage' && index === 4
                  ? router.isReady && myId === Number(router.query.UserId![0])
                    ? activeIcons[index]
                    : item.icon
                  : item.icon}
              </BottomComponentItem>
            </Link>
          )
        )}
    </BottomComponent>
  );
}
