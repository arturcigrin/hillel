class HTTPLoading {
  static getTemplateLoadingEl() {
    return `
           <div id="loading" class="loading">
                <div class="spinner-border text-primary" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div> `;
  }

  loading() {
    $(HTTPLoading.getTemplateLoadingEl()).appendTo(document.body);
  }

  loadingEnd() {
    $('#loading').remove();
  }
}
