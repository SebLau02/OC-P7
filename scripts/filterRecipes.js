import { SelectMap } from "./components/select";
import { filters, setFilters } from "./constants";

const handleFilter = () => {
  console.log(filters);
};

function handleSelectOption(option) {
  // get selected options container
  const selectedContainer =
    option.parentElement.parentElement.previousElementSibling;

  // check if option is already selected
  const selectedOptionsValues = Array.from(selectedContainer.children).map(
    (c) => c.children[0].getAttribute("data-selected-option"),
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
  deleteBtn.innerHTML = crossSmall;
  setFilters((prev) => [...prev, option.dataset.value]);
  handleFilter();

  // add event listener to delete button
  const deleteBtnListeners = {
    click: () => {
      deleteBtnListeners.removeElement();
    },
    removeElement: () => {
      deleteBtn.removeEventListener("click", deleteBtnListeners.click);
      SelectMap.delete(deleteBtn);
      setFilters((prev) =>
        prev.filter((filter) => filter !== option.dataset.value),
      );
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

export { handleFilter, handleSelectOption };
