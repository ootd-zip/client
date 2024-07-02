export interface UserProfileDataType {
  userId: number;
  userName: string;
  profileImage: string;
  followerCount: number;
  followingCount: number;
  height: number;
  weight: number;
  description: string;
  isMyProfile: Boolean;
  isFollow: Boolean;
  ootdCount: number;
  clothesCount: number;
}

export interface ProfileType {
  isUser: Boolean;
  userImage: string;
  userName: string;
  follow?: number;
  myCloth?: number;
  className?: string;
  showingId?: number;
}

export interface ProfileListType {
  id: number;
  name: string;
  profileImage: string;
  isFollow: Boolean;
}
