import ILeaderboardMatch from '../../interfaces/ILeaderboardMatch';
import ILeaderboardResults from '../../interfaces/ILeaderboardResults';

class Leaderboard {
  private static getTotalGames(matches: ILeaderboardMatch[]): number {
    return matches.length;
  }

  private static getResults(matches: ILeaderboardMatch[]): ILeaderboardResults {
    const results = {
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
    };

    console.log(matches);
    matches.forEach(({ goalsFavor, goalsOwn }) => {
      if (goalsFavor > goalsOwn) results.totalVictories += 1;
      if (goalsFavor < goalsOwn) results.totalLosses += 1;
      if (goalsFavor === goalsOwn) results.totalDraws += 1;
    });

    return results;
  }
}

export default Leaderboard;
