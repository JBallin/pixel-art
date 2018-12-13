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
  const colorPickerDiv = document.querySelector('.color-picker')
  const colorPickerInput = document.querySelector('.color-picker-input');
  const colPalette = document.querySelector('.col-palette');

  const buildCanvas = () => {
    for (let row = 0; row < numRows; row++) {
      const row = document.createElement('tr');
      for (let column = 0; column < numColumns; column++) {
        const pixel = document.createElement('td');
        addPixelMouseEvents(pixel);
        row.appendChild(pixel);
      }
      canvas.appendChild(row);
    }
    canvas.onmouseenter = () => {
      canvas.style.cursor = 'cell';
    }
    canvas.onmouseleave = () => {
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

  const makePaint = (color) => {
    const paint = document.createElement('td');
    paint.style.backgroundColor = color;
    paint.onmouseenter = () => {
      paint.style.cursor = 'pointer';
      if (brushColor !== color) paint.style.border = '.1em solid gray';
    }
    paint.onmouseleave = () => {
      if (brushColor !== color) paint.style.border = '.1em solid black';
    }
    paint.onmousedown = () => {
      brushColor = color;
    }
    return paint;
  }

  const buildPalette = () => {
    for (let i = 0; i < brushColors.length; i += 2) {
      const paintRow = document.createElement('tr');
      paintRow.appendChild(makePaint(brushColors[i], palette));
      if (i + 1 < brushColors.length) {
        paintRow.appendChild(makePaint(brushColors[i + 1], palette));
      }
      palette.appendChild(paintRow);
    }
    paints = document.querySelectorAll('.palette td');
    resetPaintBorders();
    palette.onmouseup = resetPaintBorders;
    colorPickerInput.onchange = e => {
      brushColor = e.target.value;
      resetPaintBorders();
    }
    colorPickerInput.onmouseenter = () => {
      colorPickerInput.style.cursor = 'pointer';
      if (colorPickerInput.value !== brushColor) {
        colorPickerInput.style.border = '.1em solid gray';
      }
    }
    colorPickerInput.onmouseleave = () => {
      if (colorPickerInput.value !== brushColor) {
        colorPickerInput.style.border = '.1em solid black';
      }
    }
  }

  const resetPaintBorders = () => {
    if (colorPickerInput.value === brushColor) {
      colorPickerDiv.style.border = '.3em solid black';
    } else {
      colorPickerDiv.style.border = '.1em solid black';
    }
    paints.forEach(paint => {
      if (paint.style.backgroundColor !== brushColor) {
        paint.style.border = '.1em solid black';
      } else {
        paint.style.border = '.3em solid black';
      }
    });
  }

  const addResetButton = () => {
    resetButton.onclick = () => {
      canvas.innerHTML = '';
      buildCanvas();
    }
  }

  buildCanvas();
  buildPalette();
  addResetButton();
}
