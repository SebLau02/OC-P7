import { RecipeCard } from "./components/recipeCard";
import { RECIPES, setRecipes } from "./constants";
import { getRecipes } from "./fetchData";
import { setSelectOptions } from "./searchRecipes";

const recipesContainer = document.getElementById("result-container");
const recipeCount = document.getElementById("recipe-count");

async function recipes() {
  const recipes = await getRecipes();
  setRecipes(recipes);

  setSelectOptions(RECIPES);

  const fragment = document.createDocumentFragment();
  recipes.forEach((recipe) => {
    const recipeCard = RecipeCard({ recipe });
    fragment.appendChild(recipeCard);
  });
  recipesContainer.appendChild(fragment);
  recipeCount.textContent = `${recipes.length} recettes`;
}

export { recipes };
