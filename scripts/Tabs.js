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
    this._element.addEventListener("click", this.onClickTabs);
  }

  static addClassElement(el, classToAdd) {
    el.classList.add(classToAdd);
  }

  static removeClassElement(el, classToRemove) {
    el.classList.remove(classToRemove);
  }

  static moveElement(el, whereToMove) {
    el.remove();
    whereToMove.append(el);
  }

  _init() {
    Tabs.addClassElement(this._element, Tabs.CLASS_TABS);

    Array.prototype.forEach.call(this._element.children, (element) => {
      Tabs.addClassElement(element, Tabs.CLASS_TAB);
    });

    this._element.querySelectorAll(`.${Tabs.CLASS_TITLE}`).forEach((tab, index) => {
      Tabs.addClassElement(tab, Tabs.CLASS_TAB_TITLE);

      if (!index) {
        Tabs.addClassElement(tab.parentElement, Tabs.CLASS_TAB_ACTIVE);
      }
    });

    this._element.querySelectorAll(`.${Tabs.CLASS_BODY}`).forEach((tab, index) => {
      Tabs.addClassElement(tab, Tabs.CLASS_TAB_BODY);

      if (!index) {
        Tabs.moveElement(tab, this._element);
      }
    });
  }

  onClickTabs(e) {
    if (e.target.closest(`.${Tabs.CLASS_TAB}`) && !e.target.closest(`.${Tabs.CLASS_TAB_ACTIVE}`)) {
      Tabs.moveElement(this.lastElementChild, this.querySelector(`.${Tabs.CLASS_TAB_ACTIVE}`));

      Tabs.removeClassElement(this.querySelector(`.${Tabs.CLASS_TAB_ACTIVE}`), Tabs.CLASS_TAB_ACTIVE);

      Tabs.addClassElement(e.target.closest(`.${Tabs.CLASS_TAB}`), Tabs.CLASS_TAB_ACTIVE);

      Tabs.moveElement(this.querySelector(`.${Tabs.CLASS_TAB_ACTIVE}`).lastElementChild, this);
    }
  }
}
