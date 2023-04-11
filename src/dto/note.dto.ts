import { IsString, IsNumber } from 'class-validator';

export class NoteInput {
  @IsString()
  title: string;

  @IsString()
  body: string;

  @IsNumber()
  userId: number;
}
