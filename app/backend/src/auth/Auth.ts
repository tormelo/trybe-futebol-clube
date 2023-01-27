import * as jwt from 'jsonwebtoken';
import ITokenPayload from '../interfaces/ITokenPayload';

class Auth {
  private secret: jwt.Secret;
  private config: jwt.SignOptions;

  constructor() {
    this.secret = process.env.JWT_SECRET || 'jwt_secret';
    this.config = {
      expiresIn: '1h',
    };
  }

  public createToken(payload: ITokenPayload): string {
    const token = jwt.sign(payload, this.secret, this.config);
    return token;
  }

  public verifyToken(token: string) {
    const payload = jwt.verify(token, this.secret);
    return payload;
  }
}

export default Auth;
