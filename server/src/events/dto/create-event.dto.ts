import { IsString, IsDateString, IsEnum } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsDateString()
  start: string;

  @IsDateString()
  end: string;

  @IsString()
  description: string;

  @IsEnum(['normal', 'important', 'critical'])
  importance: 'normal' | 'important' | 'critical';
}