import { SetUpPresentSelectsBehavior } from "./components/select.js";
import { handleFocusInput } from "./components/searchInput.js";
import { getRecipes } from "./fetchData.js";
import { recipes } from "./recipes.js";

// const button = Button({
//   children: "Coco",
//   deletable: true,
// });

// document.body.appendChild(button);

// const select = Select({
//   label: "Ingrédient",
//   options: [
//     { value: "tomato", label: "Tomate" },
//     { value: "cheese", label: "Fromage" },
//     { value: "lettuce", label: "Laitue" },
//   ],
// });

// document.body.appendChild(select);

// const Search = SearchInput({
//   props: {
//     placeholder: "Ingrédient",
//     class: "sm mx-4",
//   },
// });

// document.body.appendChild(Search);

// const chip = Chip({ label: "Test Chip" });
// document.body.appendChild(chip);
// const chipSSecondary = Chip({ label: "Test Chip", color: "secondary" });
// document.body.appendChild(chipSSecondary);

// const recipe = {
//   id: 1,
//   image: "Recette01.jpg",
//   name: "Limonade de Coco",
//   servings: 1,
//   ingredients: [
//     {
//       ingredient: "Lait de coco",
//       quantity: 400,
//       unit: "ml",
//     },
//     {
//       ingredient: "Jus de citron",
//       quantity: 2,
//     },
//     {
//       ingredient: "Crème de coco",
//       quantity: 2,
//       unit: "cuillères à soupe",
//     },
//     {
//       ingredient: "Sucre",
//       quantity: 30,
//       unit: "grammes",
//     },
//     {
//       ingredient: "Glaçons",
//     },
//   ],
//   time: 10,
//   description:
//     "Mettre les glaçons à votre goût dans le blender, ajouter le lait, la crème de coco, le jus de 2 citrons et le sucre. Mixer jusqu'à avoir la consistence désirée",
//   appliance: "Blender",
//   ustensils: ["cuillère à Soupe", "verres", "presse citron"],
// };
// const recipeCard = RecipeCard({ recipe });
// document.body.appendChild(recipeCard);

document.addEventListener("DOMContentLoaded", () => {
  recipes();
  SetUpPresentSelectsBehavior();
  handleFocusInput();
});
