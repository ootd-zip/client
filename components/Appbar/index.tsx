import {
  Layout,
  AppBarLeft,
  AppBarMiddle,
  AppBarRight,
  RightTouch,
  LeftTouch,
} from './style';

interface AppBarPoprs {
  leftProps: React.ReactElement;
  middleProps: React.ReactElement;
  rightProps: React.ReactElement;
}
/*
이름: 앱바 컴포넌트
역할: 화면 상단에서 네비게이션을 담당 
*/

export default function AppBar(props: AppBarPoprs) {
  return (
    <Layout>
      {/*앱바의 왼쪽부분 */}
      <AppBarLeft>
        <LeftTouch>{props.leftProps}</LeftTouch>
      </AppBarLeft>
      {/*앱바의 가운데 부분 */}
      <AppBarMiddle>{props.middleProps}</AppBarMiddle>
      <AppBarRight>
        {/*앱바의 오른쪽 부분 */}
        <RightTouch>{props.rightProps}</RightTouch>
      </AppBarRight>
    </Layout>
  );
}
