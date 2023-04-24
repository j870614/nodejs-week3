import mongoose, {Model} from "mongoose";
import { PostInterface } from "./interfaces/PostInterface";

const postsSchema = new mongoose.Schema<PostInterface>({
  name: {
    type: String,
    required: [true, '貼文姓名未填寫'],
  },
  type: [
    {
      type: String,
      enum: ['group', 'person'],
      required: [true, '貼文類型 type 未填寫'],
    },
  ],
  tags: [
    {
      type: String,
      required: [true, '貼文類型 tags 未填寫'],
    },
  ],
  image: {
    type: String,
    default: '',
  },
  createAt: {
    type: Date,
    default: Date.now,
    select: false,
  },
  content: {
    type: String,
    required: [true, 'Content 未填寫']
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: {
    type: Number,
    default: 0,
  },
});

export const Posts:Model<PostInterface> = mongoose.model('posts', postsSchema); 