import { NextFunction, Request, Response } from 'express';
import HttpException from '../exceptions/HttpException';

const credentialsMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;

  if (!email || !password) throw new HttpException(400, 'All fields must be filled');

  return next();
};

export default credentialsMiddleware;
