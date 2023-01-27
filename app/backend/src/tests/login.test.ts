import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import User from '../database/models/User';

chai.use(chaiHttp);

const { expect } = chai;

describe('Para endpoint POST /login', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar status 200 em caso de sucesso', async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        id: 2,
        username: 'User',
        role: 'user',
        email: 'user@user.com',
        password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
      } as User);
    
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'user@user.com',
        password: 'secret_user'
      })
    
    expect(httpResponse.status).to.equal(200);
    expect(httpResponse.body).to.have.key('token');
  });

  it('deve retornar status 401 caso email seja inválido', async () => {
    sinon
      .stub(User, "findOne")
      .resolves(null);
    
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'invalid-user@user.com',
        password: 'secret_user'
      })
    
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.deep.equal({message: 'Incorrect email or password'});
  });

  it('deve retornar status 401 caso senha seja inválida', async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        id: 2,
        username: 'User',
        role: 'user',
        email: 'user@user.com',
        password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
      } as User);
    
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'user@user.com',
        password: 'invalid_secret_user'
      })
    
    expect(httpResponse.status).to.equal(401);
    expect(httpResponse.body).to.deep.equal({message: 'Incorrect email or password'});
  });

  it('deve retornar status 400 caso email não seja informado', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        password: 'secret_user'
      })
    
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.deep.equal({message: 'All fields must be filled'});
  });

  it('deve retornar status 400 caso senha não seja informada', async () => {
    const httpResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'user@user.com',
      })
    
    expect(httpResponse.status).to.equal(400);
    expect(httpResponse.body).to.deep.equal({message: 'All fields must be filled'});
  });
});

describe('Para endpoint get /login/validate', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('deve retornar status 200 em caso de sucesso', async () => {
    sinon
      .stub(User, "findOne")
      .resolves({
        id: 2,
        username: 'User',
        role: 'user',
        email: 'user@user.com',
        password: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO'
      } as User);
    
    const loginResponse = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'user@user.com',
        password: 'secret_user'
      })
    
    const validateResponse = await chai
      .request(app)
      .get('/login/validate')
      .set('authorization', loginResponse.body.token)
    
    expect(validateResponse.status).to.equal(200);
    expect(validateResponse.body).to.deep.equal({role: 'user'});
  });
});
