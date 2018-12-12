const numRows = 10;
const color = "red";
let isDrawing = false;

window.onload = () => {
  const canvas = document.querySelector('.canvas');
  const palette = document.querySelector('.palette');
  buildCanvas(canvas);
}

const buildCanvas = (div) => {
  for (let row = 0; row < numRows; row++) {
    const row = document.createElement('tr');
    for (let column = 0; column < numRows; column++) {
      const pixel = document.createElement('td');
      addMouseEvents(pixel);
      row.appendChild(pixel);
    }
    div.appendChild(row);
  }
}

const addMouseEvents = (el) => {
  el.onmousedown = () => {
    isDrawing = true;
    el.style.backgroundColor = color;
  }
  el.onmouseup = () => {
    isDrawing = false;
  }
  el.onmouseenter = () => {
    if (isDrawing) el.style.backgroundColor = color;
  }
}
