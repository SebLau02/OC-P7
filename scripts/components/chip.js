function Chip({ label = "", color = "primary" }) {
  const chipContainer = document.createElement("div");
  chipContainer.setAttribute("class", `chip-base ${color}`);

  const labelSpan = document.createElement("span");
  labelSpan.setAttribute("class", "text-body3");
  labelSpan.textContent = label;

  chipContainer.appendChild(labelSpan);

  return chipContainer;
}

export { Chip };
