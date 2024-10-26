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
  name: string;
  clothesImageUrl: string;
  categoryId: number;
  brandId: number;
  colorIds: number[];
  isPrivate: Boolean;
  sizeId?: number;
  memo?: string;
  purchaseStore?: string;
  purchaseStoreType?: string;
  purchaseDate?: string;
}

export interface getUserBookmarkListPayload {
  page: number;
  size: number;
  sortCriteria: string;
  sortDirection: string;
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
export interface postReportPayload {
  reportIds: number[];
  targetId: number;
  reportType: string;
}

export interface postRegistUserInfoPayload {
  name: string;
  gender: string;
  age: number;
  height: number;
  weight: number;
  isBodyPrivate: Boolean;
  styles: number[];
}

export interface paginationType {
  page: number;
  size: number;
  sortCriteria?: string;
  sortDirection?: 'ASC' | 'DESC';
}

export interface getOOTDParams extends paginationType {
  userId: number;
}

export interface getOOTDCommentParams extends paginationType {
  ootdId: number;
}

export interface getClothListParams extends paginationType {
  userId: number;
  isPrivate?: Boolean;
  brandIds?: number[];
  categoryIds?: number[];
  colorIds?: number[];
  searchText?: string;
}

export interface getOOTDClothesParams extends paginationType {
  clothesId: number;
}
export interface getAlarmParams extends paginationType {
  isRead: Boolean;
}

export interface getSearchUserParams extends paginationType {
  name?: string;
  searchType?: 'USER' | 'FOLLOWING' | 'FOLLOWER';
  userId?: number;
}

export interface getSearchOOTDParams {
  searchText: string;
  categoryIds?: number[];
  colorIds?: number[];
  brandIds?: number[];
  writerGender?: string;
  sortCriteria: string;
  page: number;
  size: number;
}

export interface putStylePayload {
  styleIds: number[];
}

export interface getUserTaggedClothListParams {
  ootdId: number;
  userId: number;
}

export interface getUserBlockListParams {
  page: number;
  size: number;
}

export interface postUserBlockPayload {
  userId: number;
}

export interface postBrandPayload {
  requestContents: string;
}
