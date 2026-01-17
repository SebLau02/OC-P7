// main.js par défaut

import { Button } from "./components/button.js";
import { Select, SetUpPresentSelectsBehavior } from "./components/select.js";
import { SearchInput, handleFocusInput } from "./components/searchInput.js";
import { Chip } from "./components/chip.js";

const button = Button({
  children: "Coco",
  deletable: true,
});

document.body.appendChild(button);

const select = Select({
  label: "Ingrédient",
  options: [
    { value: "tomato", label: "Tomate" },
    { value: "cheese", label: "Fromage" },
    { value: "lettuce", label: "Laitue" },
  ],
});

document.body.appendChild(select);

const Search = SearchInput({
  props: {
    placeholder: "Ingrédient",
    class: "sm mx-4",
  },
});

document.body.appendChild(Search);

const chip = Chip({ label: "Test Chip" });
document.body.appendChild(chip);
const chipSSecondary = Chip({ label: "Test Chip", color: "secondary" });
document.body.appendChild(chipSSecondary);

SetUpPresentSelectsBehavior();
handleFocusInput();
