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

export interface getOOTDParams {
  id: number;
}
export interface putOOTDPayload extends postOOTDPayload {}

export interface deleteOOTDPayload {
  id: number;
}

export interface patchOOTDContentsOrIsPrivatePayload {
  content: string;
  isPrivate: Boolean;
}

export interface postOOTDBookmarkPayload {
  id: number;
}

export interface deleteOOTDBookmarkPayload {
  id: number;
}

export interface postOOTDLikePayload {
  id: number;
}

export interface deleteOOTDLikePayload {
  id: number;
}