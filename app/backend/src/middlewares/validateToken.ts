import { NextFunction, Request, Response } from 'express';
import Auth from '../auth/Auth';
import HttpException from '../exceptions/HttpException';

const validateToken = (req: Request, _res: Response, next: NextFunction) => {
  const token = req.headers.authorization;
  const tokenError = new HttpException(401, 'Token must be a valid token');

  if (!token) {
    // throw new HttpException(401, 'All fields must be filled');
    throw tokenError;
  }

  try {
    const auth = new Auth();
    const payload = auth.verifyToken(token);
    req.body = { ...req.body, user: payload };
    return next();
  } catch (error) {
    // throw new HttpException(401, 'Expired or invalid token');
    throw tokenError;
  }
};

export default validateToken;
