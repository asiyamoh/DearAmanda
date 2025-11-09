import { IsString, IsNotEmpty, IsUUID, IsArray } from 'class-validator';

export class CreateComplimentDto {
  @IsUUID()
  @IsNotEmpty()
  topicId: string;

  @IsString()
  @IsNotEmpty()
  content: string;
}

export class CreateComplimentsDto {
  @IsUUID()
  @IsNotEmpty()
  topicId: string;

  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  contents: string[];
}
