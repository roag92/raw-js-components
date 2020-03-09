var YouTubeApi;

YouTubeApi = (function() {
  function _youTube() {
    this.config = {
      api: {
        key: 'YOUTUBE_API_KEY',
        url: 'https://www.googleapis.com/youtube/v3',
      },
      embed: {
        url: 'https://www.youtube.com/embed/',
        width: 800,
        height: 600,
      },
    };
  }

  _youTube.prototype.search = function(term, callback) {
    _getRequest(
      this.config.api.url + '/search',
      {
        part: 'snippet',
        maxResults: 10,
        q: term,
        key: this.config.api.key,
      },
      callback
    );
  };

  function _getRequest(endpoint, params, cb) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', endpoint + _buildQueryString(params), true);

    xhr.onload = function() {
      if (xhr.responseText) {
        cb(JSON.parse(xhr.responseText));
      }
    };

    xhr.send(null);
  }

  function _buildQueryString(params) {
    var queryString = '';

    Object.keys(params).forEach(function(key) {
      queryString += queryString === '' ? '?' : '&';

      queryString += key + '=' + params[key];
    });

    return queryString;
  }

  return new _youTube();
})();
