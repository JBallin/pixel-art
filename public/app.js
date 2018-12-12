const numRows = 40;
const numColumns = 50;
const brushColors = [
  'Maroon', 'Red', 'Orange', 'Yellow', 'Olive', 'Green', 'Purple', 'Fuchsia',
  'Lime', 'Teal', 'Aqua', 'Blue', 'Navy', 'Black', 'Gray', 'Silver', 'Gold',
  'White',
];

let brushColor = brushColors[0];
let isDrawing = false;

window.onload = () => {
  const canvas = document.querySelector('.canvas');
  const palette = document.querySelector('.palette');
  const resetButton = document.querySelector('.reset-button');
  buildCanvas(canvas, numRows, numColumns);
  buildPalette(palette, brushColors);
  addResetButton(resetButton, canvas);
}

const buildCanvas = (table, numRows, numColumns) => {
  for (let row = 0; row < numRows; row++) {
    const row = document.createElement('tr');
    for (let column = 0; column < numColumns; column++) {
      const pixel = document.createElement('td');
      addPixelMouseEvents(pixel);
      row.appendChild(pixel);
    }
    table.appendChild(row);
  }
}

const addPixelMouseEvents = (el) => {
  el.onmousedown = () => {
    isDrawing = true;
    el.style.backgroundColor = brushColor;
    prevBrushColor = brushColor;
  }
  el.onmouseup = () => {
    isDrawing = false;
  }
  el.onmouseenter = () => {
    if (isDrawing) {
      el.style.backgroundColor = brushColor;
      prevBrushColor = brushColor;
    } else {
      prevBrushColor = el.style.backgroundColor;
      el.style.backgroundColor = 'lightgray';
    }
  }
  el.onmouseleave = () => {
    if (!isDrawing) el.style.backgroundColor = prevBrushColor;
  }
}

const makePaint = (color) => {
  const paint = document.createElement('td');
  paint.style.backgroundColor = color;
  paint.onclick = () => {
    brushColor = color;
  }
  return paint;
}

const buildPalette = (table, brushColors) => {
  for (let i = 0; i < brushColors.length; i += 2) {
    const paintRow = document.createElement('tr');
    paintRow.appendChild(makePaint(brushColors[i]));
    if (i + 1 < brushColors.length) paintRow.appendChild(makePaint(brushColors[i + 1]));
    table.appendChild(paintRow);
  }
}

const addResetButton = (button, canvas) => {
  button.onclick = () => {
    canvas.innerHTML = '';
    buildCanvas(canvas, numRows, numColumns);
  }
}
