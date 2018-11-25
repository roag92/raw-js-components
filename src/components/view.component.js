var ViewComponent;

ViewComponent = (function() {
  'use stricts';

  function _view(element) {
    if (!(element instanceof HTMLElement)) {
      throw 'First argument must be an instance of HTMLElement';
    }

    this.element = element;
    this.item = null;
  }

  _view.prototype.setItem = function(item) {
    // TODO: Validate a valid item
    this.item = item;

    if (this.item) {
      _render.bind(this)();
    }
  };

  function _render() {
    // TODO: Render item
    // console.log('render');
  }

  return _view;
})();
