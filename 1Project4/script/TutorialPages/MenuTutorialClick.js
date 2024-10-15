const listItems = document.querySelectorAll(".Menu-Tutorial-Pages li a");
const firstItem = document.querySelector(
  ".Menu-Tutorial-Pages li:first-child a"
);

firstItem.style.color = "white";

function removeActiveClass() {
  listItems.forEach((item) => {
    item.classList.remove("Menu-Tutorial-active");
    item.style.color = "#333";
  });
}

listItems.forEach((item) => {
  item.addEventListener("click", function () {
    removeActiveClass();

    this.classList.add("Menu-Tutorial-active");
    this.style.color = "white";
  });
});
