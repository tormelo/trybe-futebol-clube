import Team from '../database/models/Team';
import ITeam from '../interfaces/ITeam';

class TeamService {
  static async getAll(): Promise<ITeam[]> {
    const teams = await Team.findAll();
    return teams as ITeam[];
  }

  static async getById(id: string): Promise<ITeam> {
    const team = await Team.findOne({ where: { id } });
    return team as ITeam;
  }
}

export default TeamService;
