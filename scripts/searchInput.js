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
    if (value.length === 0) {
      setSearch(value);
      setRecipes(dataRecipes);
      handleFilter();
      renderCardContainer();
      return;
    } else if (value.length < 3) {
      setSearch("");
      return;
    }
    setSearch(value);
    const filteredRecipes = filterBySearch(value);
    setRecipes(filteredRecipes);
    setSuggestions((prev) => ({ ...prev, search: value }));
    handleFilter();
    renderCardContainer();
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
