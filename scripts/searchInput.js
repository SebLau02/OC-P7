import { filters, recipes, setSuggestions } from "./constants";
import { filterBySearch, renderCardContainer } from "./utils/utils";
import { debounce } from "./utils/utils";

const searchInput = document.querySelector("#search-input");
const inputField = searchInput.querySelector("input");

const handleSearch = () => {
  const debouncedInput = debounce((e) => {
    const { value } = e.target;
    if (value.length === 0) {
      renderCardContainer(recipes);
      return;
    } else if (value.length < 3) {
      return;
    }
    const filteredRecipes = filterBySearch(value);
    setSuggestions((prev) => ({ ...prev, search: value }));
    renderCardContainer(filteredRecipes);
  }, 300); // 300ms de délai, ajustable

  inputField.addEventListener("input", debouncedInput);
  inputField.addEventListener("inputCleared", () => {
    renderCardContainer(recipes);
  });
};

export { handleSearch };
