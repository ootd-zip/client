import { Body4, Title2 } from '@/components/UI';
import { CardComponentProps } from '../type';
import Card from '../CardLayout';
import { Layout } from './style';
/*
이름: 메인 상단 옷 카드
역할: 메인 상단에서 사용되는 유저의 옷장 카드
*/
export default function MainTopClothCard(props: CardComponentProps) {
  return (
    <Card data={props.data} size="137px">
      <Layout>
        <Title2>{props.headline}</Title2>
        <Body4>{props.body}</Body4>
      </Layout>
    </Card>
  );
}
