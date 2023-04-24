import { Response, Request, NextFunction } from 'express';
import { Posts } from '../model/posts';
import { PostInterface } from '../model/interfaces/PostInterface';
import { handleError } from "../service/handleError";
import { handleSuccess } from '../service/handleSuccess';

export class PostsControllers {
  public static getPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const allPosts: PostInterface[] = await Posts.find();
      handleSuccess(res, allPosts);
      next();
    } catch (err) {
      handleError({res, err});
    }
  }

  public static createPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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
  }

  public static deletePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } : { id?: string } = req.params;
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
  }

  public static deleteAllPosts = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await Posts.deleteMany();
      handleSuccess<null> (res, null);
    } catch (err) {
      handleError({
        res,
        err,
      });
    }
  }

  public static updatePost = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id }: { id?: string  } = req.params;
    const { body }: { body?: string } = req;
    console.log(body);
    try {
      if (Object.keys(body).length === 0) {
        return handleError({res, msg: '欄位填寫錯誤！'});
      }
      const post: PostInterface = await Posts.findByIdAndUpdate(id, body, { new: true } ); 
      // { new: true } 的設定表示回傳的物件為更新過的內容。 預設值為 false 表示回傳的物件為更新前的內容
      if ( post ) return handleSuccess<PostInterface>(res, post);
    } catch (error) {
      console.log('catch');
      console.log(error);
      handleError({res});
    }
  }
}
