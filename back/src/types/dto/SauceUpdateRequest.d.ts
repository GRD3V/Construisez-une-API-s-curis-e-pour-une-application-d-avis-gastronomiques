export type SauceUpdateRequest = {
  name: string;
  manufacturer: string;
  description: string;
  mainPepper: string;
  imageUrl: string;
  heat: number;
  userId: string;
  likes: number;
  dislikes: number;
  usersLiked: string[];
  usersDisliked: string[];
};
