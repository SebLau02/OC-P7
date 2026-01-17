import { mediumCrossIcon } from "../constants";

const ButtonMap = new Map();

/**
 * Creates a button element.
 * @param {string | html node} children
 * @param {html node} endAdornment
 * @param {"contained" | "outlined"} variant
 * @param {boolean} deletable
 * @returns {html node} button
 */
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

    // start listeners for icon button
    const iconListeners = {
      click: StopPropagationListener,
      mousedown: (e) => {
        StopPropagationEffectListener(e, button);
      },
      mouseup: (e) => {
        AddPropagationEffectListener(e, button);
      },
      removeElement: () => {
        iconButton.removeEventListener("click", iconListeners.click);
        iconButton.removeEventListener("mousedown", iconListeners.mousedown);
        iconButton.removeEventListener("mouseup", iconListeners.mouseup);
        button.remove();
        ButtonMap.delete(iconButton);
      },
    };
    ButtonMap.set(iconButton, iconListeners);

    iconButton.addEventListener("click", iconListeners.click);
    iconButton.addEventListener("mousedown", iconListeners.mousedown);
    iconButton.addEventListener("mouseup", iconListeners.mouseup);
    // end listeners for icon button

    endAdornmentContainer.appendChild(iconButton);
    button.appendChild(endAdornmentContainer);
  }
  return button;
}

function StopPropagationListener(e) {
  e.stopPropagation();
}
function StopPropagationEffectListener(e, button) {
  e.stopPropagation();

  button.classList.add("not-active");
}
function AddPropagationEffectListener(e, button) {
  e.stopPropagation();

  button.classList.remove("not-active");
}

export { Button, ButtonMap };
