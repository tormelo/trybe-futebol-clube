import { NextFunction, Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

class LeaderboardController {
  static async getHomeLeaderboard(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const response = await LeaderboardService.getHomeLeaderboard();
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  static async getAwayLeaderboard(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const response = await LeaderboardService.getAwayLeaderboard();
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}

export default LeaderboardController;
