import { IsNumber, IsOptional, IsString } from 'class-validator';

export class BookmarkDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  link: string;
}

export class EditBookmarkDto {
  @IsString()
  @IsOptional()
  title: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  link: string;
}
