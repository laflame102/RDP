import { IsString, IsOptional, IsArray } from 'class-validator';

export class CreateRecipeDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsArray()
  ingredients: string[];

  @IsArray()
  instructions: string[];

  @IsOptional()
  cookTime?: number;

  @IsOptional()
  imageUrl?: string;
}
