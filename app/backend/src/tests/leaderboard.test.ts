import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';
import { 
  allMatchesMock,
  awayLeaderboardMock,
  awayMatchesMock,
  homeLeaderboardMock,
  homeMatchesMock, 
  leaderboardMock
} from './mocks/leaderboard.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Para endpoint GET /leaderboard/home', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar status 200 e leaderboard em caso de sucesso', async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(homeMatchesMock as unknown as Team[]);
    
    const httpResponse = await chai
      .request(app)
      .get('/leaderboard/home')
    
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(homeLeaderboardMock);
  });
});

describe('Para endpoint GET /leaderboard/away', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar status 200 e leaderboard em caso de sucesso', async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(awayMatchesMock as unknown as Team[]);
    
    const httpResponse = await chai
      .request(app)
      .get('/leaderboard/away')
    
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(awayLeaderboardMock);
  });
});

describe('Para endpoint GET /leaderboard', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar status 200 e leaderboard em caso de sucesso', async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(allMatchesMock as unknown as Team[]);
    
    const httpResponse = await chai
      .request(app)
      .get('/leaderboard')
    
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(leaderboardMock);
  });
});
