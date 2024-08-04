import S from './style';
import { Title1 } from '@/components/UI';

interface HeaderProps {
  text: string;
}

/*
이름: 타이틀 컴포넌트
역할: 각 페이지에서 사용되는 타이틀
*/

const Header = ({ text }: HeaderProps) => {
  return (
    <S.Layout>
      <Title1>{text}</Title1>
    </S.Layout>
  );
};

export default Header;
