import { Router } from 'express';
import CommentController from '../controllers/CommentController';
import AuthMiddleware from '../middlewares/AuthMiddleware';

const CommentRouter = Router();

CommentRouter.use(AuthMiddleware.userHasToken);

CommentRouter.get(
  '/api/comments',
  AuthMiddleware.userHasToken,
  CommentController.listComments
);

CommentRouter.post(
  '/api/comment',
  AuthMiddleware.userHasToken,
  CommentController.createComment
);

CommentRouter.patch(
  '/api/comment/:id',
  AuthMiddleware.userHasToken,
  CommentController.updateComment
);

CommentRouter.delete(
  '/api/comment/:id',
  AuthMiddleware.userHasToken,
  CommentController.deleteComment
);

export default CommentRouter;
