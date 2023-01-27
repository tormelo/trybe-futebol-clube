import { NextFunction, Request, Response } from 'express';
import LoginService from '../services/LoginService';

class LoginController {
  constructor(private readonly _service: LoginService) {}

  async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const response = await this._service.login(req.body);
      res.status(200).send({ token: response });
    } catch (error) {
      next(error);
    }
  }

  async validate(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const response = await this._service.validate(req.headers.authorization as string);
      res.status(200).send({ role: response });
    } catch (error) {
      next(error);
    }
  }
}

export default LoginController;
