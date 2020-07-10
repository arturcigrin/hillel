'use strict';

class Stickers {
  static XHR = new HTTPRequests();
  static LOADING = new HTTPLoading();
  static CLASS_ERROR = 'error';
  static CLASS_STICKERS = 'stickers';
  static ID_CONTAINER = '#stickersContainer';
  static CLASS_BTN_DELETE = 'btn-delete';
  static CLASS_STICKERS_BODY = 'stickers__body';
  static STICKERS_DEFAULT = {
    description: 'new sticker',
    x: 0,
    y: 0,
    width: 300,
    height: 200,
  };

  constructor(btnCreate, stickersContainer, template, url) {
    this.$btnCreate = btnCreate;
    this.$stickersContainerEl = stickersContainer;
    this.templateStickers = template;
    this._url = url;
    this.list_stickers = [];

    this.init();
  }

  static loading() {
    Stickers.LOADING.loading();
  }

  static loadingEnd() {
    Stickers.LOADING.loadingEnd();
  }

  static error(err) {
    $(document.body).addClass(Stickers.CLASS_ERROR).html(`Error: ${err}`);
  }

  static addStickerInList(sticker) {
    this.list_stickers.push(sticker);
    return sticker;
  }

  static findSticker(id) {
    return this.list_stickers.find((stick) => stick.id == id);
  }

  static removeSticker(id, el) {
    this.list_stickers = this.list_stickers.filter((sticker) => sticker.id != id);

    el.remove();
  }

  static draggableStikers(e) {
    $(this.$stickersContainerEl)
      .find(`.${Stickers.CLASS_STICKERS}`)
      .draggable({
        containment: `${Stickers.ID_CONTAINER}`,
        handle: `.${Stickers.CLASS_BTN_DELETE}`,
        stop: this.positionStickers,
      });
  }

  static resizableSticker() {
    $(this.$stickersContainerEl)
      .find(`.${Stickers.CLASS_STICKERS}`)
      .resizable({
        containment: `${Stickers.ID_CONTAINER}`,
        maxHeight: 500,
        maxWidth: 500,
        minHeight: 100,
        minWidth: 100,
        stop: this.sizeStickers,
      });
  }

  init() {
    Stickers.loading();

    this.$btnCreate.on('click', this.onCreateSticker);
    this.$stickersContainerEl.delegate(`.${Stickers.CLASS_STICKERS_BODY}`, 'focusout', this.onUpdateDescriptionSticker);
    this.$stickersContainerEl.delegate(`.${Stickers.CLASS_BTN_DELETE}`, 'click', this.onDeleteSticker);

    this._getStikers(this._url)
      .then(this.setListStickers)
      .then(this.renderStickers)
      .then(this.insertTemplate)
      .then(Stickers.draggableStikers.bind(this))
      .then(Stickers.resizableSticker.bind(this))
      .catch(Stickers.error)
      .finally(Stickers.loadingEnd);
  }

  onCreateSticker = (e) => {
    e.preventDefault();
    Stickers.loading();

    this._createStiker(Stickers.STICKERS_DEFAULT)
      .then(Stickers.addStickerInList.bind(this))
      .then(this.createTemplate.bind(this))
      .then(this.insertTemplate)
      .then(Stickers.draggableStikers.bind(this))
      .then(Stickers.resizableSticker.bind(this))
      .catch(Stickers.error)
      .finally(Stickers.loadingEnd);
  };

  onUpdateDescriptionSticker = (e) => {
    const idStickers = $(e.target).closest(`.${Stickers.CLASS_STICKERS}`).data('id');
    const stick = Stickers.findSticker.call(this, idStickers);

    stick.description = $(e.target).val();

    Stickers.loading();

    this._updateSticker(stick).catch(Stickers.error).finally(Stickers.loadingEnd);
  };

  onDeleteSticker = (e) => {
    const stickerEl = $(e.target).closest(`.${Stickers.CLASS_STICKERS}`);
    const idSticker = stickerEl.data('id');

    Stickers.loading();

    this._deleteSticker(idSticker)
      .then(Stickers.removeSticker.bind(this, idSticker, stickerEl))
      .catch(Stickers.error)
      .finally(Stickers.loadingEnd);
  };

  positionStickers = (e, ui) => {
    const idStickers = $(e.target).data('id');

    const stick = Stickers.findSticker.call(this, idStickers);
    stick.x = ui.offset.left;
    stick.y = ui.offset.top;

    Stickers.loading();

    this._updateSticker(stick).catch(Stickers.error).finally(Stickers.loadingEnd);
  };

  sizeStickers = (e, ui) => {
    const idStickers = $(e.target).data('id');

    const stick = Stickers.findSticker.call(this, idStickers);

    stick.width = ui.size.width;
    stick.height = ui.size.height;

    Stickers.loading();

    this._updateSticker(stick).catch(Stickers.error).finally(Stickers.loadingEnd);
  };

  _getStikers(url) {
    return Stickers.XHR.GET(url);
  }

  _createStiker(stiker) {
    return Stickers.XHR.POST(this._url, stiker);
  }

  _updateSticker(sticker) {
    return Stickers.XHR.PUT(this._url + `/${sticker.id}`, sticker);
  }

  _deleteSticker(id) {
    return Stickers.XHR.DELETE(this._url + `/${id}`);
  }

  setListStickers = (listStickers) => {
    this.list_stickers = listStickers;
    return this.list_stickers;
  };

  renderStickers = (listStickers) => {
    return listStickers.map((stickers) => this.createTemplate(stickers)).join('\n');
  };

  createTemplate(stickers = Stickers.STICKERS_DEFAULT) {
    return Object.keys(stickers).reduce((template, key) => {
      return template.replace('{{' + key + '}}', stickers[key]);
    }, this.templateStickers);
  }

  insertTemplate = (template) => {
    $(template).appendTo(this.$stickersContainerEl);
  };
}
