import { RecipeCard } from "../components/recipeCard";
import { cleanOptions, createSelectOptions } from "../components/select";
import {
  dataRecipes,
  filters,
  recipes,
  setFilters,
  setSuggestions,
  suggestions,
} from "../constants";
import { handleFilter } from "../filterRecipes";

const recipeCount = document.getElementById("recipe-count");
const recipesContainer = document.getElementById("result-container");
const emptyResult = document.getElementById("empty-result");

const isSomeIngredientInclude = (ref, el) => {
  let isIncluded = false;
  for (let i = 0; i < ref.length; i++) {
    if (ref[i] === el) {
      isIncluded = true;
      break;
    }
  }

  return isIncluded;
};

/**
 *
 * @param {Array} items
 * @param {string} el
 * @returns boolean
 */
const isIncludes = (items, el) => {
  for (const item of items) {
    if (el === item) {
      return true;
    }
  }
  return false;
};

const isStringIncludes = (ref, search) => {
  if (search === "") return true;

  for (let i = 0; i <= ref.length - search.length; i++) {
    const part = ref.slice(i, i + search.length);

    if (part === search) {
      return true;
    }
  }
  return false;
};

const map = (array, callback = (item) => item) => {
  const result = [];
  for (const item of array) {
    const value = callback(item);
    if (value !== undefined) {
      result.push(value);
    }
  }
  return result;
};

/**
 * Return filtered recipes based on search value in name, description, and ingredients
 * @param {string} searchValue
 * @returns Array of recipes
 */
const filterBySearch = (searchValue) => {
  const lowerCaseSearchValue = searchValue.toLowerCase();

  const filteredRecipes = map(recipes, (recipe) => {
    const recipeIngredientsList = recipeIngredients(recipe);

    if (
      isStringIncludes(recipe.name.toLowerCase(), lowerCaseSearchValue) ||
      isStringIncludes(
        recipe.description.toLowerCase(),
        lowerCaseSearchValue,
      ) ||
      isSomeIngredientInclude(
        Array.from(recipeIngredientsList),
        lowerCaseSearchValue,
      )
    ) {
      return recipe;
    }
  });

  // Suggestion si aucun résultat : trouver la recette la plus proche par similarité de nom
  if (filteredRecipes.length === 0 && searchValue.length > 0) {
    let bestMatch = null;
    let bestScore = 0;
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      // Score = nombre de caractères consécutifs communs au début du nom (prefix match)
      let score = 0;
      const name = recipe.name.toLowerCase();
      for (
        let j = 0;
        j < Math.min(name.length, lowerCaseSearchValue.length);
        j++
      ) {
        if (name[j] === lowerCaseSearchValue[j]) {
          score++;
        } else {
          break;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = recipe;
      }
    }
    if (bestMatch) {
      setSuggestions((prev) => ({ ...prev, suggest: bestMatch.name }));
    } else {
      setSuggestions((prev) => ({ ...prev, suggest: "" }));
    }
  }

  return filteredRecipes;
};

/**
 * Extract ingredients from a recipe
 * @param {Object} recipe
 * @returns
 */
const recipeIngredients = (recipe) => {
  let ingredientsList = new Set();
  for (let i = 0; i < recipe.ingredients.length; i++) {
    ingredientsList.add(recipe.ingredients[i].ingredient.toLowerCase());
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

/**
 * Render the card container with recipes
 */
const renderCardContainer = () => {
  const recipesFragment = createRecipesCard(recipes);
  recipesContainer.innerHTML = "";
  recipesContainer.appendChild(recipesFragment);
  renderSelectOptions(recipes);

  recipeCount.textContent = `${recipes.length} recettes`;
  const emptyText = `Aucune recette ne contient "${suggestions.search}", vous pouvez chercher "${suggestions.suggest}"`;
  if (recipes.length === 0) {
    emptyResult.classList.remove("hidden");
    emptyResult.textContent = emptyText;
  } else if (emptyResult.classList.contains("hidden") === false) {
    emptyResult.classList.add("hidden");
    emptyResult.textContent =
      "Aucune recette ne contient {{search}}, vous pouvez chercher {{suggest}}";
  }
};

function debounce(fn, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

const recipeUstensils = (recipe) => {
  let ustensilsList = [];
  for (let i = 0; i < recipe.ustensils.length; i++) {
    ustensilsList.push(recipe.ustensils[i].toLowerCase());
  }
  return ustensilsList;
};

const recipesOptions = (recipes) => {
  let ingredients = [];
  let utensilsSet = new Set();
  let appliancesSet = new Set();

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    ingredients = [...ingredients, ...recipeIngredients(recipe)];
    const { ustensils, appliance } = recipe;
    for (let j = 0; j < ustensils.length; j++) {
      utensilsSet.add(ustensils[j].toLowerCase());
    }

    appliancesSet.add(appliance.toLowerCase());
  }

  return {
    ingredients,
    utensilsSet: Array.from(utensilsSet),
    appliancesSet: Array.from(appliancesSet),
  };
};

/**
 * Render select options for ingredients, utensils, and appliances
 * @param {Array} recipes
 */
const renderSelectOptions = (recipes) => {
  const { ingredients, utensilsSet, appliancesSet } = recipesOptions(recipes);
  const ingredientSelect = document.querySelector(
    "#select-ingredients .options",
  );
  const ustensilsSelect = document.querySelector("#select-ustensils .options");
  const appliancesSelect = document.querySelector(
    "#select-appliances .options",
  );

  const ingOptionsFragment = createSelectOptions({
    options: ingredients,
    onClick: handleSelectOption,
    onDelete: onDeleteOption,
  });
  cleanOptions(ingredientSelect);
  ingredientSelect.appendChild(ingOptionsFragment);

  const ustOptionsFragment = createSelectOptions({
    options: utensilsSet,
    onClick: handleSelectOption,
    onDelete: onDeleteOption,
  });
  cleanOptions(ustensilsSelect);
  ustensilsSelect.appendChild(ustOptionsFragment);

  const optionsFragment = createSelectOptions({
    options: appliancesSet,
    onClick: handleSelectOption,
    onDelete: onDeleteOption,
  });
  cleanOptions(appliancesSelect);
  appliancesSelect.appendChild(optionsFragment);
};

const handleSelectOption = (e) => {
  setFilters((prev) => {
    const value = e.target.dataset.value;
    const newSet = new Set(prev);
    newSet.add(value);
    return newSet;
  });
  handleFilter();
};

const onDeleteOption = (e) => {
  setFilters((prev) => {
    const value = e.currentTarget.dataset.value;
    const newSet = new Set(prev);
    newSet.delete(value);
    return newSet;
  });

  handleFilter();
};

export {
  debounce,
  filterBySearch,
  recipeIngredients,
  createRecipesCard,
  renderCardContainer,
  recipeCount,
  recipesContainer,
  map,
  isIncludes,
  isStringIncludes,
};
