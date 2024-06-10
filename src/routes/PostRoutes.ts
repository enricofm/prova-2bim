import { Router } from 'express';
import PostController from '../controllers/PostController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const PostRouter = Router();

PostRouter.use(AuthMiddleware.userHasToken);

PostRouter.get(
  '/api/posts',
  AuthMiddleware.userHasToken,
  PostController.listPosts
);

PostRouter.post(
  '/api/post',
  AuthMiddleware.userHasToken,
  PostController.createPost
);

PostRouter.patch(
  '/api/post/:id',
  AuthMiddleware.userHasToken,
  PostController.updatePost
);

PostRouter.delete(
  '/api/post/:id',
  AuthMiddleware.userHasToken,
  PostController.deletePost
);

export default PostRouter;
