describe('YouTubeApi should work', function() {
  beforeEach(function() {
    YouTubeApi.config.api.key = 'A_VALID_KEY';
  });

  it('should get configuration', function() {
    var expectedData = {
      api: {
        key: 'A_VALID_KEY',
        url: 'https://www.googleapis.com/youtube/v3',
      },
      embed: {
        url: 'https://www.youtube.com/embed/',
        width: 800,
        height: 600,
      },
    };

    expect(YouTubeApi.config).toEqual(expectedData);
    expect(YouTubeApi.search).toBeDefined();
  });

  it('should call search method', function() {
    var fakeServer, term, callback, mockResponse;

    fakeServer = sinon.createFakeServer();

    mockResponse = {
      items: [],
    };

    term = 'foo';

    callback = sinon.spy();

    fakeServer.respondWith(
      'GET',
      YouTubeApi.config.api.url +
        '/search?part=snippet&maxResults=10&q=' +
        term +
        '&key=' +
        YouTubeApi.config.api.key,
      [
        200,
        { 'Content-Type': 'application/json' },
        JSON.stringify(mockResponse),
      ]
    );

    YouTubeApi.search(term, callback);

    fakeServer.respond();

    sinon.assert.calledWith(callback, mockResponse);
  });
});
