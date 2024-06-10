import { Request, Response } from 'express';
import CommentDatabaseService from '../services/CommentDatabaseService';

class CommentController {
  constructor() {}

  async listComments(req: Request, res: Response) {
    try {
      const comments = await CommentDatabaseService.listDBComments;
      res.json({
        status: 'ok',
        comments: comments,
      });
    } catch (error) {
      console.log(error);
      res.json({
        status: 'error',
        message: error,
      });
    }
  }

  async createComment(req: Request, res: Response) {
    const { body, postId, authorId } = req.body;

    if (!body || !postId || !authorId) {
      res.json({
        status: 'error',
        message: 'Falta parâmetros',
      });
      return;
    }

    try {
      const newComment = await CommentDatabaseService.insertDBComment({
        body: body,
        post: { connect: { id: postId } },
        author: { connect: { id: authorId } },
      });
      res.json({
        status: 'ok',
        newComment: newComment,
      });
    } catch (error) {
      res.json({
        status: 'error',
        message: error,
      });
    }
  }

  async updateComment(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: 'error',
        message: 'Faltou o ID',
      });
    }

    const { body, postId, authorId } = req.body;
    if (!body || !postId || !authorId) {
      res.json({
        status: 'error',
        message: 'Falta parâmetros',
      });
      return;
    }

    try {
      const updatedComment = await CommentDatabaseService.updateDBComment(
        {
          body: body,
          post: { connect: { id: postId } },
          author: { connect: { id: authorId } },
        },
        id
      );
      res.json({
        status: 'ok',
        newComment: updatedComment,
      });
    } catch (error) {
      res.json({
        status: 'error',
        message: error,
      });
    }
  }

  async deleteComment(req: Request, res: Response) {
    const id = req.params.id;
    if (!id) {
      res.json({
        status: 'error',
        message: 'Faltou o ID',
      });
    }

    try {
      const response = await CommentDatabaseService.deleteDBComment(id);
      if (response) {
        res.json({
          status: 'ok',
          message: 'Post deletado com sucesso',
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        status: 'error',
        message: error,
      });
    }
  }
}

export default new CommentController();
