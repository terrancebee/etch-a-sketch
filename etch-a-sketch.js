const resetButton = document.querySelector(".js-reset");
const changeGridButton = document.querySelector(".js-change-grid");
const grid = document.querySelector(".js-grid");
const DEFAULT_GRID_SIZE = 16;

function setGrid(grid, size = DEFAULT_GRID_SIZE) {
  setGridSize(grid, size);
  createGrid(grid, size);
}

function createGrid(grid, size) {
  for (let i = 0; i < size; i++) {
    for (let i = 0; i < size; i++) {
      let square = document.createElement("div");
      square.classList.add("square");
      grid.appendChild(square);
    }
  }
}

function setGridSize(grid, size) {
  currentGridSize = size;
  grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  grid.style.gridTemplateRows = `repeat(${size}, 1fr)`;
}

function deleteChildren(node) {
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
}

function resetGrid(grid, size = DEFAULT_GRID_SIZE) {
  deleteChildren(grid);
  setGrid(grid, size);
}

function clearGrid(grid) {
  for (let square of grid.querySelectorAll(".square")) {
    square.removeAttribute("style");
  }
}

resetButton.addEventListener("click", (evt) => {
  clearGrid(grid)
});

changeGridButton.addEventListener("click", (evt) => {
  let userInput = prompt("Pick a number between 2 and 100 to change the square size.");
  let number = parseInt(userInput, 10);

  while (userInput != null) {
    if (number > 2 && number < 100) break;

    if (Number.isNaN(number)) {
      userInput = prompt("Oops, that's not a number! We need one between 2 and 100!")
    } else {
      userInput = prompt("That number was out of range, please pick a number between 2 and 100.");
    }
    
    number = parseInt(userInput, 10);
  }

  if (userInput == null) return;

  resetGrid(grid, number);
});

grid.addEventListener("mouseover", (evt) => {
  if (evt.target.classList.contains("square")) {
    const opacity = getComputedStyle(evt.target).getPropertyValue("--opacity");

    if (opacity >= 1) return;

    evt.target.style.setProperty("--opacity", parseFloat(opacity, 10) + .1);
  }
});

resetGrid(grid);