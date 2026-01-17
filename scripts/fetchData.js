async function getRecipes() {
  try {
    const res = await fetch("./data/recipes.json");
    const data = await res.json();

    return data;
  } catch (error) {}
}

export { getRecipes };
