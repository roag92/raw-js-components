describe('SearchComponent should work', function() {
  it('should instance SearchComponent', function() {
    var div, element, searchComponent;

    div = document.createElement('div');

    div.append(document.createElement('form'));

    document.body.append(div);

    element = document.body.querySelector('div');

    searchComponent = new SearchComponent(element);

    expect(searchComponent.form).toBeTruthy();
    expect(searchComponent.form.onsubmit).toBeTruthy();

    element.remove();
  });
});

describe('SearchComponent should not work', function() {
  it('should throw invalid first argument instance of HTMLElement', function() {
    var firstArgumentFail = function() {
      new SearchComponent(1);
    };

    expect(firstArgumentFail).toThrow(
      'First argument must be an instance of HTMLElement'
    );
  });

  it('should throw not found form element', function() {
    var element, formNotFoud;

    document.body.append(document.createElement('div'));

    element = document.body.querySelector('div');

    formNotFoud = function() {
      new SearchComponent(element);
    };

    expect(formNotFoud).toThrow('Form element was not found');

    element.remove();
  });
});
