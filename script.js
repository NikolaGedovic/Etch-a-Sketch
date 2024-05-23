// Selectors
const drawingBoard = document.querySelector(".drawing-board");
const gridSizeDisplay = document.querySelector(".grid-size-display");
const gridSizeSelector = document.querySelector("#range");

gridSizeSelector.addEventListener('input', (e) => {
  const size = e.target.value;
  gridSizeDisplay.textContent = `${size} x ${size}`;
  makeGrid(size, size);
});

// Creating a grid in drawing board
function makeGrid(rows, cols) {
  // Clear the previous grid
  drawingBoard.innerHTML = '';

  drawingBoard.style.setProperty("--grid-rows", rows);
  drawingBoard.style.setProperty("--grid-cols", cols);
  for (let c = 0; c < (rows * cols); c++) {
    let cell = document.createElement("div");
    drawingBoard.appendChild(cell).className = "grid-item";
  }
}

// Initial grid setup
makeGrid(gridSizeSelector.value, gridSizeSelector.value);
