(function() {
  'use stricts';

  var searchElement = document.getElementById('search');
  var listElement = document.getElementById('list');
  var viewElement = document.getElementById('view');

  var viewComponent = new ViewComponent(viewElement);
  var listComponent = new ListComponent(listElement, viewComponent);
  var searchComponent = new SearchComponent(searchElement, listComponent);

  console.log(viewComponent);
  console.log(listComponent);
  console.log(searchComponent);
  
})();
