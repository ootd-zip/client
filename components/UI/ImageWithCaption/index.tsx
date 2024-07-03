import { ImageProps } from '@/utils/types/card.type';
import { ImageCaption, ImageFigure } from './style';
import { Caption2 } from '../TypoGraphy';
import NextImage from '@/components/NextImage';

export default function ImageWithCaption(props: ImageProps) {
  return (
    <ImageFigure size={props.size}>
      <NextImage onClick={props.onClick} src={props.src} alt={props.alt} fill />
      {props.caption !== '' && (
        <ImageCaption size={props.size}>
          <Caption2 className="caption">{props.caption}</Caption2>
        </ImageCaption>
      )}
    </ImageFigure>
  );
}
