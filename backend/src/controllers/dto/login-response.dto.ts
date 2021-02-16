import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty()
  readonly accessToken: string;

  @ApiProperty()
  readonly tokenType: string;

  @ApiProperty()
  readonly expiresIn: number;

  @ApiProperty()
  readonly firstName: string;

  @ApiProperty()
  readonly lastName: string;

  constructor(obj: { accessToken: string; tokenType: string; expiresIn: number, firstName: string, lastName: string }) {
    this.accessToken = obj.accessToken;
    this.tokenType = obj.tokenType;
    this.expiresIn = obj.expiresIn;
    this.firstName = obj.firstName;
    this.lastName = obj.lastName;
  }
}
