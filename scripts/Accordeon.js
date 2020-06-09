"use strict";

function Accordeon(element) {
  this.element = element;

  this.addClassDefault();

  this.element.addEventListener("click", this.onClickItem);
}

Accordeon.CLASS_ITEM = "item";
Accordeon.CLASS_LIST = "list";
Accordeon.CLASS_TITLE = "title";
Accordeon.CLASS_BODY = "body";
Accordeon.CLASS_SHOW = "show";

Accordeon.prototype.addClassDefault = function () {
  this.element.classList.add(Accordeon.CLASS_LIST);

  Array.from(this.element.children).forEach((element) => element.classList.add(Accordeon.CLASS_ITEM));
};

Accordeon.prototype.onClickItem = function (e) {
  if (e.target.classList.contains(Accordeon.CLASS_TITLE)) {
    e.target.nextElementSibling.classList.toggle(Accordeon.CLASS_SHOW);

    Accordeon.prototype.hiddenBodyOnClick.call(this, e.target.nextElementSibling);
  }
};

Accordeon.prototype.hiddenBodyOnClick = function (targetEl) {
  this.querySelectorAll(`.${Accordeon.CLASS_BODY}`).forEach((body) => {
    if (targetEl !== body) {
      body.classList.remove(Accordeon.CLASS_SHOW);
    }
  });
};