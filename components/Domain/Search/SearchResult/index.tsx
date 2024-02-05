import { useFunnel } from '@/hooks/use-funnel';
import S from './style';
import ClosetTabbar from './ClosetTabbar';
import ClosetCloth from './ClosetCloth';
import Follow from './Follow';
import EmptySearch from '@/components/EmptySearch';

export default function Closet() {
  const [Funnel, currentStep, handleStep] = useFunnel(['OOTD', 'Profile']);

  const myPageClothList = [
    {
      clothId: 0,
      clothImage:
        'https://image.msscdn.net/mfile_s01/_shopstaff/list.staff_6515b944a6206.jpg',
    },
    {
      clothId: 1,
      clothImage:
        'https://image.msscdn.net/mfile_s01/_shopstaff/list.staff_6515b944a6206.jpg',
    },
    {
      clothId: 2,
      clothImage:
        'https://image.msscdn.net/mfile_s01/_shopstaff/list.staff_6515b944a6206.jpg',
    },
    {
      clothId: 3,
      clothImage:
        'https://image.msscdn.net/mfile_s01/_shopstaff/list.staff_6515b944a6206.jpg',
    },
    {
      clothId: 4,
      clothImage:
        'https://image.msscdn.net/mfile_s01/_shopstaff/list.staff_6515b944a6206.jpg',
    },
    {
      clothId: 5,
      clothImage:
        'https://image.msscdn.net/mfile_s01/_shopstaff/list.staff_6515b944a6206.jpg',
    },
    {
      clothId: 5,
      clothImage:
        'https://image.msscdn.net/mfile_s01/_shopstaff/list.staff_6515b944a6206.jpg',
    },
    {
      clothId: 5,
      clothImage:
        'https://image.msscdn.net/mfile_s01/_shopstaff/list.staff_6515b944a6206.jpg',
    },
    {
      clothId: 5,
      clothImage:
        'https://image.msscdn.net/mfile_s01/_shopstaff/list.staff_6515b944a6206.jpg',
    },
    {
      clothId: 5,
      clothImage:
        'https://image.msscdn.net/mfile_s01/_shopstaff/list.staff_6515b944a6206.jpg',
    },
  ];

  const profileList = [
    {
      profileId: 0,
      name: 'Userame0',
      profileImage:
        'https://image.msscdn.net/mfile_s01/_shopstaff/list.staff_6515b944a6206.jpg',
      followCheck: true,
    },
    {
      profileId: 1,
      name: 'Userame1',
      profileImage:
        'https://image.msscdn.net/mfile_s01/_shopstaff/list.staff_6515b944a6206.jpg',
      followCheck: false,
    },
    {
      profileId: 2,
      name: 'Userame2',
      profileImage:
        'https://image.msscdn.net/mfile_s01/_shopstaff/list.staff_6515b944a6206.jpg',
      followCheck: true,
    },
    {
      profileId: 3,
      name: 'Userame3',
      profileImage:
        'https://image.msscdn.net/mfile_s01/_shopstaff/list.staff_6515b944a6206.jpg',
      followCheck: true,
    },
    {
      profileId: 4,
      name: 'Userame4',
      profileImage:
        'https://image.msscdn.net/mfile_s01/_shopstaff/list.staff_6515b944a6206.jpg',
      followCheck: false,
    },
  ];

  return (
    <>
      <S.Layout>
        <ClosetTabbar handleStep={handleStep} currentStep={currentStep} />
        <Funnel>
          <Funnel.Steps name="OOTD">
            {myPageClothList.length > 0 ? (
              <ClosetCloth myPageClothList={myPageClothList} />
            ) : (
              <EmptySearch />
            )}
          </Funnel.Steps>
          <Funnel.Steps name="Profile">
            {profileList.length > 0 ? (
              <Follow profileList={profileList} />
            ) : (
              <EmptySearch />
            )}
          </Funnel.Steps>
        </Funnel>
      </S.Layout>
    </>
  );
}
