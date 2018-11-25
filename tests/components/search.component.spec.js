describe('SearchComponent should work', function() {
  it('instance SearchComponent', function() {
    var div, element, listComponent, searchComponent;

    spyOn(window, 'ListComponent');

    div = document.createElement('div');

    div.append(document.createElement('form'));

    document.body.append(div);

    element = document.body.querySelector('div');

    listComponent = new ListComponent();
    searchComponent = new SearchComponent(element, listComponent);

    expect(searchComponent.form).toBeTruthy();
    expect(searchComponent.form.onsubmit).toBeTruthy();
    expect(searchComponent.listComponent).toEqual(listComponent);

    element.remove();
  });
});

describe('SearchComponent should not work', function() {
  it('throw invalid first argument instance of HTMLElement', function() {
    var firstArgumentFail = function() {
      new SearchComponent(1);
    };

    expect(firstArgumentFail).toThrow(
      'First argument must be an instance of HTMLElement'
    );
  });

  it('throw invalid second argument instance of ListComponent', function() {
    var div, element, secondArgumentFail;

    div = document.createElement('div');

    div.append(document.createElement('form'));

    document.body.append(div);

    element = document.body.querySelector('div');

    secondArgumentFail = function() {
      new SearchComponent(element, 1);
    };

    expect(secondArgumentFail).toThrow(
      'Second argument must be an instance of ListComponent'
    );

    element.remove();
  });

  it('throw not found form element', function() {
    var element, formNotFoud;

    spyOn(window, 'ListComponent');

    document.body.append(document.createElement('div'));

    element = document.body.querySelector('div');

    formNotFoud = function() {
      new SearchComponent(element, new ListComponent());
    };

    expect(formNotFoud).toThrow('Form element was not found');

    element.remove();
  });
});
