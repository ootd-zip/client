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

export interface AlarmType {
  id: number;
  profileImage: string | null;
  timeType: string;
  timeStamp: string;
  message: string;
  userName: string;
  content?: string;
  contentImage?: string;
  goUrl: string;
  userId: number;
  className: string;
}
