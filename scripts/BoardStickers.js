'use strict';

class Stickers {
  static URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/stickers';
  static BTN_NEW_STICKER = document.querySelector('#newSticker');
  static STICKER_CONTAINER_EL = document.querySelector('#sticksContainer');
  static TEMPLATE_STICKER = document.querySelector('#templateSticker').innerHTML;

  static XHR = new HTTPRequests();
  static LIST_STICKERS = [];
  static CLASS_STICKERS = 'stickers';
  static CLASS_BTN_DELETE = 'stickers__btn-delete';
  static CLASS_STICKERS_BODY = 'stickers__body';
  static CLASS_ERROR = 'http-error';

  static LOAD_EL = document.querySelector('#load');
  static BOARD_EL = document.querySelector('#board');
  static CLASS_NONE = 'none';
  static HEIGHT_VIEWPORT = '100vh';

  constructor() {
    this.init();
  }

  static httpError(status) {
    document.body.innerHTML = '';
    document.body.classList.add(Stickers.CLASS_ERROR);
    document.body.innerHTML = `Error: ${status}`;
  }

  static load() {
    Stickers.LOAD_EL.classList.remove(Stickers.CLASS_NONE);

    Stickers.STICKER_CONTAINER_EL.children.length
      ? (Stickers.LOAD_EL.style.height = Stickers.BOARD_EL.clientHeight + 'px')
      : (Stickers.LOAD_EL.style.height = Stickers.HEIGHT_VIEWPORT);
  }

  static loadEnd() {
    Stickers.LOAD_EL.classList.add(Stickers.CLASS_NONE);
  }

  init() {
    Stickers.load();

    this._getStickers()
      .then(this.setListStickers)
      .then(this.renderStickers.bind(this))
      .then(this.addStickersOnBoard)
      .catch(Stickers.httpError)
      .finally(Stickers.loadEnd);

    Stickers.BTN_NEW_STICKER.addEventListener('click', this.onClickBtnNewSticker.bind(this));
    Stickers.STICKER_CONTAINER_EL.addEventListener('click', this.onClickBtnDelete.bind(this));
    Stickers.STICKER_CONTAINER_EL.addEventListener('focusout', this.onChangeStikers.bind(this));
  }

  onClickBtnNewSticker(e) {
    e.preventDefault();
    Stickers.load();

    this._createSticker()
      .then((sticker) => {
        this.addNewStickInListStickers(sticker);

        return this.renderStickers(Stickers.LIST_STICKERS);
      })
      .then(this.addStickersOnBoard)
      .catch(Stickers.httpError)
      .finally(Stickers.loadEnd);
  }

  onClickBtnDelete(e) {
    e.preventDefault();

    if (e.target.classList.contains(`${Stickers.CLASS_BTN_DELETE}`)) {
      Stickers.load();

      this._deleteSticker(e.target.closest(`.${Stickers.CLASS_STICKERS}`).dataset.id)
        .then(() => this.removeSticker(e.target.closest(`.${Stickers.CLASS_STICKERS}`)))
        .catch(Stickers.httpError)
        .finally(Stickers.loadEnd);
    }
  }

  onChangeStikers(e) {
    if (e.target.classList.contains(Stickers.CLASS_STICKERS_BODY)) {
      const sticker = this.findSticker(e.target.closest(`.${Stickers.CLASS_STICKERS}`).dataset.id);
      sticker.description = e.target.value;

      this._updateSticker(sticker).catch(Stickers.httpError);
    }
  }

  _getStickers() {
    return Stickers.XHR.GET(Stickers.URL);
  }

  _createSticker() {
    return Stickers.XHR.POST(Stickers.URL);
  }

  _deleteSticker(id) {
    return Stickers.XHR.DELETE(Stickers.URL + `/${id}`);
  }

  _updateSticker(sticker) {
    return Stickers.XHR.PUT(Stickers.URL + `/${sticker.id}`, sticker);
  }

  setListStickers(stickers) {
    return (Stickers.LIST_STICKERS = stickers);
  }

  addNewStickInListStickers(stick) {
    Stickers.LIST_STICKERS.push(stick);
  }

  renderStickers(listStickers) {
    return listStickers.map((sticker) => this.createSticker(sticker)).join('');
  }

  createSticker({ id, description }) {
    return Stickers.TEMPLATE_STICKER.replace('{{id}}', id).replace('{{description}}', description);
  }

  addStickersOnBoard(stickers) {
    if (Stickers.STICKER_CONTAINER_EL.innerHTML.length) {
      Stickers.STICKER_CONTAINER_EL.innerHTML = '';
    }

    Stickers.STICKER_CONTAINER_EL.insertAdjacentHTML('afterbegin', stickers);
  }

  removeSticker(el) {
    el.remove();
    Stickers.LIST_STICKERS = Stickers.LIST_STICKERS.filter((stickers) => stickers.id !== el.dataset.id);
  }

  findSticker(id) {
    return Stickers.LIST_STICKERS.find((sticker) => sticker.id == id);
  }
}
