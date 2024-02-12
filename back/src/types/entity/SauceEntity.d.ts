export type SauceEntity = {
  _id: string;
  name: string;
  description: string;
  manufacturer: string;
  mainPepper: string;
  heat: number;
  likes: number;
  dislikes: number;
  userId: string;
  imageUrl: string;
  usersLiked: string[];
  usersDisliked: string[];
};
