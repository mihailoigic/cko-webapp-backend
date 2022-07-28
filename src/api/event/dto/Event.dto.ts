import { IsNotEmpty, IsString } from 'class-validator';

export class EventDto {
  @IsString()
  @IsNotEmpty()
  public eventName: string;

  @IsString()
  @IsNotEmpty()
  public description: string;

  @IsString()
  public photo: string;

  @IsString()
  @IsNotEmpty()
  public city: string;

  @IsString()
  @IsNotEmpty()
  public address: string;

  @IsString()
  @IsNotEmpty()
  public destinationName: string;

  @IsNotEmpty()
  public date: string | Date;
}