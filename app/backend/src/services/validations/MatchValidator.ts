import Team from '../../database/models/Team';
import HttpException from '../../exceptions/HttpException';
import IMatchBody from '../../interfaces/IMatchBody';

class MatchValidator {
  private static validateDuplicates(matchBody: IMatchBody): void {
    const { homeTeamId, awayTeamId } = matchBody;

    if (homeTeamId === awayTeamId) {
      throw new HttpException(422, 'It is not possible to create a match with two equal teams');
    }
  }

  private static async validateTeams(matchBody: IMatchBody): Promise<void> {
    const { homeTeamId, awayTeamId } = matchBody;

    const homeTeam = await Team.findOne({ where: { id: homeTeamId } });
    const awayTeam = await Team.findOne({ where: { id: awayTeamId } });

    if (!homeTeam || !awayTeam) {
      throw new HttpException(404, 'There is no team with such id!');
    }
  }

  public static async validate(matchBody: IMatchBody): Promise<void> {
    this.validateDuplicates(matchBody);
    await this.validateTeams(matchBody);
  }
}

export default MatchValidator;
