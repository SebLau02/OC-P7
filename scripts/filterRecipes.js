import { dataRecipes, filters, search, setRecipes } from "./constants";
import {
  filterBySearch,
  recipeIngredients,
  renderCardContainer,
} from "./utils/utils";

const handleFilter = () => {
  let filteredRecipes;
  if (filters.size === 0) {
    setRecipes(dataRecipes);
    filteredRecipes = filterBySearch(search);
  } else {
    const filteredSet = new Set();
    for (const recipe of filterBySearch(search)) {
      const ingredientsList = recipeIngredients(recipe);
      for (const filter of filters) {
        if (
          ingredientsList.has(filter.toLowerCase()) ||
          recipe.appliance.toLowerCase() === filter.toLowerCase() ||
          new Set(recipe.ustensils.map((u) => u.toLowerCase())).has(
            filter.toLowerCase(),
          )
        ) {
          filteredSet.add(recipe);
          break; // On ajoute la recette une seule fois
        }
      }
    }
    filteredRecipes = Array.from(filteredSet);
  }

  setRecipes(filteredRecipes);
  renderCardContainer(filteredRecipes);
};

export { handleFilter };
