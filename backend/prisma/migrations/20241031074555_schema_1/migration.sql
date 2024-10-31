-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "recipes" INTEGER[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipe" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "cookTime" TEXT NOT NULL,
    "prepTime" TEXT NOT NULL,
    "totalTime" TEXT NOT NULL,
    "datePublished" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "keywords" TEXT NOT NULL,
    "reviewCount" INTEGER NOT NULL,
    "review" DOUBLE PRECISION NOT NULL,
    "servings" INTEGER NOT NULL,
    "ingredients" TEXT[],
    "quantities" TEXT[],
    "Calories" DOUBLE PRECISION NOT NULL,
    "FatContent" DOUBLE PRECISION NOT NULL,
    "SaturatedFatContent" DOUBLE PRECISION NOT NULL,
    "CholesterolContent" DOUBLE PRECISION NOT NULL,
    "SodiumContent" DOUBLE PRECISION NOT NULL,
    "CarbohydrateContent" DOUBLE PRECISION NOT NULL,
    "FiberContent" DOUBLE PRECISION NOT NULL,
    "SugarContent" DOUBLE PRECISION NOT NULL,
    "ProteinContent" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Recipe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ingredients" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "recipe_id" INTEGER NOT NULL,

    CONSTRAINT "Ingredients_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Recipe_name_key" ON "Recipe"("name");

-- AddForeignKey
ALTER TABLE "Ingredients" ADD CONSTRAINT "Ingredients_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "Recipe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
