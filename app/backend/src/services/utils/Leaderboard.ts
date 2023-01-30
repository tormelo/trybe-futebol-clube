import ILeaderboardModel from '../../interfaces/ILeaderboardModel';
import ILeaderboardGoals from '../../interfaces/ILeaderboardGoals';
import ILeaderboardMatch from '../../interfaces/ILeaderboardMatch';
import ILeaderboardResults from '../../interfaces/ILeaderboardResults';
import ILeaderboardTeam from '../../interfaces/ILeaderboardTeam';

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

  private static getLeaderboardTeam(name: string, matches: ILeaderboardMatch[]): ILeaderboardTeam {
    const totalGames = this.getTotalGames(matches);
    const results = this.getResults(matches);
    const totalPoints = this.getPoints(results);
    const goals = this.getGoals(matches);
    const efficiency = this.getEfficiency(totalPoints, totalGames);

    return {
      name,
      totalPoints,
      totalGames,
      ...results,
      ...goals,
      efficiency,
    };
  }

  private static sortLeaderboard(leaderboard: ILeaderboardTeam[]): ILeaderboardTeam[] {
    const sortedLeaderboard = leaderboard
      .sort((a, b) => {
        let diff = b.totalPoints - a.totalPoints;
        if (diff === 0) diff = b.goalsBalance - a.goalsBalance;
        if (diff === 0) diff = b.goalsFavor - a.goalsFavor;
        if (diff === 0) diff = a.goalsOwn - b.goalsOwn;
        return diff;
      });

    return sortedLeaderboard;
  }

  public static getHomeLeaderboard(teams: ILeaderboardModel[]): ILeaderboardTeam[] {
    const leaderboard = teams
      .map(({ teamName, homeMatches }) => this
        .getLeaderboardTeam(teamName, homeMatches as ILeaderboardMatch[]));
    return this.sortLeaderboard(leaderboard);
  }

  public static getAwayLeaderboard(teams: ILeaderboardModel[]): ILeaderboardTeam[] {
    const leaderboard = teams
      .map(({ teamName, awayMatches }) => this
        .getLeaderboardTeam(teamName, awayMatches as ILeaderboardMatch[]));
    return this.sortLeaderboard(leaderboard);
  }
}

export default Leaderboard;
