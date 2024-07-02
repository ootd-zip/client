import { Body4, Title2 } from '@/components/UI';
import { CardComponentProps } from '@/utils/types/card.type';
import Card from '../CardLayout';
import { Layout } from './style';

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
