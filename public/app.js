const size = 10;
const brushColors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet', 'white'];

let brushColor = brushColors[0];
let isDrawing = false;

window.onload = () => {
  const canvas = document.querySelector('.canvas');
  const palette = document.querySelector('.palette');
  buildCanvas(canvas, size);
  buildPalette(palette, brushColors);
}

const buildCanvas = (table, numRows) => {
  for (let row = 0; row < numRows; row++) {
    const row = document.createElement('tr');
    for (let column = 0; column < numRows; column++) {
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

const buildPalette = (table, brushColors) => {
  const paintRow = document.createElement('tr');
  for (let color of brushColors) {
    const paint = document.createElement('td');
    paint.style.backgroundColor = color;
    paint.onclick = () => {
      brushColor = color;
    }
    paintRow.appendChild(paint);
  }
  table.appendChild(paintRow);
}
