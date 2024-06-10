import { Prisma, PrismaClient } from '@prisma/client';
import { validateHash } from '../utils/BcryptUtils';
import { generateJwt } from '../utils/JwtUtilts';

const prisma = new PrismaClient();

class AuthService {
  constructor() {}

  async signIn(email: string, password: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return { status: 'error', message: 'User not found' };
      }

      const isPasswordValid = await validateHash(password, user.password);

      if (!isPasswordValid) {
        return { status: 'error', message: 'Invalid password' };
      }

      const token = generateJwt();
      await prisma.user.update({
        where: { email },
        data: { accessToken: await token },
      });

      return { status: 'ok', token };
    } catch (error) {
      console.error(error);
      return { status: 'error', message: 'SignIn failed' };
    }
  }

  async signUp(user: Prisma.UserCreateInput) {
    try {
      const newuser = await prisma.user.create({
        data: user,
      });
      return newuser;
    } catch (error) {
      console.log(error);
      return null;
    }
  }

  async signOut() {}
}

export default new AuthService();
