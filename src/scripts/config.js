const $ = require('jquery');
const URL = 'wss://fep-app.herokuapp.com';
const messageInfo = {
  type: 'message',
  payload: {
    username: 'Artur',
    message: '',
  },
};
const elements = { $btnAdd: $('#inputGroup-sizing-lg'), $inputChat: $('#inputChat'), $dialogContainerEl: $('#dialogList') };

const templates = {
  message: `
        <li class="list__message">
                <span class="user__icon">{{user}}</span>
                <span class="message">
                {{message}}
                </span>

                <span class="time">{{time}}</span>
              </li>
`,
  closeConnection: `<h1 class="close-connection">Сonnection close....</h1>`,
  error: `<h1 class="error">Error {{err}}</h1>`,
};

export { URL, messageInfo, elements, templates };
