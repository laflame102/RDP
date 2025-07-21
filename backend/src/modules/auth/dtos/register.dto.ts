import { IsNotEmpty, Matches } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: 'Must be a valid email address',
  })
  email: string;

  @IsNotEmpty()
  password: string;
}
