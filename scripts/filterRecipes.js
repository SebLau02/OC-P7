import { Chip, ChipMap } from "./components/chip";
import { SelectMap } from "./components/select";
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
        handleClearSelectedOptions(filter);
      },
      variant: "button",
    });
    fragment.appendChild(chip);
  }
  for (const child of Array.from(chipsContainer.children)) {
    if (ChipMap.get(child.querySelector("button"))) {
      ChipMap.get(child.querySelector("button")).removeElement();
    } else {
      child.remove();
    }
  }
  chipsContainer.appendChild(fragment);
};

/**
 * Clear related select option
 * @param {string} filter
 */
const handleClearSelectedOptions = (filter) => {
  const selectedOptions = document.querySelectorAll(".selected-option");
  for (const option of Array.from(selectedOptions)) {
    if (option.dataset.selectedOption === filter) {
      if (SelectMap.get(option.querySelector("button")))
        SelectMap.get(option.querySelector("button")).removeElement();
      else option.remove();
    }
  }
};

export { handleFilter };
