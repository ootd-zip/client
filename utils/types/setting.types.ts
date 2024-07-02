export interface AnnoucementDataType {
  date: string;
  headline: string;
  newState: Boolean;
  body: string;
}

export interface QueryParams {
  code?: string;
  state?: string;
  callback?: string[];
}
