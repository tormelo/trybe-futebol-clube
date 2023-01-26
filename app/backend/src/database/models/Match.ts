import { BOOLEAN, INTEGER, Model } from 'sequelize';
import db from '.';
import Team from './Team';

class Match extends Model {
  declare id: number;
  // declare homeTeamId: number;
  declare homeTeamGoals: number;
  // declare awayTeamId: number;
  declare awayTeamGoals: number;
  declare inProgress: boolean;
}

Match.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  homeTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'matches',
  timestamps: false,
});

Team.hasMany(Match, { foreignKey: 'home_team_id', as: 'matches' });
Team.hasMany(Match, { foreignKey: 'away_team_id', as: 'matches' });

Match.belongsTo(Team, { foreignKey: 'homeTeamId', as: 'teams' });
Match.belongsTo(Team, { foreignKey: 'awayTeamId', as: 'teams' });

export default Match;
