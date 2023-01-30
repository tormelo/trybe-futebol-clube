import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const LeaderboardRouter = Router();

LeaderboardRouter.get(
  '/home',
  (req, res, next) => LeaderboardController.getHomeLeaderboard(req, res, next),
);

LeaderboardRouter.get(
  '/away',
  (req, res, next) => LeaderboardController.getAwayLeaderboard(req, res, next),
);

LeaderboardRouter.get(
  '/',
  (req, res, next) => LeaderboardController.getLeaderboard(req, res, next),
);

export default LeaderboardRouter;
