import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import Team from '../database/models/Team';
import { allTeamsMock } from './mocks/team.mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Para endpoint GET /teams', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar status 200 e dados dos times em caso de sucesso', async () => {
    sinon
      .stub(Team, "findAll")
      .resolves(allTeamsMock as Team[]);
    
    const httpResponse = await chai
      .request(app)
      .get('/teams')
    
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(allTeamsMock);
  });
});

describe('Para endpoint GET /teams:id', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar status 200 e dados do time buscado em caso de sucesso', async () => {
    sinon
      .stub(Team, "findOne")
      .resolves(allTeamsMock[0] as Team);
    
    const httpResponse = await chai
      .request(app)
      .get('/teams/1')
    
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(allTeamsMock[0]);
  });
});
