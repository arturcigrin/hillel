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

  static addClassElement(el, classToAdd) {
    el.classList.add(classToAdd);
  }

  static removeClassElement(el, classToRemove) {
    el.classList.remove(classToRemove);
  }

  static calculateElHeight(tabEl, tabsEl) {
    tabsEl.style.height = 0;

    tabsEl.style.height = tabEl.offsetHeight + tabEl.lastElementChild.offsetHeight + tabsEl.offsetHeight + "px";

    tabEl.lastElementChild.style.top = tabEl.offsetHeight + tabEl.offsetTop + "px";
  }

  _init() {
    this._element.addEventListener("click", this.onClickTabs);

    Tabs.addClassElement(this._element, Tabs.CLASS_TABS);

    Array.prototype.forEach.call(this._element.children, (element, index) => {
      Tabs.addClassElement(element, Tabs.CLASS_TAB);
      Tabs.addClassElement(element.firstElementChild, Tabs.CLASS_TAB_TITLE);
      Tabs.addClassElement(element.lastElementChild, Tabs.CLASS_TAB_BODY);

      if (!index) {
        Tabs.addClassElement(element, Tabs.CLASS_TAB_ACTIVE);
        Tabs.calculateElHeight(element, this._element);
      }
    });
  }

  onClickTabs(e) {
    if (e.target.closest(`.${Tabs.CLASS_TAB}`) && !e.target.closest(`.${Tabs.CLASS_TAB_ACTIVE}`)) {
      Tabs.removeClassElement(this.querySelector(`.${Tabs.CLASS_TAB_ACTIVE}`), Tabs.CLASS_TAB_ACTIVE);
      Tabs.addClassElement(e.target.closest(`.${Tabs.CLASS_TAB}`), Tabs.CLASS_TAB_ACTIVE);

      Tabs.calculateElHeight(this.querySelector(`.${Tabs.CLASS_TAB_ACTIVE}`), this);
      Tabs.calculateElHeight(this.querySelector(`.${Tabs.CLASS_TAB_ACTIVE}`), this);
    }
  }
}
