import { RecipeCard } from "./components/recipeCard";
import { createOptionElement, SelectMap } from "./components/select";
import {
  RECIPES,
  selectedOptions,
  setSearch,
  suggestedRecipe,
} from "./constants";
import { debounce } from "./utils";

const searchRecipeInput = document.getElementById("search-recipe");
const recipesContainer = document.getElementById("result-container");
const recipeCount = document.getElementById("recipe-count");
const emptyResult = document.getElementById("empty-result");

/**
 * Initialize search recipes functionality
 */
function searchRecipes() {
  searchRecipeInput.addEventListener(
    "input",
    debounce(handleSearchRecipes, 200),
  );

  handleClearSearchRecipe();
}

const handleClearSearchRecipe = () => {
  searchRecipeInput
    .querySelector("input")
    .addEventListener("inputCleared", () => {
      recipesFiltered("");
    });
};

/**
 * Handle search recipes input
 * @param {Event} e
 * @returns
 */
function handleSearchRecipes(e) {
  const { value } = e.target;
  if (value.length === 0) recipesFiltered(value);
  if (value.length < 3) return;
  recipesFiltered(value);
}

/**
 * Filter recipes based on search input
 * @param {string} search
 */
function recipesFiltered(search) {
  setSearch(search);
  const filteredRecipes = RECIPES.bySearch(search).byTags(selectedOptions); // filtered recipes
  setSelectOptions(filteredRecipes); // update select options based on filtered recipes
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
 * @param {Array} recipes
 */
function setSelectOptions(recipes) {
  const selectsOptions = recipes.optionsList();

  Object.entries(selectsOptions).forEach(([k, v]) => {
    const optionsContainer = document.querySelector(`#select-${k} .options`); // select options container
    const selectedOptionsContainer = document.querySelector(
      `#select-${k} .selected-options`,
    ); // selected options container
    const currentOptions = optionsContainer.querySelectorAll("li");
    Array.from(currentOptions).forEach((option) => {
      const button = option.querySelector("button");
      const listeners = SelectMap.get(button);
      if (listeners) {
        listeners.removeElement();
      }
    }); // clear current options
    const options = [...v].map((o) => ({ label: o, value: o })); // format options
    const optionsFragment = createOptionElement(
      selectedOptionsContainer,
      options,
    ); // create option elements
    optionsContainer.appendChild(optionsFragment); // append new options
  });
}

/**
 * Update recipes container with current RECIPES
 */
const updateRecipesContainer = (recipes) => {
  const fragment = document.createDocumentFragment();
  recipes.forEach((recipe) => {
    const recipeCard = RecipeCard({ recipe });
    fragment.appendChild(recipeCard);
  });
  // on vide le container avant d'ajouter les recettes filtrées
  recipesContainer.innerHTML = "";
  // on ajoute les recettes filtrées
  recipesContainer.appendChild(fragment);
  // on met à jour le nombre de recettes affichées
  recipeCount.textContent = `${recipes.length} ${"recette".toPlural(
    recipes.length,
    "recette",
    "recettes",
  )}`;
  if (recipes.length === 0) {
    // on affiche le message de résultat vide avec une suggestion
    const text = `Aucune recette ne contient ${"search"}, vous pouvez chercher ${suggestedRecipe.name}`; // à remplacer par une suggestion pertinente
    emptyResult.textContent = text;
    emptyResult.classList.remove("hidden");
  } else if (emptyResult.classList.contains("hidden") === false) {
    // on cache le message de résultat vide
    emptyResult.classList.add("hidden");
  }
};

export { searchRecipes, setSelectOptions, updateRecipesContainer };
