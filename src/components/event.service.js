var EventService;

EventService = (function() {
  function _emit(name, props) {
    var event = document.createEvent('Event');

    event.initEvent(name, true, true);

    if (props) {
      Object.keys(props).forEach(function(key) {
        if (!event[key]) {
          event[key] = props[key];
        }
      });
    }

    document.body.dispatchEvent(event);
  }

  function _subscribe(name, cb) {
    document.body.addEventListener(name, cb);
  }

  return {
    emit: _emit,
    subscribe: _subscribe,
  };
})();
