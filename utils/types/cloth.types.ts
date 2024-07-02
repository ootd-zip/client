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

export interface ClothDataType {
  id: number;
  name: string;
  userName: string;
  brand: { id: number; name: string };
  category: { id: number; categoryName: string; parentCategoryName: string };
  size: { id: number; name: string; lineNo: string };
  colors: { id: number; name: string; colorCode: string }[];
  isPrivate: Boolean;
  memo: string;
  purchaseStore: string;
  purchaseStoreType: string;
  purchaseDate: string;
  imageUrl: string;
  createdAt: string;
  userId: number;
}

export interface UserClothDataType {
  id: number;
  isTagged: number;
  imageUrl: string;
  clothesName: string;
  brandName: string;
  categoryName: string;
  sizeName: string;
}
