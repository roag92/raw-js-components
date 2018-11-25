describe('ViewComponent should work', function() {
  var element;

  beforeEach(function() {
    document.body.append(document.createElement('div'));

    element = document.body.querySelector('div');
  });

  afterEach(function() {
    element.remove();
  });

  it('instance ViewComponent', function() {
    var viewComponent = new ViewComponent(element);

    expect(viewComponent.element).toEqual(element);
    expect(viewComponent.item).toBeNull();

    element.remove();
  });

  it('call setItem method', function() {
    var viewComponent = new ViewComponent(element);

    expectedData = 1;

    viewComponent.setItem(1);

    expect(viewComponent.item).toEqual(expectedData);
  });
});

describe('ViewComponent should not work', function() {
  it('can throw invalid first argument instance of HTMLElement', function() {
    var firstArgumentFail = function() {
      new ViewComponent(1);
    };

    expect(firstArgumentFail).toThrow(
      'First argument must be an instance of HTMLElement'
    );
  });
});
