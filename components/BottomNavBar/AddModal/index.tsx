import S from './style';
import { Button3 } from '@/components/UI';
import { useRouter } from 'next/router';
import AccentCloth from '@/public/images/AccentCloth.svg';
import AccentOOTD from '@/public/images/AccentOOTD.svg';

/*
이름: 아이템 추가 모달
역할: ootd와 옷을 추가하는 모달 컴포넌트 
*/
export default function AddModal() {
  const router = useRouter();

  return (
    <S.Layout>
      <S.OOTD onClick={() => router.push('/add-ootd')}>
        <AccentOOTD fill="black" />
        <Button3>OOTD</Button3>
      </S.OOTD>
      <S.Closet onClick={() => router.push('/add-cloth')}>
        <AccentCloth />
        <Button3>의류</Button3>
      </S.Closet>
    </S.Layout>
  );
}
