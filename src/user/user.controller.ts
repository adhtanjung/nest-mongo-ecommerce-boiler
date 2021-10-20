import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import * as argon2 from 'argon2';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/enum/role.enum';
import { RolesGuard } from 'src/guard/roles.guards';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Get()
  async index() {
    return await this.service.findAll();
  }

  @Get(':id')
  async find(@Param('id') id: string) {
    try {
      const res = await this.service.findOne(id);
      return res;
    } catch (err) {
      throw new HttpException('User tidak ditemukan', HttpStatus.NOT_FOUND);
    }
  }
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const res = (await this.service.create({
        ...createUserDto,
        password: await argon2.hash(createUserDto.password),
      })) as CreateUserDto;
      return {
        username: res.username,
        email: res.email,
        name: res.name ?? '',
        phone: res.phone ?? '',
        roles: res.role ?? '',
      };
    } catch (err) {
      throw new HttpException(
        'Terjadi Kesalahan',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.service.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.service.delete(id);
  }

  //   @Post('login')
  //   async login(@Body() loginUserDto: LoginUserDto) {
  //     try {
  //       const res = await this.service.login(loginUserDto.username);
  //       const checkPass = await argon2.verify(
  //         res.password,
  //         loginUserDto.password,
  //       );
  //       if (checkPass) {
  //         return {
  //           email: res.email,
  //           username: res.username,
  //         };
  //       } else {
  //         throw new HttpException(
  //           'Username atau Password tidak sesuai',
  //           HttpStatus.NOT_FOUND,
  //         );
  //       }
  //     } catch (err) {
  //       throw new HttpException(err.message, err.status);
  //     }
  //   }
}
