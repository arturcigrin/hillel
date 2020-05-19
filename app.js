window.addEventListener("load", () => {
  const shapesSelect = document.querySelector("#shapes");
  const colorInput = document.querySelector("#color-input");
  const shapeEl = document.querySelector("#shape");

  receivingAndSettingColor(colorInput, shapeEl);
  colorInput.addEventListener("input", onColorSelection);
  shapesSelect.addEventListener("change", onShapeSelection);
  document.addEventListener("keydown", onMovingElement);

  function receivingAndSettingColor(colorInputEl, elShape) {
    const backgroundShape = colorInputEl.value;
    elShape.style.background = backgroundShape;
  }

  function onColorSelection() {
    receivingAndSettingColor(this, shapeEl);
  }

  function onShapeSelection() {
    const selectedShape = this.value;

    shapeEl.setAttribute("class", `shape ${selectedShape}`);
  }

  function onMovingElement(e) {
    checkWhichArrowPressed(e.key);
  }

  function checkWhichArrowPressed(keyArow) {
    switch (keyArow) {
      case "ArrowUp":
        movingElement("top", shapeEl);
        break;
      case "ArrowDown":
        movingElement("bottom", shapeEl);
        break;
      case "ArrowLeft":
        movingElement("left", shapeEl);
        break;
      case "ArrowRight":
        movingElement("right", shapeEl);
    }
  }

  function movingElement(direction, figureEl) {
    const previousPositionTop = getComputedStyle(figureEl).top;
    const previousPositionLeft = getComputedStyle(figureEl).left;

    switch (direction) {
      case "top":
        figureEl.style.top = `${parseInt(previousPositionTop) - 10}px`;
        break;
      case "bottom":
        figureEl.style.top = `${parseInt(previousPositionTop) + 10}px`;
        break;
      case "left":
        figureEl.style.left = `${parseInt(previousPositionLeft) - 10}px`;
        break;
      case "right":
        figureEl.style.left = `${parseInt(previousPositionLeft) + 10}px`;
    }
  }
});