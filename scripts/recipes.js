import { RecipeCard } from "./components/recipeCard";
import { getRecipes } from "./fetchData";

const recipesContainer = document.getElementById("result-container");

async function recipes() {
  const recipes = await getRecipes();

  const fragment = document.createDocumentFragment();
  recipes.forEach((recipe) => {
    const recipeCard = RecipeCard({ recipe });
    fragment.appendChild(recipeCard);
  });
  recipesContainer.appendChild(fragment);
}

export { recipes };
