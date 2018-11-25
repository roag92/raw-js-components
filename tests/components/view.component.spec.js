describe('ViewComponent should work', function() {
  var element;

  beforeEach(function() {
    document.body.append(document.createElement('div'));

    element = document.body.querySelector('div');
  });

  afterEach(function() {
    element.remove();
  });

  it('should instance ViewComponent', function() {
    spyOn(EventService, 'subscribe');

    var viewComponent = new ViewComponent(element);

    expect(viewComponent.element).toEqual(element);
    expect(viewComponent.item).toBeNull();
    expect(EventService.subscribe).toHaveBeenCalledTimes(2);
  });

  it('should call setItem method', function() {
    var viewComponent = new ViewComponent(element);

    expectedData = {
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
    };

    spyOn(viewComponent, 'reset');

    viewComponent.setItem(expectedData);

    expect(viewComponent.item).toEqual(expectedData);
    expect(viewComponent.reset).toHaveBeenCalled();
  });

  it('should call reset method', function() {
    var viewComponent = new ViewComponent(element);

    spyOn(viewComponent.element, 'querySelector');

    viewComponent.reset();

    expect(viewComponent.element.querySelector).toHaveBeenCalled();
  });
});

describe('ViewComponent should not work', function() {
  it('should throw invalid first argument instance of HTMLElement', function() {
    var firstArgumentFail = function() {
      new ViewComponent(1);
    };

    expect(firstArgumentFail).toThrow(
      'First argument must be an instance of HTMLElement'
    );
  });
});
