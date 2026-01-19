import { RecipeCard } from "./components/recipeCard";
import { createOptionElement } from "./components/select";
import { RECIPES, suggestedRecipe } from "./constants";
import { debounce } from "./utils";

const searchRecipeInput = document.getElementById("search-recipe");
const recipesContainer = document.getElementById("result-container");
const recipeCount = document.getElementById("recipe-count");
const emptyResult = document.getElementById("empty-result");

// let suggestedRecipe = {};

function searchRecipes() {
  searchRecipeInput.addEventListener(
    "input",
    debounce(handleSearchRecipes, 200),
  );
}

function handleSearchRecipes(e) {
  const { value } = e.target;
  if (value.length === 0) recipesFiltered(value);
  if (value.length < 3) return;
  recipesFiltered(value);
}

function recipesFiltered(search) {
  const filteredRecipes = RECIPES.bySearch(search);
  setSelectOptions(filteredRecipes);
  const fragment = document.createDocumentFragment();
  filteredRecipes.forEach((recipe) => {
    const recipeCard = RecipeCard({ recipe });
    fragment.appendChild(recipeCard);
  });
  // on vide le container avant d'ajouter les recettes filtrées
  recipesContainer.innerHTML = "";
  // on ajoute les recettes filtrées
  recipesContainer.appendChild(fragment);
  // on met à jour le nombre de recettes affichées
  recipeCount.textContent = `${filteredRecipes.length} ${"recette".toPlural(
    filteredRecipes.length,
    "recette",
    "recettes",
  )}`;
  if (filteredRecipes.length === 0) {
    // on affiche le message de résultat vide avec une suggestion
    const text = `Aucune recette ne contient ${search}, vous pouvez chercher ${suggestedRecipe.name}`; // à remplacer par une suggestion pertinente
    emptyResult.textContent = text;
    emptyResult.classList.remove("hidden");
  } else if (emptyResult.classList.contains("hidden") === false) {
    // on cache le message de résultat vide
    emptyResult.classList.add("hidden");
  }
}

/**
 * Set options for selects based on recipes data
 * @param {recipes list} recipes
 */
function setSelectOptions(recipes) {
  const selectsOptions = recipes.optionsList();

  Object.entries(selectsOptions).forEach(([k, v]) => {
    const optionsContainer = document.querySelector(`#select-${k} .options`);
    const selectedOptionsContainer = document.querySelector(
      `#select-${k} .selected-options`,
    );
    optionsContainer.innerHTML = "";
    const options = [...v].map((o) => ({ label: o, value: o }));
    const optionsFragment = createOptionElement(
      selectedOptionsContainer,
      options,
    );
    optionsContainer.appendChild(optionsFragment);
  });
}

export { searchRecipes, setSelectOptions };
