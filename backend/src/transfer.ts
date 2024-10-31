import fs from 'fs';
import csv from 'csv-parser';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface RecipeData {
  Name: string;
  AuthorName: string;
  CookTime: string;
  PrepTime: string;
  TotalTime: string;
  DatePublished: string;
  Description: string;
  RecipeCategory: string;
  Keywords: string;
  ReviewCount: string;
  AggregatedRating: string;
  Calories: string;  
  FatContent: string;
  SaturatedFatContent: string;
  CholesterolContent: string;
  SodiumContent: string;
  CarbohydrateContent: string;
  FiberContent: string;
  SugarContent: string;
  ProteinContent: string;
  RecipeServings: string;
  RecipeIngredientParts: string;
  RecipeIngredientQuantities: string;
  RecipeInstructions: string;
}

async function insertRecipes() {
  const stream = fs.createReadStream('D:/Codes/recipe/Dataset.csv').pipe(csv());

  for await (const row of stream) {
    const recipeData: RecipeData = row;

    try {
      const recipe = await prisma.recipe.create({
        data: {
          name: recipeData.Name,
          author: recipeData.AuthorName,
          cookTime: recipeData.CookTime,
          prepTime: recipeData.PrepTime,
          totalTime: recipeData.TotalTime,
          datePublished: recipeData.DatePublished,
          description: recipeData.Description,
          category: recipeData.RecipeCategory,
          keywords: recipeData.Keywords,
          reviewCount: parseInt(recipeData.ReviewCount) || 0,
          review: parseFloat(recipeData.AggregatedRating) || 0,
          servings: parseInt(recipeData.RecipeServings) || 0,
          ingredients: recipeData.RecipeIngredientParts.split(','),
          quantities: recipeData.RecipeIngredientQuantities.split(','),
          Calories: parseFloat(recipeData.Calories) || 0,
          FatContent: parseFloat(recipeData.FatContent) || 0,
          SaturatedFatContent: parseFloat(recipeData.SaturatedFatContent) || 0,
          CholesterolContent: parseFloat(recipeData.CholesterolContent) || 0,
          SodiumContent: parseFloat(recipeData.SodiumContent) || 0,
          CarbohydrateContent: parseFloat(recipeData.CarbohydrateContent) || 0,
          FiberContent: parseFloat(recipeData.FiberContent) || 0,
          SugarContent: parseFloat(recipeData.SugarContent) || 0,
          ProteinContent: parseFloat(recipeData.ProteinContent) || 0,
          recipeInstructions: recipeData.RecipeInstructions,
        },
      });

      console.log(`Inserted recipe: ${recipe.name}`);
    } catch (error) {
      console.error(`Failed to insert recipe: ${recipeData.Name}`, error);
    }
  }
}

insertRecipes()
  .catch((error) => {
    console.error('Error processing CSV:', error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
