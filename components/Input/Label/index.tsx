import { Body3, Headline1 } from '@/components/UI';

interface LabelSize {
  size: 'big' | 'small';
  children: React.ReactNode;
  className?: string;
}
/*
이름: 라벨
역할: 어떤 인풋인지 알려주는 텍스트
*/
export default function Label({ size, children, className }: LabelSize) {
  return (
    <div className={className}>
      {size === 'big' && <Headline1>{children}</Headline1>}
      {size === 'small' && <Body3>{children}</Body3>}
    </div>
  );
}
