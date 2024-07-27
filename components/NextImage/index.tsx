import Image from 'next/image';
import { MutableRefObject } from 'react';
interface ImageProps {
  id?: string;
  src: string;
  alt: string;
  fill: boolean;
  className?: string;
  width?: number;
  height?: number;
  ref?: MutableRefObject<HTMLImageElement | null>;
  onClick?: () => void;
  onLoadingComplete?: () => void;
}

export default function NextImage({
  id,
  src,
  alt,
  fill,
  className,
  width,
  height,
  onClick,
  ref,
  onLoadingComplete,
}: ImageProps) {
  return (
    <Image
      id={id}
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
      onLoadingComplete={onLoadingComplete}
    />
  );
}
