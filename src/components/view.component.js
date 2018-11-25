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
    this.item = item;

    if (this.item) {
      _render.bind(this)();
    }
  };

  function _render() {
    var currentEmbed = this.element.querySelector('iframe');

    if (currentEmbed) {
      currentEmbed.remove();
    }

    this.element.append(_createEmbed(this.item.id.videoId));
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
