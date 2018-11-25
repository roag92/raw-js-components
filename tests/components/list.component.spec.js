describe('ListComponent should work', function() {
  var element;

  beforeEach(function() {
    spyOn(window, 'ViewComponent');

    document.body.append(document.createElement('div'));

    element = document.body.querySelector('div');
  });

  afterEach(function() {
    element.remove();
  });

  it('should instance ListComponent', function() {
    var listComponent, viewComponent;

    viewComponent = new ViewComponent();
    listComponent = new ListComponent(element, viewComponent);

    expect(listComponent.element).toEqual(element);
    expect(listComponent.viewComponent).toEqual(viewComponent);
    expect(listComponent.data).toEqual([]);

    element.remove();
  });

  it('should call setData method', function() {
    var viewComponent, listComponent, expectedData;

    viewComponent = new ViewComponent();

    viewComponent.reset = sinon.spy();

    listComponent = new ListComponent(element, viewComponent);

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

    sinon.assert.calledOnce(viewComponent.reset);
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

  it('should throw invalid second argument instance of ViewComponent', function() {
    var element, secondArgumentFail;

    document.body.append(document.createElement('div'));

    element = document.body.querySelector('div');

    secondArgumentFail = function() {
      new ListComponent(element, 1);
    };

    expect(secondArgumentFail).toThrow(
      'Second argument must be an instance of ViewComponent'
    );

    element.remove();
  });
});