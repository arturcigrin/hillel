import { templates, messageInfo, elements } from './config';
import { socket } from './webSocketRequest';
const $ = require('jquery');
const { $btnAdd, $dialogContainerEl, $inputChat } = elements;
const { error: templateError, message: templateMessage, closeConnection: templateCloseConnection } = templates;

export default class Chat {
  constructor() {
    $btnAdd.on('click', this.onAddMessage);
  }

  onAddMessage = (e) => {
    e.preventDefault();
    messageInfo.payload.message = this.getValueInput();
    socket.send(JSON.stringify(messageInfo));
  };

  getValueInput = () => $inputChat.val().trim();

  printMessage = ({ payload }) => $(this.createTemplate(payload)).appendTo($dialogContainerEl);

  createTemplate = ({ username, message }) => {
    return templateMessage
      .replace('{{user}}', username)
      .replace('{{message}}', message)
      .replace('{{time}}', new Date().toTimeString().split(' ')[0]);
  };

  scrollDialog = () => $dialogContainerEl.scrollTop($dialogContainerEl.prop('scrollHeight'));

  clearInput = () => $inputChat.val('');

  closeConnectionMessage = () => $dialogContainerEl.html(templateCloseConnection);

  errorMessage = (err) => $(document.body).html(templateError.replace('{{err}}', err));
}
