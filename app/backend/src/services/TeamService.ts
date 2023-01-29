import Team from '../database/models/Team';
import ITeam from '../interfaces/ITeam';

class TeamService {
  static async getAll(): Promise<ITeam[]> {
    const teams = await Team.findAll();
    return teams as ITeam[];
  }
}

export default TeamService;
