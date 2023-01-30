import ILeaderboardGoals from '../../interfaces/ILeaderboardGoals';
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

    matches.forEach(({ goalsFavor, goalsOwn }) => {
      if (goalsFavor > goalsOwn) results.totalVictories += 1;
      if (goalsFavor < goalsOwn) results.totalLosses += 1;
      if (goalsFavor === goalsOwn) results.totalDraws += 1;
    });

    return results;
  }

  private static getPoints(results: ILeaderboardResults): number {
    const { totalVictories, totalDraws } = results;
    return (totalVictories * 3) + totalDraws;
  }

  private static getEfficiency(totalPoints: number, totalGames: number): string {
    return ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  }

  private static getGoals(matches: ILeaderboardMatch[]): ILeaderboardGoals {
    const goals = {
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
    };

    matches.forEach(({ goalsFavor, goalsOwn }) => {
      goals.goalsFavor += goalsFavor;
      goals.goalsOwn += goalsOwn;
    });

    goals.goalsBalance = goals.goalsFavor - goals.goalsOwn;

    return goals;
  }
}

export default Leaderboard;
