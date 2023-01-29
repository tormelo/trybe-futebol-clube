import { NextFunction, Request, Response } from 'express';
import MatchService from '../services/MatchService';

class MatchController {
  static async getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const response = await MatchService.getAll();
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}

export default MatchController;
