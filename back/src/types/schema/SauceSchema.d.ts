import { ObjectId } from "mongoose";

export type SauceSchema = {
  id: string;
  userId: string;
  name: string;
  manufacturer: string;
  description: string;
  mainPepper: string;
  imageUrl: string;
  heat: number;
  likes: number;
  dislikes: number;
  usersLiked: string[];
  usersDisliked: string[];
  createdAt: Date;
  updatedAt: Date;
};
