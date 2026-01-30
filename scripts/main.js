import { SetUpPresentSelectsBehavior } from "./components/select.js";
import { handleFocusInput } from "./components/searchInput.js";
import { IndexRecipes } from "./recipes.js";
import { handleSearch } from "./searchInput.js";

document.addEventListener("DOMContentLoaded", () => {
  IndexRecipes();
  SetUpPresentSelectsBehavior();
  handleFocusInput();

  handleSearch();
});
