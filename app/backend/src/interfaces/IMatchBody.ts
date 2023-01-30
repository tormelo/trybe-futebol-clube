interface IMatchBody {
  id?: number,
  homeTeamGoals: number,
  awayTeamGoals: number,
  inProgress?: boolean,
  homeTeamId: number,
  awayTeamId: number,
}

export default IMatchBody;
