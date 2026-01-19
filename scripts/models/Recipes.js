import { setSuggestedRecipe } from "../constants";

export default class Recipes extends Array {
  static get [Symbol.species]() {
    return Recipes;
  }

  constructor(items = []) {
    super(Array.isArray(items) ? items.length : 0);
    if (Array.isArray(items)) {
      this.push(...items);
    }
  }

  ingredientsList() {
    return new Set(
      this.flatMap((recipe) =>
        recipe.ingredients.map((ing) => ing.ingredient.toLowerCase()),
      ),
    );
  }
  appliancesList() {
    return new Set(this.map((recipe) => recipe.appliance.toLowerCase()));
  }
  ustensilsList() {
    return new Set(
      this.flatMap((recipe) =>
        recipe.ustensils.map((ust) => ust.toLowerCase()),
      ),
    );
  }

  recipeIngredients(recipe) {
    return recipe.ingredients.map((ing) => ing.ingredient.toLowerCase());
  }

  bySearch(search) {
    return this.filter((recipe) => {
      const searchLower = search.toLowerCase();
      const nameMatch = recipe.name.toLowerCase().includes(searchLower);
      const descriptionMatch = recipe.description
        .toLowerCase()
        .includes(searchLower);
      const ingredientsMatch = recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(searchLower),
      );

      if (nameMatch || descriptionMatch || ingredientsMatch) {
        setSuggestedRecipe(recipe);
      }
      return nameMatch || descriptionMatch || ingredientsMatch;
    });
  }

  byTags(tags) {
    return this.filter((recipe) => {
      const recipeIngredients = this.recipeIngredients(recipe);
      const includesIngredients = tags.some((tag) =>
        recipeIngredients.includes(tag),
      );
      return includesIngredients;
    });
  }

  optionsList() {
    return {
      ingredients: this.ingredientsList(),
      appliances: this.appliancesList(),
      ustensils: this.ustensilsList(),
    };
  }
}
