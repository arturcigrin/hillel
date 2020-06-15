"use strict";

class Tabs {
  static CLASS_TITLE = "title";
  static CLASS_BODY = "body";
  static CLASS_TABS = "tabs";
  static CLASS_TAB = "tab";
  static CLASS_TAB_TITLE = "tab-title";
  static CLASS_TAB_BODY = "tab-body";
  static CLASS_TAB_ACTIVE = "tab-active";

  constructor(element) {
    this._element = element;

    this._init();
  }

  static addClassToElement(el, classToAdd) {
    el.classList.add(classToAdd);
  }

  static removeClassElement(el, classToRemove) {
    el.classList.remove(classToRemove);
  }

  static moveElement(el, whereToMove) {
<<<<<<< Updated upstream
    el.remove();
=======
>>>>>>> Stashed changes
    whereToMove.append(el);
  }

  _init() {
    this._element.addEventListener("click", this.onClickTabs);

    Tabs.addClassToElement(this._element, Tabs.CLASS_TABS);

    Array.prototype.forEach.call(this._element.children, (element, index) => {
      Tabs.addClassToElement(element, Tabs.CLASS_TAB);
      Tabs.addClassToElement(element.firstElementChild, Tabs.CLASS_TAB_TITLE);
      Tabs.addClassToElement(element.lastElementChild, Tabs.CLASS_TAB_BODY);

      if (!index) {
<<<<<<< Updated upstream
        Tabs.addClassElement(element, Tabs.CLASS_TAB_ACTIVE);
=======
        Tabs.addClassToElement(element, Tabs.CLASS_TAB_ACTIVE);
>>>>>>> Stashed changes
        Tabs.moveElement(element.lastElementChild, this._element);
      }
    });
  }

  onClickTabs(e) {
    if (e.target.closest(`.${Tabs.CLASS_TAB}`) && !e.target.closest(`.${Tabs.CLASS_TAB_ACTIVE}`)) {
      Tabs.moveElement(this.lastElementChild, this.querySelector(`.${Tabs.CLASS_TAB_ACTIVE}`));

      Tabs.removeClassElement(this.querySelector(`.${Tabs.CLASS_TAB_ACTIVE}`), Tabs.CLASS_TAB_ACTIVE);
<<<<<<< Updated upstream

      Tabs.addClassElement(e.target.closest(`.${Tabs.CLASS_TAB}`), Tabs.CLASS_TAB_ACTIVE);

=======

      Tabs.addClassToElement(e.target.closest(`.${Tabs.CLASS_TAB}`), Tabs.CLASS_TAB_ACTIVE);

>>>>>>> Stashed changes
      Tabs.moveElement(this.querySelector(`.${Tabs.CLASS_TAB_ACTIVE}`).lastElementChild, this);
    }
  }
}