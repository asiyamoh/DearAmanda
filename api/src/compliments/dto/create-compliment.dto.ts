import {
  IsString,
  IsNotEmpty,
  IsUUID,
  IsArray,
  IsOptional,
  IsBoolean,
  MinLength,
} from 'class-validator';

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

export class MarkComplimentsAsUsedDto {
  @IsArray()
  @IsUUID('4', { each: true })
  @IsNotEmpty()
  ids: string[];
}

export class UpdateComplimentDto {
  @IsString()
  @IsOptional()
  @MinLength(1)
  content?: string;

  @IsBoolean()
  @IsOptional()
  used?: boolean;
}
