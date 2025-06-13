import { IsString, IsDateString, IsEnum, IsOptional } from 'class-validator';

export class UpdateEventDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsDateString()
  @IsOptional()
  start?: string;

  @IsDateString()
  @IsOptional()
  end?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsEnum(['normal', 'important', 'critical'])
  @IsOptional()
  importance?: 'normal' | 'important' | 'critical';
}