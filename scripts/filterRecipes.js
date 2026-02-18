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
  // if no filters, set recipes to original data and filter by search
  if (map(Object.values(filters), (v) => Array.from(v)).flat().length === 0) {
    // if no filters
    setRecipes(dataRecipes); // set recipes to original data
    filteredRecipes = filterBySearch(search);
  } else {
    const filteredSet = new Set();
    for (const recipe of filterBySearch(search)) {
      const ingredientsList = recipeIngredients(recipe);
      for (let i = 0; i < Object.entries(filters).length; i++) {
        const [key, values] = Object.entries(filters)[i];
        const valuesArray = Array.from(values);
        for (const filter of valuesArray) {
          switch (key) {
            case "ingredients":
              if (
                isEvery(valuesArray, (v) => {
                  if (!isIncludes(ingredientsList, v.toLowerCase())) {
                    return false;
                  }
                  return true;
                })
              ) {
                filteredSet.add(recipe);
              }
              break;
            case "appliances":
              if (recipe.appliance.toLowerCase() === filter.toLowerCase()) {
                filteredSet.add(recipe);
              }
              break;
            case "ustensils":
              if (
                isIncludes(
                  map(recipe.ustensils, (u) => u.toLowerCase()),
                  filter.toLowerCase(),
                )
              ) {
                filteredSet.add(recipe);
              }
              break;

            default:
              break;
          }
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
