const numRows = 40;
const numColumns = 50;
const brushColors = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia',
  'lime', 'teal', 'aqua', 'blue', 'navy', 'black', 'gray', 'silver', 'gold',
  'white',
];

let brushColor = brushColors[0];
let isDrawing = false;

window.onload = () => {
  let paints;
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
  table.onmouseenter = () => {
    table.style.cursor = 'cell';
  }
  table.onmouseleave = () => {
    isDrawing = false;
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

const makePaint = (color, palette) => {
  const paint = document.createElement('td');
  paint.style.backgroundColor = color;
  paint.onmouseenter = () => {
    paint.style.cursor = 'pointer';
    paint.style.border = '.1em solid gray';
  }
  paint.onmouseleave = () => {
    if (brushColor !== color) paint.style.border = '.1em solid black';
  }
  paint.onmousedown = () => {
    brushColor = color;
  }
  return paint;
}

const buildPalette = (table, brushColors) => {
  for (let i = 0; i < brushColors.length; i += 2) {
    const paintRow = document.createElement('tr');
    paintRow.appendChild(makePaint(brushColors[i], table));
    if (i + 1 < brushColors.length) {
      paintRow.appendChild(makePaint(brushColors[i + 1], table));
    }
    table.appendChild(paintRow);
  }
  paints = document.querySelectorAll('.palette td');
  resetPaintBorders(paints);
  table.onmouseup = () => {
    resetPaintBorders(paints);
  }
}

const resetPaintBorders = paints => {
  paints.forEach(paint => {
    if (paint.style.backgroundColor !== brushColor) {
      paint.style.border = '.1em solid black';
    } else {
      paint.style.border = '.3em solid black';
    }
  });
}

const addResetButton = (button, canvas) => {
  button.onclick = () => {
    canvas.innerHTML = '';
    buildCanvas(canvas, numRows, numColumns);
  }
}
