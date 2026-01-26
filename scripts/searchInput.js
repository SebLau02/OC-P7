import { recipesContainer } from "./recipes";
import { createRecipesCard, filterBySearch } from "./utils/utils";

const searchInput = document.querySelector("#search-input");
const inputField = searchInput.querySelector("input");

const handleSearch = () => {
  inputField.addEventListener("input", (e) => {
    const { value } = e.target;
    const filteredRecipes = filterBySearch(value);
    const recipesFragment = createRecipesCard(filteredRecipes);
  });
};

export { handleSearch };
