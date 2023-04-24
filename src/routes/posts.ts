import express from 'express';
import { PostsControllers } from '../controllers/posts';

const postsRouter = express.Router();

postsRouter.get("/", PostsControllers.getPosts);
postsRouter.post("/", PostsControllers.createPosts);
postsRouter.delete("/:id", PostsControllers.deletePost);
postsRouter.delete("/", PostsControllers.deleteAllPosts);
postsRouter.patch("/:id", PostsControllers.updatePost);

export { postsRouter };
