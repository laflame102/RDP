import {
  Recipe,
  CreateRecipeData,
  Rating,
  RecipeFilters,
} from "@/types/recipe";
import { api } from "../api";

export const recipeApi = {
  getRecipes: async (filters?: RecipeFilters): Promise<Recipe[]> => {
    const params = new URLSearchParams();
    if (filters?.search) params.append("search", filters.search);
    const response = await api.get(`/recipes?${params}`);
    return response.data;
  },

  getMyRecipes: async (): Promise<Recipe[]> => {
    const response = await api.get("/recipes/my");
    return response.data;
  },

  getRecipe: async (id: string): Promise<Recipe> => {
    const response = await api.get(`/recipes/${id}`);
    return response.data;
  },

  createRecipe: async (data: CreateRecipeData): Promise<Recipe> => {
    const response = await api.post("/recipes", data);
    return response.data;
  },

  updateRecipe: async (
    id: string,
    data: Partial<CreateRecipeData>
  ): Promise<Recipe> => {
    const response = await api.patch(`/recipes/${id}`, data);
    return response.data;
  },

  rateRecipe: async (recipeId: string, rating: number): Promise<Rating> => {
    const response = await api.post(`/recipes/${recipeId}/rate`, { rating });
    return response.data;
  },

  getUserRating: async (recipeId: string): Promise<Rating | null> => {
    try {
      const response = await api.get(`/recipes/${recipeId}/rating`);
      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
