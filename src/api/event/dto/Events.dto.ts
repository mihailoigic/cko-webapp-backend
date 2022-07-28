import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class EventsDto {
  @IsNumber()
  @IsNotEmpty()
  public page: number;
}