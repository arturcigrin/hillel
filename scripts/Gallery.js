'use strict';

class Gallery {
  static URL_ALBUMS = 'https://jsonplaceholder.typicode.com/albums';
  static URL_PHOTOS = `https://jsonplaceholder.typicode.com/photos`;
  static LIST_ALBUM_EL = document.querySelector('#listAlbums');
  static EL_PHOTO_CONTAINER = document.querySelector('#photoContainer');
  static ATTRIBUTE_DATA_ID = 'data-id';
  static XHR = new HTTPRequests();

  constructor() {
    this._init();
  }

  static createElLi({ id, title }) {
    const li = document.createElement('li');
    li.setAttribute(Gallery.ATTRIBUTE_DATA_ID, id);
    li.textContent = `Album #${id} ` + title;

    return li;
  }

  static createImg(srcImage) {
    const img = document.createElement('img');
    img.setAttribute('src', srcImage);

    return img;
  }

  static appendElement(el, whereToInsert) {
    whereToInsert.appendChild(el);
  }

  static createUrlAlbum(id) {
    return Gallery.URL_PHOTOS + `?albumId=${id}`;
  }

  _init() {
    this._getAlbums(new HTTPRequests())
      .then(this.renderListAlbum.bind(this))
      .then(this.getFirstAlbumPhotos.bind(this))
      .catch((err) => console.error(err));

    Gallery.LIST_ALBUM_EL.addEventListener('click', this.onClickListAlbum.bind(this));
  }

  _getAlbums() {
    return Gallery.XHR.GET(Gallery.URL_ALBUMS);
  }
  _getPhotos(id) {
    return Gallery.XHR.GET(Gallery.createUrlAlbum(id));
  }

  getFirstAlbumPhotos(id) {
    this._getPhotos(id).then(this.renderPhoto);
  }

  renderPhoto(listPhoto) {
    const fragment = document.createDocumentFragment();

    listPhoto.forEach((photo) => {
      fragment.appendChild(Gallery.createImg(photo.thumbnailUrl));
    });

    Gallery.appendElement(fragment, Gallery.EL_PHOTO_CONTAINER);
  }

  renderListAlbum(listAlbums) {
    const fragment = document.createDocumentFragment();

    listAlbums.forEach((album) => {
      fragment.appendChild(Gallery.createElLi(album));
    });

    Gallery.appendElement(fragment, Gallery.LIST_ALBUM_EL);

    return listAlbums[0].id;
  }

  onClickListAlbum(e) {
    if (e.target.closest(`[${Gallery.ATTRIBUTE_DATA_ID}]`)) {
      const idAlbum = e.target.closest(`[${Gallery.ATTRIBUTE_DATA_ID}]`).dataset.id;

      this._getPhotos(idAlbum).then((listPhoto) => {
        Gallery.EL_PHOTO_CONTAINER.innerHTML = '';

        this.renderPhoto(listPhoto);
      });
    }
  }
}
