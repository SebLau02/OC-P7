import { mediumCrossIcon } from "../constants";

const ChipMap = new Map();

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

    const chipListeners = {
      click: (e) => {
        onDelete(e);
        chipListeners.removeElement();
      },
      removeElement: () => {
        deleteButton.removeEventListener("click", chipListeners.click);
        ChipMap.delete(chipContainer);
        chipContainer.remove();
      },
    };

    deleteButton.addEventListener("click", chipListeners.click);
    chipContainer.appendChild(deleteButton);
    ChipMap.set(deleteButton, chipListeners);
    ChipMap.set(label.toLocaleLowerCase(), chipListeners);
  }

  return chipContainer;
}

export { Chip, ChipMap };
