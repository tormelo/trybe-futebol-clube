import { Router } from 'express';
import MatchController from '../controllers/MatchController';

const MatchRouter = Router();

MatchRouter.get(
  '/',
  (req, res, next) => MatchController.getMatches(req, res, next),
);

export default MatchRouter;
