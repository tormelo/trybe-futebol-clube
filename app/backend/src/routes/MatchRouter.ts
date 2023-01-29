import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const MatchRouter = Router();

MatchRouter.get(
  '/',
  (req, res, next) => MatchController.getAll(req, res, next),
);

export default MatchRouter;
