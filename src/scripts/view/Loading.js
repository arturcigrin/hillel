const $ = require('jquery');
import Template from './Template';

export default class Loading {
  static templateLoading = new Template();

  load() {
    $(Loading.templateLoading.getTemplateLoading()).appendTo(document.body);
  }

  loadingEnd() {
    $('#loading').remove();
  }

  error(err) {
    $(document.body).addClass('error').html(`<h1 class="error">Eror: ${err.status}</h1>`);
  }
}
