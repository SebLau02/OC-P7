import Recipes from "./models/Recipes";

const crossSmall = `<svg width="7" height="7" viewBox="0 0 7 7" fill="none" class="icon"><path d="M6.5 6.5L3.5 3.5M3.5 3.5L0.5 0.5M3.5 3.5L6.5 0.5M3.5 3.5L0.5 6.5" stroke="#7A7A7A" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
const mediumCrossIcon = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" class="icon"><path d="M11.0833 11.0833L6.08325 6.08331M6.08325 6.08331L1.08325 1.08331M6.08325 6.08331L11.0833 1.08331M6.08325 6.08331L1.08325 11.0833" stroke="#1B1B1B" stroke-width="2.16667" stroke-linecap="round" stroke-linejoin="round" /><svg>`;
const chevron = `<svg width="14" height="8" viewBox="0 0 14 8" fill="none" class="icon"> <path d="M0.5 6.68045L7 0.68045L13.5 6.68045" stroke="#1B1B1B" stroke-linecap="round" /> svg>`;
const searchSm = `<svg width="14" height="14" viewBox="0 0 14 14" fill="none" class="icon"> <circle cx="5" cy="5" r="4.75" stroke="#7A7A7A" stroke-width="0.5" /> <line x1="9.17678" y1="9.32322" x2="13.6768" y2="13.8232" stroke="#7A7A7A"  stroke-width="0.5" />
`;

let RECIPES = new Recipes([]);

function setRecipes(newValue) {
  RECIPES = new Recipes(newValue);
}

export { crossSmall, setRecipes, mediumCrossIcon, chevron, searchSm, RECIPES };
