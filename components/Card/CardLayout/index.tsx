import { Layout, CardBody } from './style';
import { CardProps } from '../type';
import ImageWithCaption from '@/components/UI/ImageWithCaption';

/*
이름: 카드 레이아웃
역할: 카드를 만드는 공용 카드 레이아웃 
*/
export default function Card(props: CardProps) {
  return (
    <Layout size={props.size}>
      <ImageWithCaption
        src={props.data.src}
        caption={props.data.caption}
        alt={props.data.alt}
        size={props.size}
        onClick={props.onClick}
      />
      <CardBody>{props.children}</CardBody>
    </Layout>
  );
}
