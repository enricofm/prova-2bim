import { Request, Response } from 'express';
import AuthService from '../services/AuthService';
import { generateHash } from '../utils/BcryptUtils';
import { generateJwt } from '../utils/JwtUtilts';

class AuthController {
  constructor() {}

  async signUp(req: Request, res: Response) {
    const body = req.body;
    console.log(body);

    if (!body.email || !body.name || !body.password) {
      res.json({
        status: 'error',
        message: 'Falta parâmetros',
      });
      return;
    }

    const hashPassword = await generateHash(body.password);

    if (!hashPassword) {
      res.json({
        status: 'error',
        message: 'Erro ao criptografar senha ...',
      });
    }

    try {
      const newuser = await AuthService.signUp({
        name: body.name,
        email: body.email,
        password: hashPassword as string,
        accessToken: await generateJwt(),
      });
      res.json({
        status: 'ok',
        newuser: newuser,
      });
    } catch (error) {
      res.json({
        status: 'error',
        message: error,
      });
    }
  }

  async signIn(req: Request, res: Response) {
    const body = req.body;
  }

  async signOut() {}
}
