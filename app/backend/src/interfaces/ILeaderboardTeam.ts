import ILeaderboardGoals from './ILeaderboardGoals';
import ILeaderboardResults from './ILeaderboardResults';

interface ILeaderboardTeam extends ILeaderboardGoals, ILeaderboardResults{
  name: string,
  totalPoints: number,
  totalGames: number,
  efficiency: string
}

export default ILeaderboardTeam;
