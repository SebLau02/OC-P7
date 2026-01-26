import { SetUpPresentSelectsBehavior } from "./components/select.js";
import { handleFocusInput } from "./components/searchInput.js";
import { recipes } from "./recipes.js";
import { handleSearch } from "./searchInput.js";

document.addEventListener("DOMContentLoaded", () => {
  recipes();
  SetUpPresentSelectsBehavior();
  handleFocusInput();

  handleSearch();
});
