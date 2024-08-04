import { SyncLoader } from 'react-spinners';
import S from './style';
import theme from '@/styles/colors/index';
/*
이름: 스피너
역할: 공용으로 사용되는 무한 스크롤 로딩중 유저에게 보여지는 컴포넌트
*/
export default function Spinner() {
  return (
    <S.Layout>
      <SyncLoader className="spinner" color={theme.correct} />
    </S.Layout>
  );
}
