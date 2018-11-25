var SearchComponent;

SearchComponent = (function() {
  'use stricts';

  function _search(element) {
    if (!(element instanceof HTMLElement)) {
      throw 'First argument must be an instance of HTMLElement';
    }

    this.form = element.querySelector('form') || null;

    if (this.form === null) {
      throw 'Form element was not found';
    }

    this.form.onsubmit = _onSubmit.bind(this);
  }

  function _onSubmit(event) {
    event.preventDefault();

    YouTubeApi.search(term.value, function(data) {
      EventService.emit('onLoadData', { data: data.items });
    });
  }

  return _search;
})();
