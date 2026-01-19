import "./prototypes.js";
import { SetUpPresentSelectsBehavior } from "./components/select.js";
import { handleFocusInput } from "./components/searchInput.js";
import { recipes } from "./recipes.js";
import { searchRecipes } from "./searchRecipes.js";

document.addEventListener("DOMContentLoaded", () => {
  recipes();
  searchRecipes();
  SetUpPresentSelectsBehavior();
  handleFocusInput();
});
