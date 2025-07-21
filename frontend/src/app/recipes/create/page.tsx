"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { CreateRecipeData } from "@/types/recipe";

import { recipeApi } from "@/lib/services/recipeApi";
import RecipeForm from "./components/RecipeForm";
import BackButton from "@/components/ui/BackButton";

export default function CreateRecipePage() {
  const router = useRouter();

  const createRecipe = useMutation({
    mutationFn: recipeApi.createRecipe,
    onSuccess: (recipe) => {
      router.push(`/recipes/${recipe.id}`);
    },
  });

  const handleSubmit = (data: CreateRecipeData) => {
    createRecipe.mutate(data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BackButton />
        <div className="mb-8">
          <h1 className="text-xl font-bold text-gray-900">Create New Recipe</h1>
        </div>

        <RecipeForm
          onSubmit={handleSubmit}
          isLoading={createRecipe.isPending}
        />
      </div>
    </div>
  );
}
