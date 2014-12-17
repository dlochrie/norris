goog.require('goog.array');

describe('GuestBookController', function() {
  var ctrl, defaultGuests;

  beforeEach(module('norris.guestbook'));

  beforeEach(inject(function($rootScope, $controller) {
    ctrl = $controller('GuestBookController', {$scope: $rootScope});
    defaultGuests = angular.copy(
        norris.guestbook.GuestBookService.PREVIOUS_GUESTS_);
  }));

  describe('when initializing', function() {
    it('should initialize the controller and guests', function() {
      var guests = ctrl.guests;
      expect(goog.typeOf(guests)).toBe('array');
      expect(guests).toEqual(defaultGuests);
    });
  });

  describe('when performing crud actions', function() {
    var guests;

    beforeEach(function() {
      ctrl.updateGuestList();
      guests = ctrl.guests;
    });

    it('should get the guests list', function() {
      expect(goog.typeOf(guests)).toBe('array');
      expect(guests).toEqual(defaultGuests);
    });

    it('should add a guest', function() {
      // Add a new guest.
      var guest = ctrl.editGuest = {
        'name': 'foo',
        'age': 100,
        'occupation': 'bar'
      };
      ctrl.addGuest();

      // Assert that the new guest is in the array.
      expect(goog.typeOf(guests)).toBe('array');
      expect(guests[guests.length - 1]).toEqual(guest);
    });

    it('should fail to add a guest with bad or missing params', function() {
      // Create an array with invalid params.
      var testCases = [null, undefined, 0, 1, true, [], {}, 'string'];
      goog.array.forEach(testCases, function(test) {
        guest = ctrl.editGuest = test;
        ctrl.addGuest();

        // Assert that the new guest (test) is NOT in the array.
        ctrl.updateGuestList();
        expect(goog.typeOf(guests)).toBe('array');
        expect(guests).toEqual(defaultGuests);
        expect(guests[guests.length - 1]).not.toEqual(test);
      });
    });

    it('should remove a guest', function() {
      var last = guests.length - 1;
      expect(guests).toContain(guests[last]);
      expect(guests.length).toEqual(6);

      // Assert that the guest at the last index can be removed.
      ctrl.removeGuest(last);
      expect(guests).not.toContain(last);
      expect(guests.length).toEqual(5);

      // Assert that the last one can be removed.
      ctrl.removeGuest(0);
      expect(guests.length).toEqual(4);
    });

    it('should NOT remove a guest at a non-existent index', function() {
      var count = guests.length;
      var testCases = [300, null, undefined, NaN, 'string', {}, []];
      goog.array.forEach(testCases, function(test) {
        ctrl.removeGuest(test);
        expect(guests.length).toEqual(count);
      });
    });
  });
});
