import { MyProfile } from '@/components/Profile';
import S from './style';
import Carousel from '@/components/Carousel';
import { MainTopClothCard } from '@/components/Card';

interface UserClosetProps {
  isUser: Boolean;
  userOOTD: {
    user: {
      userImage: string;
      userName: string;
      follow: number;
      myCloth: number;
    };
    data: {
      OOTDImage: string;
      caption: string;
      headline: string;
      subHeadline: string;
    }[];
  };
}
/*
이름: 내가 좋아요한 ootd
역할: 내가 좋아요한 ootd 리스트를 보여주는 컴포넌트
특이사항: 현재는 사용하지 않음
*/
export default function UserCloset({ isUser, userOOTD }: UserClosetProps) {
  return (
    <S.Layout>
      {/*유저 프로필*/}
      <MyProfile
        isUser={isUser}
        userImage={userOOTD.user.userImage}
        userName={userOOTD.user.userName}
        follow={userOOTD.user.follow}
        myCloth={userOOTD.user.myCloth}
      />
      {/*옷장 요소들을 보여주는 슬라이드*/}
      <Carousel slidesToShow={2.3} infinite={false} dots={false}>
        {userOOTD.data.map((item, index) => {
          return (
            <S.CarouselLayout key={index}>
              <MainTopClothCard
                data={{
                  src: item.OOTDImage,
                  alt: '내 옷장',
                  caption: item.caption,
                }}
                headline={item.headline}
                body={item.subHeadline}
              />
            </S.CarouselLayout>
          );
        })}
      </Carousel>
    </S.Layout>
  );
}
