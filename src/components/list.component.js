var ListComponent;

ListComponent = (function() {
  'use stricts';

  function _list(element) {
    if (!(element instanceof HTMLElement)) {
      throw 'First argument must be an instance of HTMLElement';
    }

    this.element = element;
    this.data = [];

    EventService.subscribe('onLoadData', _onLoadData.bind(this));
  }

  _list.prototype.setData = function(data) {
    this.data = data;

    _render.bind(this)();

    EventService.emit('onResetView');
  };

  function _onLoadData(event) {
    this.setData(event.data);
  }

  function _render() {
    var currentListContent, listContent;

    currentListContent = this.element.querySelector('ul');

    if (currentListContent) {
      currentListContent.remove();
    }

    if (this.data.length === 0) {
      return;
    }

    listContent = document.createElement('ul');

    this.data.forEach(function(item) {
      listContent.append(_createItem(item));
    });

    this.element.append(listContent);
  }

  function _createItem(item) {
    var p, img, li;

    p = document.createElement('p');
    img = document.createElement('img');
    li = document.createElement('li');

    p.innerText = item.snippet.title;
    img.src = item.snippet.thumbnails.medium.url;

    li.append(p);
    li.append(img);

    li.onclick = function() {
      EventService.emit('onSelectedItem', { data: item });
    };

    return li;
  }

  return _list;
})();
