import { NextFunction, Request, Response } from 'express';
import { validateHash } from '../utils/BcryptUtils';

class AuthMiddlewares {
  constructor() {}

  async userHasToken(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization) {
      return res.json({
        status: 401,
        message: 'Token não fornecido',
      });
    }

    if (await validateHash(req.body.password, req.headers.authorization)) {
      next();
    } else {
      return res.json({
        status: 401,
        message: 'Token invalido',
      });
    }
  }
}

export default new AuthMiddlewares();
