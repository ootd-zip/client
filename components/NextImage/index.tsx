import Image from 'next/image';
import { MutableRefObject } from 'react';
interface ImageProps {
  src: string;
  alt: string;
  fill: boolean;
  className?: string;
  width?: number;
  height?: number;
  ref?: MutableRefObject<HTMLImageElement | null>;
  onClick?: () => void;
}

/*
이름: 넥스트 이미지
역할: next/image 를 사용해 이미지 최적화를 해주는 컴포넌트
특이사항: 스캐폴딩을 위한 blur 처리도 해주었다.
*/
export default function NextImage({
  src,
  alt,
  fill,
  className,
  width,
  height,
  onClick,
  ref,
}: ImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      style={{ objectFit: 'cover' }}
      className={className}
      onClick={onClick}
      width={width}
      height={height}
      ref={ref}
      placeholder="blur"
      blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
    />
  );
}
