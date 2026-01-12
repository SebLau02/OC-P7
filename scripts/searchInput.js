const searchInput = document.querySelectorAll(".search-input-base");

function handleFocusInput() {
  Array.from(searchInput).forEach((element) => {
    const input = element.querySelector("input");
    const clearButton = element.querySelector(".clear-button");

    const handleClearInput = () => {
      input.value = "";
    };

    input.addEventListener("focus", () => {
      element.classList.add("focused");
    });
    input.addEventListener("blur", () => {
      element.classList.remove("focused");
    });
    input.addEventListener("input", () => {
      if (input.value.length === 0) {
        clearButton.removeEventListener("click", handleClearInput);
        clearButton.classList.add("hidden");
      } else {
        clearButton.addEventListener("click", handleClearInput);
        clearButton.classList.remove("hidden");
      }
    });
  });
}

export { handleFocusInput };
