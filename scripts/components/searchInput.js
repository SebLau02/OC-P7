import { crossSmall, searchSm } from "../constants";

const SearchInputMap = new Map();

const defaultProps = {
  placeholder: "Rechercher une recette, un ingrédient ...",
  type: "text",
  name: "search",
  id: "search",
};

function SearchInput({ props = {} || defaultProps }) {
  const { class: customClass, ...rest } = props; // exclude class from props

  const inputContainer = document.createElement("div");
  inputContainer.setAttribute(
    "class",
    `search-input-base input-base ${customClass} `,
  );

  const input = document.createElement("input");

  // spread input props
  const mergedProps = { ...defaultProps, ...rest };
  Object.entries(mergedProps).forEach(([k, v]) => {
    input.setAttribute(k, v);
  });
  input.setAttribute("class", "input-field text-body1");

  // create end adornment
  const endAdornment = document.createElement("div");
  endAdornment.setAttribute("class", "end-adornment");
  // create clear button
  const clearButton = document.createElement("button");
  clearButton.setAttribute(
    "class",
    "button-base icon-button sm clear-button hidden",
  );
  clearButton.innerHTML = crossSmall;
  endAdornment.appendChild(clearButton);
  //create search button
  const searchButton = document.createElement("button");
  searchButton.setAttribute("class", "button-base icon-button sm");
  searchButton.innerHTML = searchSm;
  endAdornment.appendChild(searchButton);

  inputContainer.appendChild(input);
  inputContainer.appendChild(endAdornment);

  handleClearInput(inputContainer);

  return inputContainer;
}

// set up for present search inputs in the DOM
const searchInput = document.querySelectorAll(".search-input-base");
function handleFocusInput() {
  Array.from(searchInput).forEach((element) => {
    handleClearInput(element);
  });
}

function handleClearInput(element) {
  const input = element.querySelector("input");
  const clearButton = element.querySelector(".clear-button");

  const clearInput = () => {
    input.value = "";
    clearButton.classList.add("hidden");
    input.dispatchEvent(new CustomEvent("inputCleared"));
  };

  const inputListeners = {
    input: () => {
      if (input.value.length === 0) {
        clearButton.removeEventListener("click", clearInput);
        clearButton.classList.add("hidden");
      } else {
        clearButton.addEventListener("click", clearInput);
        clearButton.classList.remove("hidden");
      }
    },
    focus: () => {
      element.classList.add("focused");
    },
    blur: () => {
      element.classList.remove("focused");
    },
    removeElement: () => {
      input.removeEventListener("focus", inputListeners.focus);
      input.removeEventListener("blur", inputListeners.blur);
      input.removeEventListener("input", inputListeners.input);
      clearButton.removeEventListener("click", clearInput);
      SearchInputMap.delete(element);
      element.remove();
    },
  };
  SearchInputMap.set(element, inputListeners);

  input.addEventListener("focus", inputListeners.focus);
  input.addEventListener("blur", inputListeners.blur);
  input.addEventListener("input", inputListeners.input);
}

export { SearchInput, handleFocusInput, handleClearInput, SearchInputMap };
