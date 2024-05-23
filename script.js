// Selectors
const drawingBoard = document.querySelector(".drawing-board");
const gridSizeDisplay = document.querySelector(".grid-size-display");
const gridSizeSelector = document.querySelector("#range");
const colorModeButton = document.querySelector(".color-mode");
const rainbowModeButton = document.querySelector(".rainbow-mode");
const eraserButton = document.querySelector(".eraser");
const clearAll = document.querySelector(".clear-all");
const buttons = document.querySelectorAll(".color-mode, .rainbow-mode, .eraser, .clear-all");

gridSizeSelector.addEventListener('input', (e) => {
  const size = e.target.value;
  gridSizeDisplay.textContent = `${size} x ${size}`;
  makeGrid(size, size);
});

//********** Creating a grid in drawing board **********
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

// ********** Active class handling when user clicks on each button in menu **********

// Set initial active class
colorModeButton.classList.add("active");

// Function to handle button clicks
function handleButtonClick(event) {
  // Remove active class from all buttons
  buttons.forEach(button => button.classList.remove("active"));

  // Add active class to the clicked button
  event.target.classList.add("active");
}

// Add event listeners to buttons
buttons.forEach(button => button.addEventListener("click", handleButtonClick));
