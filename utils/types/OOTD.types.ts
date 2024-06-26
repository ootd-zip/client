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
