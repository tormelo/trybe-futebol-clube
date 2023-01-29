import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const TeamRouter = Router();

TeamRouter.get(
  '/',
  (req, res, next) => TeamController.getAll(req, res, next),
);

TeamRouter.get(
  '/:id',
  (req, res, next) => TeamController.getById(req, res, next),
);

export default TeamRouter;
