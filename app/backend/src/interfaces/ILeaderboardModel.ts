import ILeaderboardMatch from './ILeaderboardMatch';

interface ILeaderboardModel {
  teamName: string,
  homeMatches?: ILeaderboardMatch[],
  awayMatches?: ILeaderboardMatch[]
}

export default ILeaderboardModel;
