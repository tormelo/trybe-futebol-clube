import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { allTeamsMock } from './mocks/team.mock';
import Match from '../database/models/Match';
import { validMatchBody, matchBodySuccess, unfilteredMatches, duplicateMatchBody } from './mocks/match.mock';
import IMatch from '../interfaces/IMatch';
import Auth from '../auth/Auth';
import ITokenPayload from '../interfaces/ITokenPayload';
import Team from '../database/models/Team';

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

describe('Para validação de token', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar status 401 se não for informada token', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/matches')
      .send(validMatchBody)
    
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.deep.equal({message:'Token must be a valid token'});
  });

  it('deve retornar status 401 se informado token inválido', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/matches')
      .set('authorization', 'invalid-token')
      .send(validMatchBody)
    
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.deep.equal({message:'Token must be a valid token'});
  });
});

describe('Para endpoint POST /matches', () => {
  afterEach(() => {
    sinon.restore();
  });

  const auth = new Auth();
  const tokenPayload: ITokenPayload = {id: 1, email: "user@user.com"};
  const token = auth.createToken(tokenPayload);

  it('deve retornar status 201 e dados da partida em caso de sucesso', async () => {
    sinon
      .stub(Team, "findOne")
      .resolves(allTeamsMock[0] as unknown as Team);
    
    sinon
      .stub(Match, "create")
      .resolves(matchBodySuccess as unknown as Match);
    
    
    const httpResponse = await chai
      .request(app)
      .post('/matches')
      .set('authorization', token)
      .send(validMatchBody)
    
    expect(httpResponse.status).to.equal(201);
    expect(httpResponse.body).to.deep.equal(matchBodySuccess);
  });

  it('deve retornar status 422 em caso de homeTeamId e awayTeamId iguais', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/matches')
      .set('authorization', token)
      .send(duplicateMatchBody)
    
    expect(httpResponse.status).to.equal(422);
    expect(httpResponse.body).to.deep.equal({message:'It is not possible to create a match with two equal teams'});
  });

  it('deve retornar status 404 se algum id informado não existir', async () => {
    sinon
      .stub(Team, "findOne")
      .resolves(undefined);
    
    const httpResponse = await chai
      .request(app)
      .post('/matches')
      .set('authorization', token)
      .send(validMatchBody)
    
    expect(httpResponse.status).to.equal(404);
    expect(httpResponse.body).to.deep.equal({message:'There is no team with such id!'});
  });
});

describe('Para endpoint PATCH /matches/:id/finish', () => {
  afterEach(() => {
    sinon.restore();
  });

  const auth = new Auth();
  const tokenPayload: ITokenPayload = {id: 1, email: "user@user.com"};
  const token = auth.createToken(tokenPayload);

  it('deve retornar status 200 em caso de sucesso', async () => {
    sinon
      .stub(Match, "update")
      .resolves([1]);
    
    const httpResponse = await chai
      .request(app)
      .patch('/matches/1/finish')
      .set('authorization', token)
    
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.deep.equal({message: 'Finished'});
  });
});
