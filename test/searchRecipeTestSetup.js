// Fichier de préparation des deux méthode à comparer dans JSbench

// version avec les méthodes natives
const isStringIncludes = (ref, search) => {
  if (search === "") return true;

  for (let i = 0; i <= ref.length - search.length; i++) {
    const part = ref.slice(i, i + search.length);

    if (part === search) {
      return true;
    }
  }
  return false;
};

const map = (array, callback = (item) => item) => {
  const result = [];
  for (const item of array) {
    const value = callback(item);
    if (value !== undefined) {
      result.push(value);
    }
  }
  return result;
};
const recipeIngredients = (recipe) => {
  let ingredientsList = new Set();
  for (let i = 0; i < recipe.ingredients.length; i++) {
    ingredientsList.add(recipe.ingredients[i].ingredient.toLowerCase());
  }
  return ingredientsList;
};
const isSomeIngredientInclude = (ref, el) => {
  let isIncluded = false;
  for (let i = 0; i < ref.length; i++) {
    if (ref[i] === el) {
      isIncluded = true;
      break;
    }
  }

  return isIncluded;
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
      isSomeIngredientInclude(
        Array.from(recipeIngredientsList),
        lowerCaseSearchValue,
      )
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

    if (nameMatch || descriptionMatch || ingredientsMatch) {
      //   setSuggestedRecipe(recipe); // on retire celui ci car en test on en a pas besoin
    }
    return nameMatch || descriptionMatch || ingredientsMatch;
  });
}
bySearch("Jus de citron");
