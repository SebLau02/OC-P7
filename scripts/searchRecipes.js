import { RecipeCard } from "./components/recipeCard";
import { RECIPES } from "./constants";

const searchRecipeInput = document.getElementById("search-recipe");
const recipesContainer = document.getElementById("result-container");
const recipeCount = document.getElementById("recipe-count");
const emptyResult = document.getElementById("empty-result");

let suggestedRecipe = {};

function searchRecipes() {
  searchRecipeInput.addEventListener("input", handleSearchRecipes);
}

function handleSearchRecipes(e) {
  const { value } = e.target;
  if (value.length === 0) recipesFiltered(value);
  if (value.length < 3) return;
  recipesFiltered(value);
}

function recipesFiltered(search) {
  const recipes = RECIPES;

  const filteredRecipes = recipes.filter((recipe) => {
    const searchLower = search.toLowerCase();
    const nameMatch = recipe.name.toLowerCase().includes(searchLower);
    const descriptionMatch = recipe.description
      .toLowerCase()
      .includes(searchLower);
    const ingredientsMatch = recipe.ingredients.some((ingredient) =>
      ingredient.ingredient.toLowerCase().includes(searchLower),
    );

    if (nameMatch || descriptionMatch || ingredientsMatch) {
      suggestedRecipe = recipe;
    }
    return nameMatch || descriptionMatch || ingredientsMatch;
  });

  const fragment = document.createDocumentFragment();
  filteredRecipes.forEach((recipe) => {
    const recipeCard = RecipeCard({ recipe });
    fragment.appendChild(recipeCard);
  });
  // on vide le container avant d'ajouter les recettes filtrées
  recipesContainer.innerHTML = "";
  // on ajoute les recettes filtrées
  recipesContainer.appendChild(fragment);
  // on met à jour le nombre de recettes affichées
  recipeCount.textContent = `${filteredRecipes.length} recettes`;
  if (filteredRecipes.length === 0) {
    // on affiche le message de résultat vide avec une suggestion
    const text = `Aucune recette ne contient ${search}, vous pouvez chercher ${suggestedRecipe.name}`; // à remplacer par une suggestion pertinente
    emptyResult.textContent = text;
    emptyResult.classList.remove("hidden");
  } else if (emptyResult.classList.contains("hidden") === false) {
    // on cache le message de résultat vide
    emptyResult.classList.add("hidden");
  }
}

export { searchRecipes };
