import { RecipeCard } from "./components/recipeCard";
import { getRecipes } from "./fetchData";

const recipesContainer = document.getElementById("result-container");
const recipeCount = document.getElementById("recipe-count");
const emptyResult = document.getElementById("empty-result");

async function recipes() {
  const recipes = await getRecipes();

  const fragment = document.createDocumentFragment();
  recipes.forEach((recipe) => {
    const recipeCard = RecipeCard({ recipe });
    fragment.appendChild(recipeCard);
  });
  recipesContainer.appendChild(fragment);
  recipeCount.textContent = `${recipes.length} recettes`;
  if (recipes.length === 0) {
    const text = emptyResult.textContent
      .replace("{{search}}", "tarte au pomme") // à remplacer par le champ de recherche
      .replace("{{suggest}}", "tarte aux fraises"); // à remplacer par une suggestion pertinente
    emptyResult.textContent = text;
    emptyResult.classList.remove("hidden");
  } else if (emptyResult.classList.contains("hidden") === false) {
    emptyResult.classList.add("hidden");
  }
}

export { recipes };
