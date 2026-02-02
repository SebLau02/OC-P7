import { setDataRecipes, setRecipes } from "./constants";
import { getRecipes } from "./fetchData";
import { renderCardContainer } from "./utils/utils";

const emptyResult = document.getElementById("empty-result");

async function IndexRecipes() {
  const recipes = await getRecipes();
  setDataRecipes(recipes);
  setRecipes(recipes);
  renderCardContainer();
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

export { IndexRecipes };
