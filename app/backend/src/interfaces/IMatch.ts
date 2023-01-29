import ITeam from './ITeam';

interface IMatch {
  id: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress: boolean,
  homeTeam: ITeam,
  awayTeam: ITeam,
}

export default IMatch;
