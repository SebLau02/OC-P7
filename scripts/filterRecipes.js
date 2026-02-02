import { Chip } from "./components/chip";
import {
  dataRecipes,
  filters,
  search,
  setFilters,
  setRecipes,
} from "./constants";
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
  renderOptionsChip();
};

const renderOptionsChip = () => {
  const fragment = document.createDocumentFragment();
  const chipsContainer = document.getElementById("options-chip-container");
  for (const filter of Array.from(filters)) {
    const chip = Chip({
      label: filter,
      onDelete: (e) => {
        setFilters((prev) => {
          const newSet = new Set(prev);
          newSet.delete(filter);
          return newSet;
        });
        handleFilter();
      },
    });
    fragment.appendChild(chip);
  }
  chipsContainer.innerHTML = "";
  chipsContainer.appendChild(fragment);
};

export { handleFilter };
