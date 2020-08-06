const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementsByClassName("jsRange");
const modeBtn = document.getElementById("jsFill");
const saveBtn = document.getElementById("jsSave");

const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let isFilling = false;

function startPainting() {
  painting = true;
}
function stopPainting() {
  painting = false;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}
function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}
function changeBrush(event) {
  const sizeInput = event.target.value;
  ctx.lineWidth = sizeInput;
}
function modeBtnClick() {
  if (isFilling) {
    isFilling = false;
    modeBtn.innerText = "FILL";
  } else {
    isFilling = true;
    modeBtn.innerText = "PAINT";
  }
}
function handleClickCanvas() {
  if (isFilling) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
}
function handleCM(event) {
  event.preventDefault();
}
function handleClickSave() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "mypainting.png";
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleClickCanvas);
  canvas.addEventListener("contextmenu", handleCM);
}

if (colors) {
  Array.from(colors).forEach((color) =>
    color.addEventListener("click", handleColorClick)
  );
}

if (range) {
  jsRange.addEventListener("input", changeBrush);
}

if (modeBtn) {
  modeBtn.addEventListener("click", modeBtnClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", handleClickSave);
}
