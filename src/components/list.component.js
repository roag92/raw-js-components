var ListComponent;

ListComponent = (function() {
  'use stricts';

  function _list(element, viewComponent) {
    if (!(element instanceof HTMLElement)) {
      throw 'First argument must be an instance of HTMLElement';
    }

    if (!(viewComponent instanceof ViewComponent)) {
      throw 'Second argument must be an instance of ViewComponent';
    }

    this.element = element;
    this.viewComponent = viewComponent;
    this.data = [];
  }

  _list.prototype.setData = function(data) {
    // TODO: Parse model
    this.data = data;

    _render.bind(this)();
  };

  function _render() {
    var _self = this;
    var currentListContent = this.element.querySelector('ul');

    if (currentListContent) {
      currentListContent.remove();
    }

    if (this.data.length === 0) {
      return;
    }

    var listContent = document.createElement('ul');

    this.data.forEach(function(value) {
      var item = document.createElement('li');

      item.innerText = 'My value ' + value;

      item.addEventListener('click', function() {
        _self.viewComponent.setItem(value);
      });

      listContent.append(item);
    });

    this.element.append(listContent);
  }

  return _list;
})();
