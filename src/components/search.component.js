var SearchComponent;

SearchComponent = (function() {
  'use stricts';

  function _search(element, listComponent) {
    if (!(element instanceof HTMLElement)) {
      throw 'First argument must be an instance of HTMLElement';
    }

    if (!(listComponent instanceof ListComponent)) {
      throw 'Second argument must be an instance of ListComponent';
    }

    this.form = element.querySelector('form') || null;

    if (this.form === null) {
      throw 'Form element was not found';
    }

    this.listComponent = listComponent;

    this.form.onsubmit = _onSubmit.bind(this);
  }

  function _onSubmit(event) {
    event.preventDefault();

    var _self = this;

    YouTubeApi.search(term.value, function(data) {
      _self.listComponent.setData(data.items);
    });
  }

  return _search;
})();
