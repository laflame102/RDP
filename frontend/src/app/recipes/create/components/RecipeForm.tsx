"use client";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Minus, Save } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { CreateRecipeData } from "@/types/recipe";

interface RecipeFormProps {
  onSubmit: (data: CreateRecipeData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<CreateRecipeData>;
}

export default function RecipeForm({
  onSubmit,
  isLoading = false,
  defaultValues,
}: RecipeFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateRecipeData>({
    defaultValues: {
      title: "",
      description: "",
      ingredients: [""],
      instructions: [""],
      cookTime: 0,
      imageUrl: "",
      ...defaultValues,
    },
  });

  const {
    fields: ingredientFields,
    append: appendIngredient,
    remove: removeIngredient,
  } = useFieldArray({
    control,
    // @ts-expect-error idk how to fix this
    name: "ingredients",
  });

  const {
    fields: instructionFields,
    append: appendInstruction,
    remove: removeInstruction,
  } = useFieldArray({
    control,
    // @ts-expect-error idk how to fix this
    name: "instructions",
  });

  const onFormSubmit = (data: CreateRecipeData) => {
    const cleanData = {
      ...data,
      ingredients: data.ingredients.filter((item) => item.trim() !== ""),
      instructions: data.instructions.filter((item) => item.trim() !== ""),
    };
    onSubmit(cleanData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-8">
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Information</h2>

        <div className="flex flex-col gap-4">
          <div>
            <Input
              type="text"
              {...register("title", {
                required: true,
              })}
              placeholder="Enter recipe title"
              label="Title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <Input
              {...register("description")}
              placeholder="Description"
              label="Description"
            />
          </div>

          <div>
            <Input
              type="url"
              {...register("imageUrl")}
              placeholder="Image link"
              label="Image link"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <Input
                type="number"
                {...register("cookTime")}
                placeholder="0"
                label="Cook Time (minutes)"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">Ingredients</h2>
          <button
            type="button"
            onClick={() => appendIngredient("")}
            className="flex items-center gap-2 text-orange-600 hover:text-orange-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Ingredient</span>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {ingredientFields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-4">
              <Input type="text" {...register(`ingredients.${index}`)} />
              {ingredientFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeIngredient(index)}
                  className="p-2 text-red-600 hover:text-red-700"
                >
                  <Minus className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl">Instructions</h2>
          <button
            type="button"
            onClick={() => appendInstruction("")}
            className="flex items-center gap-2 text-orange-600"
          >
            <Plus className="w-4 h-4" />
            <span>Add Step</span>
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {instructionFields.map((field, index) => (
            <div key={field.id} className="flex items-start">
              <div className="w-full">
                <Input {...register(`instructions.${index}`)} />
              </div>
              {instructionFields.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeInstruction(index)}
                  className="p-2 text-red-600 hover:text-red-700 mt-1"
                >
                  <Minus className="w-4 h-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading}>
          <Save className="w-4 h-4" />
          <span>{isLoading ? "Saving.." : "Create"}</span>
        </Button>
      </div>
    </form>
  );
}
