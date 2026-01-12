import { crossSmall } from "./constants.js";

const selects = document.querySelectorAll(".select-base");

function handleSelectInput() {
  Array.from(selects).forEach((select) => {
    const button = select.querySelector(".selected");
    const options = select.querySelectorAll(".option");
    const selectedoptionsContainer = select.querySelector(".selected-options");
    const searchOptionInput = select.querySelector(
      ".select-body .search-input-base input"
    );

    button.addEventListener("click", () => {
      select.classList.toggle("open");
    });

    Array.from(options).forEach((option) => {
      option.addEventListener("click", () => {
        const selectedOptionsValues = Array.from(
          selectedoptionsContainer.children
        ).map((c) => c.children[0].getAttribute("data-selected-option"));

        if (selectedOptionsValues.includes(option.dataset.value)) {
          return;
        }
        const newLi = document.createElement("li");
        const newSelection = document.createElement("div");
        newSelection.setAttribute("class", "selected-option");
        newSelection.setAttribute("data-selected-option", option.dataset.value);
        newSelection.textContent = option.textContent;

        const deleteBtn = document.createElement("button");
        deleteBtn.setAttribute(
          "class",
          "button-base icon-button sm secondary pill"
        );
        deleteBtn.innerHTML = crossSmall;
        deleteBtn.addEventListener("click", () => {
          selectedoptionsContainer.removeChild(newLi);
        });

        newSelection.appendChild(deleteBtn);

        newLi.appendChild(newSelection);
        selectedoptionsContainer.appendChild(newLi);
      });
    });

    searchOptionInput.addEventListener("input", (e) => {
      const searchValue = e.target.value.toLowerCase();

      Array.from(options).forEach((option) => {
        if (searchValue === "") {
          option.classList.remove("hidden");
        }

        !option.textContent.toLowerCase().includes(searchValue)
          ? option.classList.add("hidden")
          : option.classList.remove("hidden");
      });
    });

    searchOptionInput.addEventListener("inputCleared", (e) => {
      Array.from(options).forEach((option) => {
        option.classList.remove("hidden");
      });
    });
  });
}

export { handleSelectInput };
