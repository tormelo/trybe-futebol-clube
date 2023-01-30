import IMatchScores from './IMatchScores';

interface IMatchBody extends IMatchScores{
  id?: number,
  inProgress?: boolean,
  homeTeamId: number,
  awayTeamId: number,
}

export default IMatchBody;
