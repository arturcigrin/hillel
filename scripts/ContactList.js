'use strict';

class ContactList {
  static URL = 'https://5dd3d5ba8b5e080014dc4bfa.mockapi.io/users';
  static XHR = new HTTPRequests();
  static LOADING = new HTTPLoading();
  static CONTACT_LIST = [];
  static TEMPLATE_CONTACT = $('#templateContact').html();
  static CLASS_TD_BODY = 'td-body';
  static CLASS_HTTP_ERROR = 'http-error';
  static CLASS_DISPLAY_NONE = 'd-none';
  static CLASS_BTN_DELETE = 'btn-delete';
  static ATTRIBUTE_NAME = 'name';
  static ATTRIBUTE_DATA_ID = 'data-id';
  static TITTLE_MODAL_WINDOW = 'Редактировать';

  constructor(tbodyEl, btnCreate, dialogFormEl, form, inputsList) {
    this.$tbody = tbodyEl;
    this.$btnCreate = btnCreate;
    this.$dialogFormEl = dialogFormEl;
    this.$form = form;
    this.$inputsForm = inputsList;
    this.init();
  }

  static httpError(res) {
    $(document.body).addClass(ContactList.CLASS_HTTP_ERROR).html(`Error: ${res}`);
  }

  static findContact(id) {
    return ContactList.CONTACT_LIST.find((contact) => contact.id == id);
  }

  static findPositionContact(id) {
    return ContactList.CONTACT_LIST.findIndex((contact) => contact.id == id);
  }

  static deleteContactInList(id) {
    ContactList.CONTACT_LIST = ContactList.CONTACT_LIST.filter((contact) => contact.id != id);
  }

  static addContactInList(contact) {
    ContactList.CONTACT_LIST.push(contact);
  }

  init() {
    ContactList.LOADING.loading();

    this.$btnCreate.on('click', this.onClickBtnCreateUser);

    $(this.$tbody).on('click', this.onClickBodyTable);

    this._getContact()
      .then(this.setContactList)
      .then(this.renderData)
      .then(this.insertTemplate)
      .catch(ContactList.httpError)
      .finally(ContactList.LOADING.loadingEnd);
  }

  _getContact() {
    return ContactList.XHR.GET(ContactList.URL);
  }

  _createContact(contactUser) {
    return ContactList.XHR.POST(ContactList.URL, contactUser);
  }

  _updateContact(contact) {
    return ContactList.XHR.PUT(ContactList.URL + `/${contact.id}`, contact);
  }

  _deleteContact(id) {
    return ContactList.XHR.DELETE(ContactList.URL + `/${id}`);
  }

  setContactList(contacts) {
    return (ContactList.CONTACT_LIST = contacts);
  }

  renderData = (listContacts) => {
    return listContacts.map((contact) => this.createTemplate(contact)).join('\n');
  };

  createTemplate(contact) {
    return Object.keys(contact).reduce((str, key) => {
      return str.replace(new RegExp('{{' + key + '}}', 'g'), contact[key]);
    }, ContactList.TEMPLATE_CONTACT);
  }

  insertTemplate = (template) => {
    $(template).appendTo(this.$tbody);
  };

  getValueInputs() {
    return this.$inputsForm.reduce((obj, input) => {
      obj[input[0].name] = input[0].value;
      return obj;
    }, {});
  }

  setValueInputs(idElement) {
    this.$inputsForm.reduce((obj, input) => {
      input[0].value = obj[input[0].id];
      return obj;
    }, ContactList.findContact(idElement));
  }

  createModalWindow = (callbackAction, title = 'Создать') => {
    this.$dialogFormEl.removeClass(ContactList.CLASS_DISPLAY_NONE);

    return this.$dialogFormEl.dialog({
      title: `${title} контакт`,
      autoOpen: false,
      modal: true,
      dialogClass: 'no-close',
      closeOnEscape: true,
      draggable: false,

      buttons: [
        {
          text: title,
          id: 'create',
          click: callbackAction,
        },
        {
          text: 'Oтмена',
          click: this.closeModalWindow.bind(this),
        },
      ],
    });
  };

  closeModalWindow() {
    $(this.$dialogFormEl).dialog('close');
    this.$form[0].reset();
  }

  createUser() {
    const userInfo = this.getValueInputs();
    this.closeModalWindow();

    ContactList.LOADING.loading();

    ContactList.XHR.POST(ContactList.URL, userInfo)
      .then((contact) => {
        ContactList.addContactInList(contact);
        return contact;
      })
      .then(this.createTemplate)
      .then(this.insertTemplate)
      .catch(ContactList.httpError)
      .finally(ContactList.LOADING.loadingEnd);
  }

  onClickBtnCreateUser = (e) => {
    e.preventDefault();

    this.createModalWindow(this.createUser.bind(this)).dialog('open');
  };

  onClickBodyTable = (e) => {
    switch (true) {
      case $(e.target).hasClass(ContactList.CLASS_BTN_DELETE):
        const contactEl = $(e.target).closest(`[${ContactList.ATTRIBUTE_DATA_ID}]`);
        this.removeContact(contactEl.data('id'), contactEl);
        break;

      case $(e.target).hasClass(ContactList.CLASS_TD_BODY):
        const element = $(e.target).closest(`[${ContactList.ATTRIBUTE_DATA_ID}]`);
        const idElement = element.data('id');

        this.setValueInputs(idElement);
        this.createModalWindow(this.updateContact.bind(this, idElement, element), ContactList.TITTLE_MODAL_WINDOW).dialog('open');
        break;
    }
  };

  removeContact = (id, el) => {
    ContactList.LOADING.loading();

    this._deleteContact(id)
      .then(() => el.remove())
      .then(ContactList.deleteContactInList.bind(null, id))
      .catch(ContactList.httpError)
      .finally(ContactList.LOADING.loadingEnd);
  };

  updateContact(id, el) {
    const contact = { ...this.getValueInputs(), id };

    this.closeModalWindow();

    ContactList.LOADING.loading();

    this._updateContact(contact)
      .then(this.createTemplate)
      .then((template) => el.replaceWith(template))
      .then(() => ContactList.CONTACT_LIST.splice(ContactList.findPositionContact(id), 1, contact))
      .catch(ContactList.httpError)
      .finally(ContactList.LOADING.loadingEnd);
  }
}
