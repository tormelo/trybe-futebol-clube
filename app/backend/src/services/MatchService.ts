import IMatchBody from '../interfaces/IMatchBody';
import Team from '../database/models/Team';
import Match from '../database/models/Match';
import IMatch from '../interfaces/IMatch';
import MatchValidator from './validations/MatchValidator';

class MatchService {
  private static async getAll(): Promise<IMatch[]> {
    const matches = await Match.findAll({
      include: [{ model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } }],
    });
    return matches as unknown as IMatch[];
  }

  private static async getFiltered(inProgress: boolean): Promise<IMatch[]> {
    const matches = await Match.findAll({
      include: [{ model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } }],
      where: { inProgress },
    });
    return matches as unknown as IMatch[];
  }

  public static async getMatches(filter: string | undefined): Promise<IMatch[]> {
    let matches: IMatch[] = [];

    if (filter) matches = await MatchService.getFiltered(filter === 'true');
    else matches = await MatchService.getAll();

    return matches as unknown as IMatch[];
  }

  public static async registerMatch(matchBody: IMatchBody): Promise<IMatchBody> {
    await MatchValidator.validate(matchBody);

    const newMatchBody = { ...matchBody };
    newMatchBody.inProgress = true;

    const newMatch = await Match.create({ ...newMatchBody });

    return newMatch as unknown as IMatchBody;
  }
}

export default MatchService;
