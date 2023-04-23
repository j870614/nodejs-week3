import { Response, Request } from 'express';
import { Posts } from '../model/posts';
import { PostInterface } from '../model/interfaces/PostInterface';
import { handleError } from "../service/handleError";
import { handleSuccess } from '../service/handleSuccess';

interface PostsControllersInterface {
  getPosts(req: Request, res: Response): Promise<void>;
  createPosts(req: Request, res: Response): Promise<void>;
  deletePost(req: Request, res: Response): Promise<void>;
  deleteAllPosts(req: Request, res: Response): Promise<void>;
};

export const PostsControllers: PostsControllersInterface = {
  getPosts: async (req: Request, res: Response ): Promise<void> => {
    const allPosts: PostInterface[] = await Posts.find();
    // handleSuccess<PostInterface[]>(res, allPosts);
    handleSuccess(res, allPosts);
  },
  createPosts: async (req: Request, res: Response ): Promise<void> => {
    try {
      const { body }: { body: PostInterface } = req;
      const { name, content, tags, type } = body;

      if (content) {
        const newPost: PostInterface = await Posts.create({
          name,
          content,
          tags,
          type,
        });
        handleSuccess<PostInterface>(res, newPost);
      } else {
        handleError({res, msg: '欄位填寫錯誤'});
      }
    } catch (err) {
      handleError({res, err});
    }
  },
  deletePost: async (req: Request, res: Response ): Promise<void> => {
    const { id } : { id?: string } = req.params;
    console.log('id:', id);
    try {
      const post = await Posts.findByIdAndDelete(id);
      if (post) {
        handleSuccess<PostInterface>(res, post);
      } else {
        handleError({
          res,
          msg: '無此 id',
        })
      }
    } catch (err) {
      handleError({
        res,
        err,
        msg: '無此 id',
      })
    }
  },
  deleteAllPosts: async (req: Request, res: Response ): Promise<void> => {
    try {
      await Posts.deleteMany();
      handleSuccess<null> (res, null);
    } catch (err) {
      handleError({
        res,
        err,
      });
    }
  },
};