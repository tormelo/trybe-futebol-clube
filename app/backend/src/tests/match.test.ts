import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { allTeamsMock } from './mocks/team.mock';
import Match from '../database/models/Match';
import { unfilteredMatches } from './mocks/match.mock';
import IMatch from '../interfaces/IMatch';

chai.use(chaiHttp);

const { expect } = chai;

describe('Para endpoint GET /matches', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar status 200 e dados das partidas em caso de sucesso', async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(unfilteredMatches as unknown as Match[]);
    
    const httpResponse = await chai
      .request(app)
      .get('/matches')
    
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(unfilteredMatches);
  });

  it('com query inProgress=true deve retornar status 200 e partidas em andamento', async () => {
    const filteredMatches = unfilteredMatches.filter(({inProgress}) => inProgress === true);
    
    sinon
      .stub(Match, "findAll")
      .resolves(filteredMatches as unknown as Match[]);
    
    const httpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true')
    
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(filteredMatches);
  });

  it('com query inProgress=false deve retornar status 200 e partidas em andamento', async () => {
    const filteredMatches = unfilteredMatches.filter(({inProgress}) => inProgress === false);
    
    sinon
      .stub(Match, "findAll")
      .resolves(filteredMatches as unknown as Match[]);
    
    const httpResponse = await chai
      .request(app)
      .get('/matches?inProgress=false')
    
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal(filteredMatches);
  });
});
