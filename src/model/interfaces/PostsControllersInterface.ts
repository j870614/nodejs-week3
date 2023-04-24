import { Response, Request } from 'express';

export interface PostsControllersInterface {
  getPosts(req: Request, res: Response): Promise<void>;
  createPosts(req: Request, res: Response): Promise<void>;
  deletePost(req: Request, res: Response): Promise<void>;
  deleteAllPosts(req: Request, res: Response): Promise<void>;
  updatePost(req: Request, res: Response ): Promise<void>;
};
