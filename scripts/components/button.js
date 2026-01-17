/**
 *
 * @param {string | html node} children
 * @param {html node} endAdornment
 * @param {"contained" | "outlined"} variant
 * @param {boolean} deletable
 * @returns {html node} button
 */

import { mediumCrossIcon } from "../constants";

function Button({
  children = "",
  endAdornment = null,
  variant = "contained",
  deletable = false,
}) {
  const isLink = deletable || endAdornment;
  const button = isLink
    ? document.createElement("a")
    : document.createElement("button");

  button.setAttribute("class", `button-base ${variant}`);

  const span = document.createElement("span");
  span.textContent = children;
  span.setAttribute("class", "text-body2");

  button.appendChild(span);

  if (endAdornment || deletable) {
    const endAdornmentContainer = document.createElement("div");
    endAdornmentContainer.setAttribute("class", "end-adornment");
    const iconButton = document.createElement("button");
    iconButton.setAttribute("class", "button-base sm");
    if (endAdornment) {
      iconButton.appendChild(endAdornment);
    } else {
      iconButton.innerHTML = mediumCrossIcon;
    }
    endAdornmentContainer.appendChild(iconButton);
    button.appendChild(endAdornmentContainer);
  }
  return button;
}

export default Button;
