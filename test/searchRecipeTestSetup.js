// Fichier de préparation des deux méthode à comparer dans JSbench

// version avec les méthodes natives
const isStringIncludes = (ref, search) => {
  if (search === "") return true; // Empty string is always included
  if (search.length > ref.length) return false; // Substring cannot be longer than reference

  // Iterate through the reference string
  for (let i = 0; i <= ref.length - search.length; i++) {
    let match = true;

    // Compare each character of the search string
    for (let j = 0; j < search.length; j++) {
      if (ref[i + j] !== search[j]) {
        match = false;
        break; // Stop comparing as soon as a character differs
      }
    }

    if (match) return true; // Match found at current index
  }
  return false;
};

const map = (array, callback = (item) => item) => {
  const result = [];

  for (let i = 0; i < array.length; i++) {
    const value = callback(array[i]);

    // Only push defined values to simulate a combined map/filter
    if (value !== undefined) {
      result.push(value);
    }
  }
  return result;
};
const recipeIngredients = (recipe) => {
  return map(recipe.ingredients, (ing) => ing.ingredient.toLowerCase());
};
const isSomeIngredientInclude = (recipe, el) => {
  let isIncluded = false;
  for (let i = 0; i < recipe.ingredients.length; i++) {
    if (isStringIncludes(recipe.ingredients[i].ingredient.toLowerCase(), el)) {
      isIncluded = true;
      break;
    }
  }

  return isIncluded;
};
const isIncludes = (items, el) => {
  for (let i = 0; i < items.length; i++) {
    // Immediate return on first match (O(1) in best case)
    if (items[i] === el) return true;
  }
  return false;
};

const filterBySearch = (searchValue) => {
  const lowerCaseSearchValue = searchValue.toLowerCase();

  const filteredRecipes = map(recipes, (recipe) => {
    const recipeIngredientsList = recipeIngredients(recipe);

    if (
      isStringIncludes(recipe.name.toLowerCase(), lowerCaseSearchValue) ||
      isStringIncludes(
        recipe.description.toLowerCase(),
        lowerCaseSearchValue,
      ) ||
      isSomeIngredientInclude(recipe, lowerCaseSearchValue)
    ) {
      return recipe;
    }
  });

  // Suggestion si aucun résultat : trouver la recette la plus proche par similarité de nom
  if (filteredRecipes.length === 0 && searchValue.length > 0) {
    let bestMatch = null;
    let bestScore = 0;
    for (let i = 0; i < recipes.length; i++) {
      const recipe = recipes[i];
      // Score = nombre de caractères consécutifs communs au début du nom (prefix match)
      let score = 0;
      const name = recipe.name.toLowerCase();
      for (
        let j = 0;
        j < Math.min(name.length, lowerCaseSearchValue.length);
        j++
      ) {
        if (name[j] === lowerCaseSearchValue[j]) {
          score++;
        } else {
          break;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = recipe;
      }
    }
    if (bestMatch) {
      setSuggestions((prev) => ({ ...prev, suggest: bestMatch.name }));
    } else {
      setSuggestions((prev) => ({ ...prev, suggest: "" }));
    }
  }

  return filteredRecipes;
};

filterBySearch("Jus de citron");

// Version avec les méthodes fonctionnelles
function bySearch(search) {
  return recipes.filter((recipe) => {
    const searchLower = search.toLowerCase();
    const nameMatch = recipe.name.toLowerCase().includes(searchLower);
    const descriptionMatch = recipe.description
      .toLowerCase()
      .includes(searchLower);
    const ingredientsMatch = recipe.ingredients.some((ingredient) =>
      ingredient.ingredient.toLowerCase().includes(searchLower),
    );

    return nameMatch || descriptionMatch || ingredientsMatch;
  });
}
bySearch("Jus de citron");
