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
    this.data = data;

    _render.bind(this)();

    this.viewComponent.reset();
  };

  function _render() {
    var _self, currentListContent, listContent;

    _self = this;
    currentListContent = this.element.querySelector('ul');

    if (currentListContent) {
      currentListContent.remove();
    }

    if (this.data.length === 0) {
      return;
    }

    listContent = document.createElement('ul');

    this.data.forEach(function(item) {
      listContent.append(
        _createItem(item, function() {
          _self.viewComponent.setItem(item);
        })
      );
    });

    this.element.append(listContent);
  }

  function _createItem(item, onclick) {
    var p, img, li;

    p = document.createElement('p');
    img = document.createElement('img');
    li = document.createElement('li');

    p.innerText = item.snippet.title;
    img.src = item.snippet.thumbnails.medium.url;

    li.append(p);
    li.append(img);

    li.onclick = onclick;

    return li;
  }

  return _list;
})();
