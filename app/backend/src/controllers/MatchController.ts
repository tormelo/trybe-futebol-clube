import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/MatchService';

class MatchController {
  static async getMatches(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { inProgress } = req.query;
      const response = await MatchService.getMatches(inProgress as string);
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}

export default MatchController;
