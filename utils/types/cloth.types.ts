export interface ClothInformationProps {
  clothId: number;
  clothImage: string;
  clothSize?: string;
  name?: string;
  brand?: string;
  size?: string;
  category?: string;
  icon?: string;
  state?: 'dark' | 'light';
  type?: 'view';
  caption?: string;
  className?: string;
  onClick?: () => void;
  onTouchEnd?: () => void;
}
