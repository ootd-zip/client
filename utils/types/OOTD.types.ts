import React, { Dispatch, SetStateAction } from 'react';

export interface BrandType {
  id: number;
  name: string;
  state?: Boolean;
}

export type ColorListType = {
  id: number;
  name: string;
  colorCode: string;
  state: Boolean;
}[];

export interface ClothWhereBuy {
  letter: string;
  type: 'Link' | 'Write';
}

export interface CommentStateType {
  ootdId: number;
  parentDepth: number;
  content: string;
  taggedUserName?: string;
  commentParentId?: number;
}

export interface CommentProps {
  id: number;
  userId: number;
  userImage: string;
  userName: string;
  content: string;
  timeStamp: string;
  type?: 'child';
  view?: 'preview';
  onClickReplyButton?: () => void;
  taggedUserName?: string;
  myComment?: Boolean;
  parentId?: number;
  reRender: number;
  depth?: number;
  setReRender: Dispatch<SetStateAction<number>>;
  setDeclaration: Dispatch<SetStateAction<Boolean>>;
  setReportUserName: Dispatch<SetStateAction<string>>;
  setReportID: Dispatch<SetStateAction<number>>;
  setBlockID: Dispatch<SetStateAction<number>>;
}

export interface OOTDType {
  id: number;
  contents: string; //본문
  viewCount: number; //조회수
  reportCount: number; //신고 횟수
  likeCount: number; //좋아요 개수
  userName: string; //유저명
  userImage: string; //유저 프로필 이미지
  userId: number;
  createAt: string; //작성일
  isBookmark: Boolean;
  isLike: Boolean;
  isPrivate: Boolean;
  isFollowing: Boolean;
  ootdImages: {
    ootdImage: string; //ootd 이미지
    ootdImageClothesList?: {
      clothesId: number;
      clothesImage: string;
      brand: { id: number; name: string }; //옷 브랜드
      category: {
        id: number;
        smallCategory: string;
        bigCategory: string;
      };
      size: string;
      clothesName: string; //옷 별칭
      coordinate: {
        xrate: string;
        yrate: string;
      };
      deviceSize: {
        deviceWidth: number;
        deviceHeight: number;
      };
    }[];
  }[];
  styles: {
    styleId: number;
    name: string;
  }[];
  comment?: {
    id: number;
    userName: string;
    userImage: string;
    content: string;
    timeStamp: string;
    childComment?: {
      id: number;
      userName: string;
      userImage: string;
      content: string;
      createAt: string;
      taggedUserName: string;
    }[];
  }[];
}

export type OOTDListType = {
  id: number;
  imageUrl: string;
  imageCount?: number;
};

export type GenderTypes = {
  man: Boolean;
  woman: Boolean;
};

export type ImageWithTag = {
  ootdId: number;
  ootdImage: string;
  ootdImageClothesList?: {
    clothesId: number;
    clothesImage: string;
    coordinate: { xrate: string; yrate: string };
    deviceSize: { deviceWidth: number; deviceHeight: number };
    caption: string;
    size?: string;
    state?: string;
    name?: string;
    brand?: string;
    category?: string;
  }[];
}[];

type CategoryType = {
  id: number;
  name: string;
  state?: boolean;
  detailCategories?: CategoryType[];
};

export type CategoryListType = CategoryType;

export type SizeItem = {
  id: number;
  name: string;
};

export interface FilterData {
  category: CategoryListType[] | null;
  color: ColorListType | null;
  brand: BrandType[] | null;
  isOpen: Boolean | null;
  gender?: {
    man: Boolean;
    woman: Boolean;
  };
}
