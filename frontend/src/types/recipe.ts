export interface Recipe {
  id: string;
  title: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  cookTime?: number;
  servings?: number;
  imageUrl?: string;
  authorId?: string;
  authorName?: string;
  averageRating?: number;
  totalRatings?: number;
}

export interface Rating {
  id: string;
  recipeId: string;
  userId: string;
  rating: number;
  createdAt: string;
}

// export interface CreateRecipeData {
//   title: string;
//   description?: string;
//   ingredients: { value: string }[];
//   instructions: { step: string }[];
//   cookTime?: number;
//   imageUrl?: string;
// }

export interface CreateRecipeData {
  title: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  cookTime?: number;
  imageUrl?: string;
}

export interface RecipeFilters {
  search?: string;
}
