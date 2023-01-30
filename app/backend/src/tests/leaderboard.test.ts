import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';
import { homeLeaderboard, homeTeamMatches } from './mocks/leaderboard.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Para endpoint GET /leaderboard/home', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar status 200 e leaderboard em caso de sucesso', async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(homeTeamMatches as unknown as Team[]);
    
    const httpResponse = await chai
      .request(app)
      .get('/leaderboard/home')
    
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(homeLeaderboard);
  });
});