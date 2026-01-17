// main.js par défaut

import { handleFocusInput } from "./searchInput.js";
import { handleSelectInput } from "./selectInput.js";
import { Button, ButtonMap } from "./components/button.js";

handleSelectInput();
handleFocusInput();

const button = Button({
  children: "Coco",
  deletable: true,
});

document.body.appendChild(button);
