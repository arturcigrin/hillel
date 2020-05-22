window.addEventListener("load", () => {
  const shapesSelect = document.querySelector("#shapes");
  const colorInput = document.querySelector("#color-input");
  const shapeEl = document.querySelector("#shape");

  receivingAndSettingColor(colorInput.value, shapeEl);
  colorInput.addEventListener("input", onColorSelection);
  shapesSelect.addEventListener("change", onShapeSelection);
  document.addEventListener("keydown", onMovingElement);

  function receivingAndSettingColor(selectedColor, elShape) {
    elShape.style.background = selectedColor;
  }

  function onColorSelection() {
    receivingAndSettingColor(this.value, shapeEl);
  }

  function onShapeSelection() {
    shapeEl.className = `shape ${this.value}`;
  }

  function onMovingElement(e) {
    checkWhichKeyPressed(e.keyCode);
  }

  function checkWhichKeyPressed(keyCode) {
    switch (keyCode) {
      case 38:
        movingElement("top", shapeEl);
        break;
      case 40:
        movingElement("bottom", shapeEl);
        break;
      case 37:
        movingElement("left", shapeEl);
        break;
      case 39:
        movingElement("right", shapeEl);
    }
  }

  function movingElement(direction, figureEl) {
    const prevPosition = getComputedStyle(figureEl);

    switch (direction) {
      case "top":
        figureEl.style.top = `${parseInt(prevPosition.top) - 10}px`;
        break;
      case "bottom":
        figureEl.style.top = `${parseInt(prevPosition.top) + 10}px`;
        break;
      case "left":
        figureEl.style.left = `${parseInt(prevPosition.left) - 10}px`;
        break;
      case "right":
        figureEl.style.left = `${parseInt(prevPosition.left) + 10}px`;
    }
  }
});