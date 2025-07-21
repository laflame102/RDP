import { IsOptional, IsString, Min, Max } from 'class-validator';

export class RecipeQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @Min(1)
  @Max(5)
  minRating?: number;
}
