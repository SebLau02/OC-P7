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
  forEach,
  isEvery,
  isIncludes,
  map,
  recipeIngredients,
  renderCardContainer,
} from "./utils/utils";

/**
 * Fitler recipes based on selected options
 */
const handleFilter = () => {
  let filteredRecipes;
  // Si aucun filtre, on retourne toutes les recettes filtrées par la recherche
  if (map(Object.values(filters), (v) => Array.from(v)).flat().length === 0) {
    setRecipes(dataRecipes);
    filteredRecipes = filterBySearch(search);
  } else {
    filteredRecipes = filterBySearch(search).filter((recipe) => {
      // Vérifie chaque catégorie de filtre
      // 1. Ingrédients
      const ingredientFilters = Array.from(filters.ingredients || []);
      const recipeIngr = recipeIngredients(recipe);
      const hasAllIngredients =
        ingredientFilters.length === 0 ||
        isEvery(ingredientFilters, (f) =>
          isIncludes(recipeIngr, f.toLowerCase()),
        );

      // 2. Appareils
      const applianceFilters = Array.from(filters.appliances || []);
      const hasAllAppliances =
        applianceFilters.length === 0 ||
        isEvery(
          applianceFilters,
          (f) => recipe.appliance.toLowerCase() === f.toLowerCase(),
        );

      // 3. Ustensiles
      const ustensilFilters = Array.from(filters.ustensils || []);
      const recipeUstensils = map(recipe.ustensils, (u) => u.toLowerCase());
      const hasAllUstensils =
        ustensilFilters.length === 0 ||
        isEvery(ustensilFilters, (f) =>
          isIncludes(recipeUstensils, f.toLowerCase()),
        );

      // La recette doit satisfaire tous les filtres (AND)
      return hasAllIngredients && hasAllAppliances && hasAllUstensils;
    });
  }

  setRecipes(filteredRecipes);
  renderCardContainer(filteredRecipes);
  renderOptionsChip();
};

const renderOptionsChip = () => {
  const fragment = document.createDocumentFragment();
  const chipsContainer = document.getElementById("options-chip-container");

  for (let i = 0; i < Object.entries(filters).length; i++) {
    const [key, values] = Object.entries(filters)[i];

    forEach(values, (filter) => {
      const chip = Chip({
        label: filter,
        onDelete: () => {
          setFilters((prev) => {
            const newSet = new Set([...prev[key]]);
            newSet.delete(filter);
            return { ...prev, [key]: newSet };
          });

          handleFilter();
          handleClearSelectedOptions(filter);
        },
        variant: "button",
      });
      fragment.appendChild(chip);
    });
  }
  // clear previous chips
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
