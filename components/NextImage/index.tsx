import Image from 'next/image';
import { MutableRefObject } from 'react';
interface ImageProps {
  src: string;
  alt: string;
  fill: Boolean;
  className?: string;
  width?: number;
  height?: number;
  ref?: MutableRefObject<HTMLImageElement | null>;
  onClick?: () => void;
}

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
