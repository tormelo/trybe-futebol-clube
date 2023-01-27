import * as bcrypt from 'bcryptjs';
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
}

export default LoginService;
