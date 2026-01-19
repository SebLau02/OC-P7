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
      this.flatMap((recipe) => recipe.ingredients.map((ing) => ing.ingredient)),
    );
  }
  appliancesList() {
    return new Set(this.map((recipe) => recipe.appliance));
  }
  ustensilsList() {
    return new Set(this.flatMap((recipe) => recipe.ustensils));
  }

  optionsList() {
    return {
      ingredients: this.ingredientsList(),
      appliances: this.appliancesList(),
      ustensils: this.ustensilsList(),
    };
  }
}
