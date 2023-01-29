import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IMatch from '../interfaces/IMatch';

class MatchService {
  static async getAll(): Promise<IMatch[]> {
    const matches = await Match.findAll({
      include: [{ model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } }],
    });
    return matches as unknown as IMatch[];
  }
}

export default MatchService;
