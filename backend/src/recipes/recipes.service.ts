import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { Rating } from './entities/rating.entity';
import { CreateRecipeDto } from './dtos/create-recipe.dto';
import { RecipeQueryDto } from './dtos/recipe-query.dto';

@Injectable()
export class RecipesService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
    @InjectRepository(Rating)
    private ratingRepository: Repository<Rating>,
  ) {}

  async create(
    createRecipeDto: CreateRecipeDto,
    userId: string,
  ): Promise<Recipe> {
    const recipe = this.recipeRepository.create({
      ...createRecipeDto,
      userId,
    });

    const savedRecipe = await this.recipeRepository.save(recipe);
    return this.findOne(savedRecipe.id);
  }

  async findAll(query: RecipeQueryDto): Promise<Recipe[]> {
    const queryBuilder = this.recipeRepository
      .createQueryBuilder('recipe')
      .select([
        'recipe.id',
        'recipe.title',
        'recipe.description',
        'recipe.ingredients',
        'recipe.instructions',
        'recipe.cookTime',
        'recipe.imageUrl',
        'recipe.averageRating',
        'recipe.totalRatings',
      ]);

    if (query.search) {
      queryBuilder.andWhere(
        '(recipe.title ILIKE :search OR recipe.description ILIKE :search)',
        { search: `%${query.search}%` },
      );
    }

    return await queryBuilder.getMany();
  }

  async findUserRecipes(userId: string): Promise<Recipe[]> {
    return await this.recipeRepository
      .createQueryBuilder('recipe')
      .where('recipe.userId = :userId', { userId })
      .getMany();
  }

  async findOne(id: string): Promise<Recipe> {
    const recipe = await this.recipeRepository
      .createQueryBuilder('recipe')
      .where('recipe.id = :id', { id })
      .getOne();

    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    return recipe;
  }

  async rateRecipe(
    recipeId: string,
    userId: string,
    rating: number,
  ): Promise<Rating> {
    const recipe = await this.recipeRepository.findOne({
      where: { id: recipeId },
    });
    if (!recipe) {
      throw new NotFoundException('Recipe not found');
    }

    let existingRating = await this.ratingRepository.findOne({
      where: { recipeId, userId },
    });

    if (existingRating) {
      existingRating.rating = rating;
      await this.ratingRepository.save(existingRating);
    } else {
      existingRating = this.ratingRepository.create({
        recipeId,
        userId,
        rating,
      });
      await this.ratingRepository.save(existingRating);
    }

    await this.updateRecipeRating(recipeId);

    return existingRating;
  }

  async getUserRating(
    recipeId: string,
    userId: string,
  ): Promise<Rating | null> {
    return this.ratingRepository.findOne({
      where: { recipeId, userId },
    });
  }

  private async updateRecipeRating(recipeId: string): Promise<void> {
    const result = await this.ratingRepository
      .createQueryBuilder('rating')
      .select('AVG(rating)', 'average')
      .addSelect('COUNT(*)', 'count')
      .where('rating.recipeId = :recipeId', { recipeId })
      .getRawOne();

    const averageRating = parseFloat(result.average) || 0;
    const totalRatings = parseInt(result.count) || 0;

    await this.recipeRepository.update(recipeId, {
      averageRating,
      totalRatings,
    });
  }
}
