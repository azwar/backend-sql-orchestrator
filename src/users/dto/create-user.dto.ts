import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  Uid: number;

  @IsNotEmpty()
  Username: string;

  @IsNotEmpty()
  City: string;

  Friend: number;
}
