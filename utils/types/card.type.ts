//이미지에 대한 정보 Props
export interface ImageProps {
  src: string;
  alt: string;
  caption?: string;
  size: string;
  onClick?: () => void;
}

//generic 카드 컴포넌트 Props
export interface CardProps {
  data: DataProps;
  size: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

// 카드로 만든 컴포넌트 Props
export interface CardComponentProps {
  data: DataProps;
  headline?: string; //MainTopUser 헤드라인
  body?: string; //MainTopUser 바디
  callout?: string;
}

//서버에서 받은 이미지에 대한 정보 Props
export interface DataProps {
  src: string;
  alt: string;
  caption: string;
}
