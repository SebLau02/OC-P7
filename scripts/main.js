// main.js par défaut

import { handleFocusInput } from "./searchInput.js";
import { handleSelectInput } from "./selectInput.js";
import Button from "./components/button.js";

handleSelectInput();
handleFocusInput();

// document.body.appendChild(
//   Button({
//     children: "Coco",
//     deletable: true,
//   }),
// );

document.body.appendChild(
  Button({
    children: "Cacahuète",
  }),
);
