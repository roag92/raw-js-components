var ViewComponent;

ViewComponent = (function() {
  'use stricts';

  function _view(element) {
    if (!(element instanceof HTMLElement)) {
      throw 'First argument must be an instance of HTMLElement';
    }

    this.element = element;
    this.item = null;

    EventService.subscribe('onSelectedItem', _onSelectedItem.bind(this));
    EventService.subscribe('onResetView', _onResetView.bind(this));
  }

  _view.prototype.setItem = function(item) {
    this.reset();

    this.item = item;

    this.element.append(_createEmbed(this.item.id.videoId));
  };

  _view.prototype.reset = function() {
    var currentEmbed = this.element.querySelector('iframe');

    if (currentEmbed) {
      currentEmbed.remove();
    }
  };

  function _onSelectedItem(event) {
    this.setItem(event.data);
  }

  function _onResetView() {
    this.reset();
  }

  function _createEmbed(videoId) {
    var iframe;

    iframe = document.createElement('iframe');

    iframe.width = YouTubeApi.config.embed.width;
    iframe.height = YouTubeApi.config.embed.height;
    iframe.src = YouTubeApi.config.embed.url + videoId;

    return iframe;
  }

  return _view;
})();
