import { Router } from 'express';
import validateToken from '../middlewares/validateToken';
import MatchController from '../controllers/MatchController';

const MatchRouter = Router();

MatchRouter.get(
  '/',
  (req, res, next) => MatchController.getMatches(req, res, next),
);

MatchRouter.post(
  '/',
  validateToken,
  (req, res, next) => MatchController.registerMatch(req, res, next),
);

MatchRouter.patch(
  '/:id/finish',
  validateToken,
  (req, res, next) => MatchController.finishMatch(req, res, next),
);

MatchRouter.patch(
  '/:id',
  validateToken,
  (req, res, next) => MatchController.updateMatch(req, res, next),
);

export default MatchRouter;
