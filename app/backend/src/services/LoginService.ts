import * as bcrypt from 'bcryptjs';
import IUser from '../interfaces/IUser';
import ITokenPayload from '../interfaces/ITokenPayload';
import Auth from '../auth/Auth';
import User from '../database/models/User';
import IUserCredentials from '../interfaces/IUserCredentials';
import HttpException from '../exceptions/HttpException';

class LoginService {
  private auth = new Auth();

  async login(credentials: IUserCredentials): Promise<string> {
    const { email, password } = credentials;

    const user = await User.findOne({ where: { email } });

    if (!user || !bcrypt.compareSync(password, user.password)) {
      throw new HttpException(401, 'Incorrect email or password');
    }

    console.log(user);

    const payload: ITokenPayload = {
      id: user.id,
      email: user.email,
    };

    const token = this.auth.createToken(payload);

    return token;
  }

  async validate(token: string): Promise<string> {
    const { email } = this.auth.verifyToken(token) as ITokenPayload;

    const user = await User.findOne({ where: { email } }) as IUser;

    console.log(user);

    return user.role;
  }
}

export default LoginService;
