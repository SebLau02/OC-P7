function RecipeCard({ recipe }) {
  const { image, name, time, description, ingredients } = recipe;

  const recipeCardContainer = document.createElement("article");
  recipeCardContainer.setAttribute("class", "recipe-card");

  // create recipe image placeholder
  const imageContainer = document.createElement("div");
  imageContainer.setAttribute("class", "recipe-image-container");

  // create recipe image
  const recipeImage = document.createElement("img");
  recipeImage.setAttribute("src", `./assets/${image}`);
  recipeImage.setAttribute("alt", `${name}`);
  recipeImage.setAttribute("loading", "lazy");
  imageContainer.appendChild(recipeImage);

  // create chip for time
  const timeChip = document.createElement("div");
  timeChip.setAttribute("class", "chip-base");
  const timeSpan = document.createElement("span");
  timeSpan.setAttribute("class", "text-body3");
  timeSpan.textContent = `${time}min`;
  timeChip.appendChild(timeSpan);
  imageContainer.appendChild(timeChip);

  // create card content
  const cardContent = document.createElement("div");
  cardContent.setAttribute("class", "recipe-content");

  // create recipe name
  const recipeName = document.createElement("h3");
  recipeName.setAttribute("class", "text-h3");
  recipeName.textContent = name;
  cardContent.appendChild(recipeName);

  // create title section
  const descriptionTitle = document.createElement("h4");
  descriptionTitle.setAttribute("class", "text-body3 uppercase text-grey");
  descriptionTitle.textContent = "RECETTE";
  cardContent.appendChild(descriptionTitle);

  // create recipe description
  const recipeDescription = document.createElement("p");
  recipeDescription.setAttribute("class", "text-body2");
  recipeDescription.textContent = description;
  cardContent.appendChild(recipeDescription);

  // create ingredients list title
  const ingredientsTitle = document.createElement("h4");
  ingredientsTitle.setAttribute("class", "text-body3 uppercase text-grey");
  ingredientsTitle.textContent = "INGRÉDIENTS";
  cardContent.appendChild(ingredientsTitle);

  //create ingredients element
  const ingredientsListContainer = document.createElement("div");
  ingredientsListContainer.setAttribute("class", "ingredients-grid");

  ingredients.forEach((ingredient) => {
    const ingredientItem = document.createElement("div");
    const ingredientElement = document.createElement("p");
    ingredientElement.setAttribute("class", "text-body2 strong");
    ingredientElement.textContent = ingredient.ingredient;

    const quantityElement = document.createElement("p");
    quantityElement.setAttribute("class", "text-body2 text-grey");
    let quantityText = `${ingredient.quantity || ""}${ingredient.unit ? ` ${ingredient.unit}` : ""}`;
    quantityElement.textContent = quantityText;

    ingredientItem.appendChild(ingredientElement);
    ingredientItem.appendChild(quantityElement);
    ingredientsListContainer.appendChild(ingredientItem);
  });

  recipeCardContainer.appendChild(imageContainer);
  cardContent.appendChild(ingredientsListContainer);
  recipeCardContainer.appendChild(cardContent);

  return recipeCardContainer;
}

export { RecipeCard };
