import { setSuggestedRecipe } from "../constants";

export default class Recipes extends Array {
  static get [Symbol.species]() {
    return Recipes;
  }

  constructor(items = []) {
    super();
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
  recipeAppliance(recipe) {
    return recipe.appliance.toLowerCase();
  }
  recipeUstensils(recipe) {
    return recipe.ustensils.map((ust) => ust.toLowerCase());
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
    if (tags.length === 0) {
      return this;
    }
    return this.filter((recipe) => {
      const recipeIngredients = this.recipeIngredients(recipe);
      const recipeUstensils = this.recipeUstensils(recipe);
      const recipeAppliance = this.recipeAppliance(recipe);

      const includesIngredients = this.isIncludesTag(tags, recipeIngredients);
      const includesUstensils = this.isIncludesTag(tags, recipeUstensils);
      const includesAppliance = this.isIncludesTag(tags, [recipeAppliance]);

      return includesIngredients || includesUstensils || includesAppliance;
    });
  }

  isIncludesTag = (options, list) => options.some((tag) => list.includes(tag));

  /**
   * Get options list for selects
   * @returns {object}
   */
  optionsList() {
    return {
      ingredients: this.ingredientsList(),
      appliances: this.appliancesList(),
      ustensils: this.ustensilsList(),
    };
  }
}
