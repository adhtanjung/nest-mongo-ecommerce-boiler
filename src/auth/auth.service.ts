import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { BaseUserDto } from 'src/user/dto/base-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly service: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    try {
      const user = await this.service.login(username);
      const checkPass = await argon2.verify(user.password, pass);
      console.log(user);
      if (checkPass) {
        return {
          username: user.username,
          email: user.email,
          roles: user.roles,
        };
      } else {
        throw new HttpException(
          'Username atau password salah',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async login(user: BaseUserDto): Promise<any> {
    const payload = {
      username: user.username,
      email: user.email,
      name: user.name ?? '',
      phone: user.phone ?? '',
      roles: user.roles ?? '',
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
