import { Layout, CardBody } from './style';
import { CardProps } from '@/utils/types/card.type';
import ImageWithCaption from '@/components/UI/ImageWithCaption';

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
