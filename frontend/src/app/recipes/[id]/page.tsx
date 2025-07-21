"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Star, Clock, ChefHat } from "lucide-react";
import Image from "next/image";
import { recipeApi } from "@/lib/services/recipeApi";
import { useParams } from "next/navigation";
import BackButton from "@/components/ui/BackButton";

const STARS = [1, 2, 3, 4, 5];

export default function RecipeDetailPage() {
  const params = useParams();
  const { id } = params;
  const queryClient = useQueryClient();
  const [userRating, setUserRating] = useState<number>(0);

  const { data: recipe, isLoading } = useQuery({
    queryKey: ["recipe", id],
    queryFn: () => recipeApi.getRecipe(id as string),
    enabled: !!id,
  });

  const { data: currentUserRating } = useQuery({
    queryKey: ["userRating", id],
    queryFn: () => recipeApi.getUserRating(id as string),
    enabled: !!id,
  });

  const changeRating = useMutation({
    mutationFn: (rating: number) => recipeApi.rateRecipe(id as string, rating),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["recipe", id] });
      queryClient.invalidateQueries({ queryKey: ["userRating", id] });
    },
  });

  const handleRating = (rating: number) => {
    setUserRating(rating);
    changeRating.mutate(rating);
  };

  if (isLoading) {
    return <div className="text-center py-12">Loading...</div>;
  }
  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Recipe not found
          </h1>
        </div>
      </div>
    );
  }

  const totalTime = recipe.cookTime || 0;
  const currentRating = currentUserRating?.rating || userRating;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <BackButton />
        <div className="relative h-64 md:h-80 bg-gray-200 rounded-lg overflow-hidden mb-8">
          {recipe.imageUrl ? (
            <Image
              src={recipe.imageUrl}
              alt={recipe.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <ChefHat className="w-24 h-24 text-gray-400" />
            </div>
          )}
        </div>

        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {recipe.title}
              </h1>
            </div>
          </div>

          {recipe.description && (
            <p className="text-gray-700 mb-6">{recipe.description}</p>
          )}

          <div className="flex flex-wrap items-center gap-6 mb-6">
            {totalTime > 0 && (
              <div className="flex items-center text-gray-600">
                <Clock className="w-5 h-5 mr-2" />
                <span>{totalTime} minutes</span>
              </div>
            )}

            <div className="flex items-center">
              <div className="flex items-center mr-2">
                {STARS.map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= (recipe.averageRating || 0)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="border-t pt-6 flex items-center gap-2">
            <h3>Rate this recipe here</h3>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRating(star)}
                  className="transition-colors"
                  disabled={changeRating.isPending}
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= currentRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 hover:text-yellow-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-gray-700">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <ol className="space-y-4">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-gray-700">{instruction}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
