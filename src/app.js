import Controller from './scripts/controller/Controller';
import 'bootstrap/dist/css/bootstrap.min.css';
import './less/main.less';
const $ = require('jquery');

$(() => {
  new Controller($('#root'));
});
