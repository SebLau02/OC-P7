import { mediumCrossIcon } from "../constants";

function Chip({
  label = "",
  color = "primary",
  onDelete = null,
  variant = "filled",
}) {
  const chipContainer = document.createElement("div");
  chipContainer.setAttribute("class", `chip-base ${color} ${variant}`);

  const labelSpan = document.createElement("span");
  labelSpan.setAttribute("class", "text-body3");
  labelSpan.textContent = label;

  chipContainer.appendChild(labelSpan);

  if (onDelete) {
    labelSpan.setAttribute("class", "text-body2");
    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "button-base icon-button sm text pill");
    deleteButton.innerHTML = mediumCrossIcon;
    deleteButton.addEventListener("click", onDelete);
    chipContainer.appendChild(deleteButton);
  }

  return chipContainer;
}

export { Chip };
