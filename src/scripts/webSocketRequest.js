export { socket };
import { URL } from './config';
import Chat from './Chat';
const socket = new WebSocket(URL);
const chat = new Chat();

socket.onopen = () => {};

socket.onmessage = (e) => {
  chat.printMessage(JSON.parse(e.data));
  chat.scrollDialog();
  chat.clearInput();
};

socket.onerror = (error) => {
  chat.errorMessage(error);
};

socket.onclose = (e) => {
  if (!e.wasClean) {
    chat.closeConnectionMessage();
  }
};
