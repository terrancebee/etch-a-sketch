const resetButton = document.querySelector(".js-reset");
const changeGridButton = document.querySelector(".js-change-grid");
const grid = document.querySelector(".js-grid");

const setGrid = (grid, number = 16) => {
    setGridSize(grid, number);

    for (let i = 0; i < number; i++) {
        for (let i = 0; i < number; i++) {
            let square = document.createElement("div");
            square.classList.add("square");
            grid.appendChild(square);
        }
    }
}

const setGridSize = (grid, number) => {
    grid.style.gridTemplateColumns = `repeat(${number}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${number}, 1fr)`;
}

const deleteChildren = (node) => () => {
    while(node.lastChild) {
        node.removeChild(node.lastChild);
    }
}

const deleteGridChildren = deleteChildren(grid);

const resetGrid = (grid, number = 16) => {
    deleteGridChildren();
    setGrid(grid, number);
}

const clearGrid = (grid) => {
    const squares = grid.querySelectorAll(".square");
    [...squares].forEach((square) => { square.removeAttribute("style") });
}

resetGrid(grid);

resetButton.addEventListener("click", (evt) => { clearGrid(grid) });

changeGridButton.addEventListener("click", (evt) => {
    const number = prompt("Pick a number between 2 and 100 to change the square size.");
    if (number < 2 || number > 100) {
        const number = prompt("Please pick a number between 2 and 100 please.");
    } else {
        resetGrid(grid, number);
    }
});

grid.addEventListener("mouseover", (evt) => {
    if (evt.target.classList.contains("square")) {
        const opacity = getComputedStyle(evt.target).getPropertyValue("--opacity");        
        if (opacity >= 1) return; 
        evt.target.style.setProperty("--opacity", parseFloat(opacity, 10) + .1);
    }
});
