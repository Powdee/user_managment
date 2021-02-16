import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtService } from './jwt.service';
import { User } from '../entities/user';

export interface IJwtPayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  public createAccessToken(user: User): string {
    const profile: IJwtPayload = { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName };
    return this.jwtService.sign(profile);
  }

  public async validateUser(payload: IJwtPayload): Promise<User> {
    const user = this.userService.getUserById(payload.id);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
