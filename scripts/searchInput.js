import { setSuggestions } from "./constants";
import { filterBySearch, renderCardContainer } from "./utils/utils";

const searchInput = document.querySelector("#search-input");
const inputField = searchInput.querySelector("input");

const handleSearch = () => {
  inputField.addEventListener("input", (e) => {
    const { value } = e.target;
    const filteredRecipes = filterBySearch(value);
    renderCardContainer(filteredRecipes);
    setSuggestions((prev) => ({ ...prev, search: value }));
  });
};

export { handleSearch };
