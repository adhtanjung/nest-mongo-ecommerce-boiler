import { ApiProperty } from '@nestjs/swagger';

export class BaseUserDto {
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  email: string;
  @ApiProperty()
  name?: string;
  @ApiProperty()
  phone?: string;

  role?: string;
}
