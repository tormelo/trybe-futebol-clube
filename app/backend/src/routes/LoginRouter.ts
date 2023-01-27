import { Router } from 'express';
import credentialsMiddleware from '../middlewares/credentialsMiddleware';
import LoginController from '../controllers/LoginController';
import LoginService from '../services/LoginService';

const LoginRouter = Router();

const loginService = new LoginService();
const loginController = new LoginController(loginService);

LoginRouter.post(
  '/',
  credentialsMiddleware,
  (req, res, next) => loginController.login(req, res, next),
);

export default LoginRouter;
