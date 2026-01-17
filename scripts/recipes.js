import { RecipeCard } from "./components/recipeCard";
import { RECIPES } from "./constants";
import { getRecipes } from "./fetchData";
import { setSelectOptions } from "./searchRecipes";

const recipesContainer = document.getElementById("result-container");
const recipeCount = document.getElementById("recipe-count");
const emptyResult = document.getElementById("empty-result");

async function recipes() {
  const recipes = await getRecipes();
  RECIPES.push(...recipes);
  setSelectOptions(recipes);

  const fragment = document.createDocumentFragment();
  recipes.forEach((recipe) => {
    const recipeCard = RecipeCard({ recipe });
    fragment.appendChild(recipeCard);
  });
  recipesContainer.appendChild(fragment);
  recipeCount.textContent = `${recipes.length} recettes`;
}

export { recipes };
