const fs = require("fs");

const generateData = (count) => {
  const ingredientsBase = [
    "Lait de coco",
    "Jus de citron",
    "Sucre",
    "Sel",
    "Farine",
    "Œuf",
  ];
  const appliances = ["Blender", "Four", "Poêle", "Micro-ondes"];
  const recipes = [];

  for (let i = 1; i <= count; i++) {
    recipes.push({
      id: i,
      image: "Recette01.jpg",
      name: `Recette n°${i} - ${(Math.random() + 1).toString(36).substring(7)}`,
      servings: Math.floor(Math.random() * 6) + 1,
      ingredients: Array.from({ length: 4 }, () => ({
        ingredient:
          ingredientsBase[Math.floor(Math.random() * ingredientsBase.length)],
        quantity: Math.floor(Math.random() * 500),
        unit: "g",
      })),
      time: Math.floor(Math.random() * 60) + 10,
      description:
        "Description de test pour évaluer les performances de recherche.",
      appliance: appliances[Math.floor(Math.random() * appliances.length)],
      ustensils: ["cuillère", "fourchette"],
    });
  }

  // Écriture du fichier sur le disque
  const fileName = `recettes_${count}.json`;
  fs.writeFileSync(fileName, JSON.stringify(recipes, null, 2));
  console.log(`Fichier ${fileName} généré avec succès !`);
};

generateData(5000); // Modifie le chiffre ici pour tes différents tests
