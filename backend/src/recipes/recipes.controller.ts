import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { RecipesService } from './recipes.service';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { RateRecipeDto } from './dtos/rate-recipe.dto';
import { RecipeQueryDto } from './dtos/recipe-query.dto';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwt-auth.guard';

@Controller('recipes')
@UseGuards(JwtAuthGuard)
export class RecipesController {
  constructor(private readonly recipesService: RecipesService) {}

  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto, @Request() req) {
    return this.recipesService.create(createRecipeDto, req.user.id);
  }

  @Get()
  findAll(@Query() query: RecipeQueryDto) {
    return this.recipesService.findAll(query);
  }

  @Get('my')
  findUserRecipes(@Request() req) {
    return this.recipesService.findUserRecipes(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipesService.findOne(id);
  }

  @Post(':id/rate')
  rateRecipe(
    @Param('id') id: string,
    @Body() rateRecipeDto: RateRecipeDto,
    @Request() req,
  ) {
    return this.recipesService.rateRecipe(
      id,
      req.user.id,
      rateRecipeDto.rating,
    );
  }

  @Get(':id/rating')
  getUserRating(@Param('id') id: string, @Request() req) {
    return this.recipesService.getUserRating(id, req.user.id);
  }
}
