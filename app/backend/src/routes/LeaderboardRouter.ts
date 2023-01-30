import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const LeaderboardRouter = Router();

LeaderboardRouter.get(
  '/home',
  (req, res, next) => LeaderboardController.getHomeLeaderboard(req, res, next),
);

export default LeaderboardRouter;
