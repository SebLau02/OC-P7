import { RecipeCard } from "../components/recipeCard";
import { recipes } from "../constants";

const recipeCount = document.getElementById("recipe-count");
const recipesContainer = document.getElementById("result-container");

// Filter recipes by search value
const filterBySearch = (searchValue) => {
  const lowerCaseSearchValue = searchValue.toLowerCase();

  const filteredRecipes = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const recipeIngredientsList = recipeIngredients(recipe);

    if (
      recipe.name.toLowerCase().includes(lowerCaseSearchValue) ||
      recipe.description.toLowerCase().includes(lowerCaseSearchValue) ||
      recipeIngredientsList.some((ingredient) =>
        ingredient.includes(lowerCaseSearchValue),
      )
    )
      filteredRecipes.push(recipe);
  }
  return filteredRecipes;
};

const recipeIngredients = (recipe) => {
  let ingredientsList = [];
  for (let i = 0; i < recipe.ingredients.length; i++) {
    ingredientsList.push(recipe.ingredients[i].ingredient.toLowerCase());
  }
  return ingredientsList;
};

const createRecipesCard = (recipes) => {
  const fragment = document.createDocumentFragment();
  recipes.forEach((recipe) => {
    const recipeCard = RecipeCard({ recipe });
    fragment.appendChild(recipeCard);
  });
  return fragment;
};

const renderCardContainer = (recipes) => {
  const recipesFragment = createRecipesCard(recipes);
  recipesContainer.innerHTML = "";
  recipesContainer.appendChild(recipesFragment);
  recipeCount.textContent = `${recipes.length} recettes`;
};

export {
  filterBySearch,
  recipeIngredients,
  createRecipesCard,
  renderCardContainer,
  recipeCount,
  recipesContainer,
};
