class Loading {
  templateLoading() {
    return `
      <div id='loading' class="loading">
        <div  class="spinner-border text-warning" role="status">
            <span class="sr-only">Loading...</span>
         </div>
    </div>`;
  }

  loading() {
    $(this.templateLoading()).appendTo(document.body);
  }

  loadingEnd() {
    $('#loading').remove();
  }

  error(err) {
    $(document.body).addClass('error').html(`<h1 class="error">Eror: ${err.status}</h1>`);
  }
}
