import {
  dataRecipes,
  setRecipes,
  setSearch,
  setSuggestions,
} from "./constants";
import { handleFilter } from "./filterRecipes";
import { filterBySearch, renderCardContainer } from "./utils/utils";
import { debounce } from "./utils/utils";

const searchInput = document.querySelector("#search-input");
const inputField = searchInput.querySelector("input");

/**
 * Filter recipes on change in the search input with a debounce to optimize performance.
 * If the input is cleared, reset the recipes to the original data.
 */
const handleSearch = () => {
  const debouncedInput = debounce((e) => {
    const { value } = e.target;
    // if input is empty
    if (value.length === 0) {
      setSearch(value); // Clear search state
      setRecipes(dataRecipes); // Reset recipes to original data
      handleFilter(); // Reapply filters if any
      renderCardContainer(); // render the full list of recipes
      return;
    }
    setSearch(value); // set search state
    const filteredRecipes = filterBySearch(value); // filter recipes based on search value
    setRecipes(filteredRecipes); // update recipes state
    setSuggestions((prev) => ({ ...prev, search: value })); // update suggestions state
    handleFilter(); // apply filters (options)
    renderCardContainer(); // render new list
  }, 300); // 300ms de délai, ajustable

  inputField.addEventListener("input", debouncedInput);
  inputField.addEventListener("inputCleared", () => {
    setRecipes(dataRecipes);
    setSearch("");
    handleFilter();
    renderCardContainer();
  });
};

export { handleSearch };
