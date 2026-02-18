import { chevron, crossSmall, setFilters } from "../constants";
import { forEach } from "../utils/utils";
import { SearchInput } from "./searchInput";

const SelectMap = new Map();

function Select({ label = "Label", options = [] }) {
  // Create select container
  const selectContainer = document.createElement("div");
  selectContainer.setAttribute("class", `select-base`);

  // Create label button
  const labelButton = document.createElement("button");
  labelButton.setAttribute("class", `selected`);

  // Create label text
  const labelText = document.createElement("span");
  labelText.textContent = label;
  labelText.setAttribute("class", "text-body1");

  labelButton.appendChild(labelText);

  // Append chevron icon
  labelButton.innerHTML += chevron;

  // Select body
  const SelectBody = document.createElement("div");
  SelectBody.setAttribute("class", "select-body hidden");

  // create the select search input
  const searchInput = SearchInput({
    props: {
      placeholder: label,
      class: "sm mx-4",
    },
  });
  SelectBody.appendChild(searchInput);

  // create the selected options container
  const selectedoptionsContainer = document.createElement("ul");
  selectedoptionsContainer.setAttribute("class", "selected-options");
  SelectBody.appendChild(selectedoptionsContainer);

  // create the options container
  const optionsContainer = document.createElement("ul");
  optionsContainer.setAttribute("class", "options");

  // create options
  const optionsFragment = createSelectOptions({ options });
  optionsContainer.appendChild(optionsFragment);
  SelectBody.appendChild(optionsContainer);

  selectContainer.appendChild(labelButton);
  selectContainer.appendChild(SelectBody);

  handleSelectInput(selectContainer);

  return selectContainer;
}

/**
 * Create select options elements
 * @param {Array} options
 * @returns {DocumentFragment}
 */
const createSelectOptions = ({ options, name = "", ...props }) => {
  const fragment = document.createDocumentFragment();
  options.forEach((option) => {
    const opt =
      typeof option === "string" ? { label: option, value: option } : option;
    const optionLi = document.createElement("li");
    const optionButton = document.createElement("button");
    optionButton.setAttribute("class", "option text-body2");
    optionButton.setAttribute("data-value", opt.value);
    optionButton.setAttribute("name", name);
    optionButton.textContent = opt.label;
    setUpOptionListeners({ option: optionButton, ...props });

    optionLi.appendChild(optionButton);
    fragment.appendChild(optionLi);
  });
  return fragment;
};

/**
 * Setup for select input behavior
 * @param {HTMLElement} select
 */
function handleSelectInput(select) {
  const button = select.querySelector(".selected");
  const options = select.querySelectorAll(".option");
  const searchOptionInput = select.querySelector(
    ".select-body .search-input-base input",
  );

  // add event listeners
  const buttonListeners = {
    click: () => {
      select.classList.toggle("open");
    },
    removeElement: () => {
      button.removeEventListener("click", buttonListeners.click);
      SelectMap.delete(select);
      select.remove();
    },
  };
  // add to SelectMap for future reference
  SelectMap.set(select, buttonListeners);

  button.addEventListener("click", buttonListeners.click);

  Array.from(options).forEach((option) => {
    // add event listener to each option
    setUpOptionListeners({ option });
  });

  // add event listener to search input
  const searchOptionInputListeners = {
    input: (e) => {
      const searchValue = e.target.value.toLowerCase();
      const options = select.querySelectorAll(".option");

      Array.from(options).forEach((option) => {
        if (searchValue === "") {
          option.classList.remove("hidden");
        }

        !option.textContent.toLowerCase().includes(searchValue)
          ? option.classList.add("hidden")
          : option.classList.remove("hidden");
      });
    },
    inputCleared: (e) => {
      Array.from(select.querySelectorAll(".option")).forEach((option) => {
        option.classList.remove("hidden");
      });
    },
    removeElement: () => {
      searchOptionInput.removeEventListener(
        "input",
        searchOptionInputListeners.input,
      );
      searchOptionInput.removeEventListener(
        "inputCleared",
        searchOptionInputListeners.inputCleared,
      );
      SelectMap.delete(searchOptionInput);
      searchOptionInput.remove();
    },
  };
  // add to SelectMap for future reference
  SelectMap.set(searchOptionInput, searchOptionInputListeners);

  searchOptionInput.addEventListener("input", searchOptionInputListeners.input);
  searchOptionInput.addEventListener(
    "inputCleared",
    searchOptionInputListeners.inputCleared,
  );
}

const setUpOptionListeners = ({ option, onClick, onDelete }) => {
  const optionListeners = {
    click: (e) => {
      handleClickOption({ option, onDelete });
      onClick && onClick(e);
    },
    removeElement: () => {
      option.removeEventListener("click", optionListeners.click);
      option.parentElement.remove();
      SelectMap.delete(option);
    },
  };
  // add to SelectMap for future reference
  SelectMap.set(option, optionListeners);
  option.addEventListener("click", optionListeners.click);
};

const cleanOptions = (optionsContainer) => {
  forEach(Array.from(optionsContainer.children), (option) => {
    const listeners = SelectMap.get(option.children[0]);
    if (listeners && listeners.removeElement) {
      listeners.removeElement();
    }
  });
};

/**
 * Handle click on select option
 * @param {Html element} param0
 * @param {Function} param1
 */
function handleClickOption({ option, onDelete }) {
  // get selected options container
  const selectedContainer =
    option.parentElement.parentElement.previousElementSibling;

  // check if option is already selected
  const selectedOptionsValues = Array.from(selectedContainer.children).map(
    (c) => c.children[0]?.getAttribute("data-selected-option"),
  );

  if (selectedOptionsValues.includes(option.dataset.value)) {
    // option already selected, do not add again
    return;
  }

  // create new selected option element
  const newLi = document.createElement("li");
  const newSelection = document.createElement("div");
  newSelection.setAttribute("class", "selected-option text-body2");
  newSelection.setAttribute("data-selected-option", option.dataset.value);
  newSelection.textContent = option.textContent;
  const deleteBtn = document.createElement("button");
  deleteBtn.setAttribute("class", "button-base icon-button sm secondary pill");
  deleteBtn.setAttribute("data-value", option.dataset.value);
  deleteBtn.setAttribute("data-name", option.name);
  deleteBtn.innerHTML = crossSmall;

  // add event listener to delete button
  const deleteBtnListeners = {
    click: (e) => {
      deleteBtnListeners.removeElement();
      onDelete && onDelete(e);
    },
    removeElement: () => {
      deleteBtn.removeEventListener("click", deleteBtnListeners.click);
      SelectMap.delete(deleteBtn);
      newLi.remove();
    },
  };
  // add to SelectMap for future reference
  SelectMap.set(deleteBtn, deleteBtnListeners);
  deleteBtn.addEventListener("click", deleteBtnListeners.click);

  newSelection.appendChild(deleteBtn);

  newLi.appendChild(newSelection);
  selectedContainer.appendChild(newLi);
}
// set up for present selects in the DOM
const selects = document.querySelectorAll(".select-base");
function SetUpPresentSelectsBehavior() {
  forEach(Array.from(selects), (select) => {
    handleSelectInput(select);
  });
}

export {
  Select,
  SetUpPresentSelectsBehavior,
  handleSelectInput,
  createSelectOptions,
  cleanOptions,
  SelectMap,
};
