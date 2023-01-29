import { NextFunction, Request, Response } from 'express';
import TeamService from '../services/TeamService';

class TeamController {
  static async getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const response = await TeamService.getAll();
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const response = await TeamService.getById(id);
      res.status(200).send(response);
    } catch (error) {
      next(error);
    }
  }
}

export default TeamController;
