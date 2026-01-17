import { chevron, crossSmall } from "../constants";
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
  const optionsFregment = createOptionElement(
    selectedoptionsContainer,
    options,
  );
  optionsContainer.appendChild(optionsFregment);

  SelectBody.appendChild(optionsContainer);

  selectContainer.appendChild(labelButton);
  selectContainer.appendChild(SelectBody);

  handleSelectInput(selectContainer);

  return selectContainer;
}

/**
 * Setup for select input behavior
 * @param {dom element} select
 */
function handleSelectInput(select) {
  const button = select.querySelector(".selected");
  const options = select.querySelectorAll(".option");
  const selectedoptionsContainer = select.querySelector(".selected-options");
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
    const optionListeners = {
      click: () => handleClickOption(selectedoptionsContainer, option),
      removeElement: () => {
        option.removeEventListener("click", optionListeners.click);
        SelectMap.delete(option);
        option.remove();
      },
    };
    // add to SelectMap for future reference
    SelectMap.set(option, optionListeners);
    option.addEventListener("click", optionListeners.click);
  });

  // add event listener to search input
  const searchOptionInputListeners = {
    input: (e) => {
      const searchValue = e.target.value.toLowerCase();

      Array.from(select.querySelectorAll(".option")).forEach((option) => {
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

function handleClickOption(selectedoptionsContainer, option) {
  const selectedOptionsValues = Array.from(
    selectedoptionsContainer.children,
  ).map((c) => c.children[0].getAttribute("data-selected-option"));

  if (selectedOptionsValues.includes(option.dataset.value)) {
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
  deleteBtn.innerHTML = crossSmall;

  // add event listener to delete button
  const deleteBtnListeners = {
    click: () => {
      selectedoptionsContainer.removeChild(newLi);
    },
    removeElement: () => {
      deleteBtn.removeEventListener("click", deleteBtnListeners.click);
      SelectMap.delete(deleteBtn);
      deleteBtn.remove();
    },
  };
  // add to SelectMap for future reference
  SelectMap.set(deleteBtn, deleteBtnListeners);
  deleteBtn.addEventListener("click", deleteBtnListeners.click);

  newSelection.appendChild(deleteBtn);

  newLi.appendChild(newSelection);
  selectedoptionsContainer.appendChild(newLi);

  // filter recipes

  console.log("start to filter recipes");
}
// set up for present selects in the DOM
function SetUpPresentSelectsBehavior() {
  const selects = document.querySelectorAll(".select-base");

  Array.from(selects).forEach((select) => {
    handleSelectInput(select);
  });
}

function createOptionElement(selectedOptionsContainer, options) {
  const fragment = document.createDocumentFragment();

  options.forEach((option) => {
    const optionLi = document.createElement("li");
    const optionButton = document.createElement("button");
    optionButton.setAttribute("class", "option text-body2");
    optionButton.setAttribute("data-value", option.value);
    optionButton.textContent = option.label;

    const optionListeners = {
      click: () => handleClickOption(selectedOptionsContainer, optionButton),
      removeElement: () => {
        optionButton.removeEventListener("click", optionListeners.click);
        SelectMap.delete(optionButton);
        optionButton.remove();
      },
    };
    // add to SelectMap for future reference
    SelectMap.set(optionButton, optionListeners);
    optionButton.addEventListener("click", optionListeners.click);

    optionLi.appendChild(optionButton);
    fragment.appendChild(optionLi);
  });
  return fragment;
}

export {
  Select,
  SetUpPresentSelectsBehavior,
  handleSelectInput,
  createOptionElement,
};
