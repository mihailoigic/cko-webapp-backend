import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  public firstName: string;

  @IsString()
  @IsNotEmpty()
  public secondName: string;

  @IsEmail()
  public email: string;

  @IsEmail()
  public newEmail: string;
}