/* eslint-disable import/no-extraneous-dependencies */
import { Document } from "mongoose";

export interface PostInterface extends Document {
  name: string;
  tags: string [];
  type: string;
  image?: string;
  createAt?: Date;
  content: string;
  likes?: number;
  comments?: number;
};
