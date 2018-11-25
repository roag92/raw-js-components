describe('EventService should work', function() {
  it('should emit event', function() {
    var mockEvent, args;

    document.body.dispatchEvent = sinon.spy();

    mockEvent = document.createEvent('Event');

    mockEvent.initEvent('test', true, true);

    mockEvent.data = [1, 2, 3];

    EventService.emit('test', { data: [1, 2, 3] });

    args = document.body.dispatchEvent.args[0];

    expect(document.body.dispatchEvent.calledOnce).toEqual(true);
    expect(args[0].type).toEqual(mockEvent.type);
    expect(args[0].data).toEqual(mockEvent.data);
  });

  it('should subscribe event', function() {
    var expected = {
      name: 'test',
      callback: function() {},
    };

    document.body.addEventListener = sinon.spy();

    EventService.subscribe(expected.name, expected.callback);

    expect(
      document.body.addEventListener.withArgs(expected.name, expected.callback)
        .calledOnce
    ).toEqual(true);
  });
});
