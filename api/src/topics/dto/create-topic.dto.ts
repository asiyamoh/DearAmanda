import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateTopicDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  prompt: string;
}
