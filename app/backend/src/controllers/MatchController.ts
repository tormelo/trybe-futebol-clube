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

  static async registerMatch(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const response = await MatchService.registerMatch(req.body);
      res.status(201).send(response);
    } catch (error) {
      next(error);
    }
  }

  static async finishMatch(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> {
    try {
      const { id } = req.params;
      await MatchService.finishMatch(Number(id));
      res.status(200).send({ message: 'Finished' });
    } catch (error) {
      next(error);
    }
  }
}

export default MatchController;
