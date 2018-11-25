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

    // TODO: Do request

    var x = Math.floor(Math.random() * Math.floor(199));

    this.listComponent.setData(x % 2 ? [1, 2, 3] : []);
  }

  return _search;
})();
