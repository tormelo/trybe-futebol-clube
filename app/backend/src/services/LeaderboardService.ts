import ILeaderboardTeam from '../interfaces/ILeaderboardTeam';
import Leaderboard from './utils/Leaderboard';
import ILeaderboardModel from '../interfaces/ILeaderboardModel';
import Match from '../database/models/Match';
import Team from '../database/models/Team';

class LeaderboardService {
  static async getHomeLeaderboard(): Promise<ILeaderboardTeam[]> {
    const teams = await Team.findAll({
      attributes: [['team_name', 'teamName']],
      include: [{
        model: Match,
        as: 'homeMatches',
        attributes: [['home_team_goals', 'goalsFavor'], ['away_team_goals', 'goalsOwn']],
        where: { inProgress: false } }],
    });

    const teamsJSON = JSON.stringify(teams);
    const teamMatches = JSON.parse(teamsJSON) as ILeaderboardModel[];

    const leaderboard = Leaderboard.getHomeLeaderboard(teamMatches);

    return leaderboard;
  }
}

export default LeaderboardService;
