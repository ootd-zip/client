export interface postOOTDPayload {
  content: string;
  isPrivate: Boolean;
  styles: number[];
  ootdImages: {
    ootdImage: string;
    clothTags?: {
      clothesId: number;
      deviceWidth?: number;
      deviceHeight?: number;
      xrate: string;
      yrate: string;
    }[];
  }[];
}

export interface patchOOTDIsPrivatePayload {
  isPrivate: Boolean;
}

export interface postClothPayload {
  purchaseStore: string;
  purchaseStoreType: string;
  brandId: number;
  categoryId: number;
  colorIds: number[];
  isPrivate: Boolean;
  sizeId: number;
  clothesImageUrl: string;
  name: string;
  memo?: string;
  purchaseDate?: string;
}

export interface postOOTDComentPayload {
  ootdId: number;
  parentDepth: number;
  content: string;
  taggedUserName?: string;
  commentParentId?: number;
}

export interface patchClothIsPrivateType {
  isPrivate: Boolean;
}

export interface patchProfilePayload {
  name: string;
  profileImage: string;
  description: string;
  height: number;
  weight: number;
  isBodyPrivate: Boolean;
}
