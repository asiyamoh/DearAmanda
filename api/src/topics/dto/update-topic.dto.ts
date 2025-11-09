import { IsString, IsOptional, MinLength } from 'class-validator';

export class UpdateTopicDto {
  @IsString()
  @IsOptional()
  @MinLength(2)
  name?: string;

  @IsString()
  @IsOptional()
  @MinLength(10)
  prompt?: string;
}
