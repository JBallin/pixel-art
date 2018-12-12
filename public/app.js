const size = 10;
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
let color = colors[0];
let isDrawing = false;
let prevColor = 'white';

window.onload = () => {
  const canvas = document.querySelector('.canvas');
  const palette = document.querySelector('.palette');
  buildCanvas(canvas, size);
}

const buildCanvas = (div, numRows) => {
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
    prevColor = color;
  }
  el.onmouseup = () => {
    isDrawing = false;
  }
  el.onmouseenter = () => {
    if (isDrawing) {
      el.style.backgroundColor = color;
      prevColor = color;
    } else {
      prevColor = el.style.backgroundColor;
      el.style.backgroundColor = 'lightgray';
    }
  }
  el.onmouseleave = () => {
    if (!isDrawing) el.style.backgroundColor = prevColor;
  }
}
