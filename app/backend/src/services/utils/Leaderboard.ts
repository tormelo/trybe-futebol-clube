import ILeaderboardMatch from '../../interfaces/ILeaderboardMatch';

class Leaderboard {
  private static getTotalGames(matches: ILeaderboardMatch[]): number {
    return matches.length;
  }
}

export default Leaderboard;
