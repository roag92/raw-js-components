describe('ListComponent should work', function() {
  var element;

  beforeEach(function() {
    document.body.append(document.createElement('div'));

    element = document.body.querySelector('div');
  });

  afterEach(function() {
    element.remove();
  });

  it('should instance ListComponent', function() {
    var listComponent;

    spyOn(EventService, 'subscribe');

    listComponent = new ListComponent(element);

    expect(listComponent.element).toEqual(element);
    expect(listComponent.data).toEqual([]);
    expect(EventService.subscribe).toHaveBeenCalled();
  });

  it('should call setData method', function() {
    var listComponent, expectedData;

    spyOn(EventService, 'emit');

    listComponent = new ListComponent(element);

    expectedData = [
      {
        snippet: {
          title: 'Title',
          thumbnails: {
            medium: {
              url: 'URL',
            },
          },
        },
        id: {
          videoId: 'videoId',
        },
      },
    ];

    listComponent.setData(expectedData);

    expect(listComponent.data).toEqual(expectedData);
    expect(EventService.emit).toHaveBeenCalled();
  });
});

describe('ListComponent should not work', function() {
  it('should throw invalid first argument instance of HTMLElement', function() {
    var firstArgumentFail = function() {
      new ListComponent(1);
    };

    expect(firstArgumentFail).toThrow(
      'First argument must be an instance of HTMLElement'
    );
  });
});
