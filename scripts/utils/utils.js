import { RecipeCard } from "../components/recipeCard";
import { cleanOptions, createSelectOptions } from "../components/select";
import { recipes, setSuggestions, suggestions } from "../constants";

const recipeCount = document.getElementById("recipe-count");
const recipesContainer = document.getElementById("result-container");
const emptyResult = document.getElementById("empty-result");

const includes = (array, element) => {
  for (let i = 0; i < array.length; i++) {}
};

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
// Filter recipes by search value
const filterBySearch = (searchValue) => {
  const lowerCaseSearchValue = searchValue.toLowerCase();

  const filteredRecipes = [];

  for (let i = 0; i < recipes.length; i++) {
    const recipe = recipes[i];
    const recipeIngredientsList = recipeIngredients(recipe);

    const someIngredientsInclude = isSomeIngredientInclude(
      Array.from(recipeIngredientsList),
      lowerCaseSearchValue,
    );

    if (
      recipe.name.toLowerCase().includes(lowerCaseSearchValue) ||
      recipe.description.toLowerCase().includes(lowerCaseSearchValue) ||
      someIngredientsInclude
    ) {
      filteredRecipes.push(recipe);
    }
  }

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

const renderCardContainer = (recipes) => {
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

const renderSelectOptions = (recipes) => {
  const { ingredients, utensilsSet, appliancesSet } = recipesOptions(recipes);
  const ingredientSelect = document.querySelector(
    "#select-ingredients .options",
  );
  const ustensilsSelect = document.querySelector("#select-ustensils .options");
  const appliancesSelect = document.querySelector(
    "#select-appliances .options",
  );

  const ingOptionsFragment = createSelectOptions(ingredients);
  cleanOptions(ingredientSelect);
  ingredientSelect.appendChild(ingOptionsFragment);

  const ustOptionsFragment = createSelectOptions(utensilsSet);
  cleanOptions(ustensilsSelect);
  ustensilsSelect.appendChild(ustOptionsFragment);

  const optionsFragment = createSelectOptions(appliancesSet);
  cleanOptions(appliancesSelect);
  appliancesSelect.appendChild(optionsFragment);
};

export {
  debounce,
  filterBySearch,
  recipeIngredients,
  createRecipesCard,
  renderCardContainer,
  recipeCount,
  recipesContainer,
};
