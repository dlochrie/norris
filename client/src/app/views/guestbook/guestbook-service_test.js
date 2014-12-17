describe('guestBookService', function() {
  var service;

  beforeEach(module('norris.guestbook'));

  beforeEach(inject(function(guestBookService) {
    service = guestBookService;
  }));

  it('should get all the guests, and start with the default list', function() {
    var guests = service.getGuests();
    expect(goog.typeOf(guests)).toBe('array');
    expect(guests).toEqual(norris.guestbook.GuestBookService.PREVIOUS_GUESTS_);
  });
});
