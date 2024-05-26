document.addEventListener("DOMContentLoaded", () => {
  // Selectors
  const drawingBoard = document.querySelector(".drawing-board");
  const gridSizeDisplay = document.querySelector(".grid-size-display");
  const gridSizeSelector = document.querySelector("#range");
  const colorMode = document.querySelector(".color-mode");
  const rainbowMode = document.querySelector(".rainbow-mode");
  const eraser = document.querySelector(".eraser");
  const clearAllButton = document.querySelector(".clear-all");
  const buttons = document.querySelectorAll(".color-mode, .rainbow-mode, .eraser, .clear-all");
  let drawing = false;
  let currentColor = "#222831";
  const coloredCells = new Set();

  // Initial grid setup
  makeGrid(gridSizeSelector.value, gridSizeSelector.value);

  gridSizeSelector.addEventListener('input', (e) => {
    const size = e.target.value;
    gridSizeDisplay.textContent = `${size} x ${size}`;
    makeGrid(size, size);
  });

  // ********** Creating a grid in drawing board **********
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

  // ********** Active class handling when user clicks on each button in menu **********

  // Set initial active class
  colorMode.classList.add("active");

  // Function to handle button clicks
  function handleButtonClick(event) {
    // Remove active class from all buttons
    buttons.forEach(button => button.classList.remove("active"));

    // Add active class to the clicked button
    event.target.classList.add("active");

    // Update currentColor based on active mode
    if (event.target === colorMode) {
      currentColor = "#222831"; // Default color for color mode
    } else if (event.target === rainbowMode) {
      currentColor = "rainbow"; // Identifier for rainbow mode
    } else if (event.target === eraser) {
      currentColor = "white"; // Color for eraser mode
    } else if (event.target === clearAllButton) {
      clearAll(); // Clear all grid items and activate clear all button
    }
  }

  // Add event listeners to buttons
  buttons.forEach(button => button.addEventListener("click", handleButtonClick));

  // ********** Drawing functionality **********
  function getRandomColor() {
    let symbols = "0123456789ABCDEF";
    let randomColor = "#";
    for (let i = 0; i < 6; i++) {
      randomColor += symbols[Math.floor(Math.random() * 16)];
    }
    return randomColor;
  }

  drawingBoard.addEventListener("mousedown", () => {
    drawing = true;
  });

  drawingBoard.addEventListener("mouseup", () => {
    drawing = false;
  });

  drawingBoard.addEventListener("mousemove", (e) => {
    if (drawing) {
      const target = e.target;
      if (target.classList.contains("grid-item")) {
        if (currentColor === "rainbow") {
          // Only change color if it hasn't been colored yet
          if (!coloredCells.has(target)) {
            target.style.backgroundColor = getRandomColor();
            coloredCells.add(target);
          }
        } else {
          target.style.backgroundColor = currentColor;
          coloredCells.add(target); // Add to set for consistency
        }
      }
    }
  });

  // ********* Eraser Function Setup *********
  function setEraser() {
    eraser.classList.add("active");
    currentColor = "white";
  }

  // Event listener for eraser button
  eraser.addEventListener("click", setEraser);

  // ********* Clear All Function Setup *********
  function clearAll() {
    // Remove active class from all buttons
    buttons.forEach(button => button.classList.remove("active"));

    // Add active class to the clear all button
    clearAllButton.classList.add("active");

    // Clear all grid items
    const gridItems = drawingBoard.querySelectorAll(".grid-item");
    gridItems.forEach(item => {
      item.style.backgroundColor = "white"; // Reset to white
      coloredCells.delete(item); // Remove from the set
    });
  }

  // Event listener for clear all button
  clearAllButton.addEventListener("click", clearAll);
});
