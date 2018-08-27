"use strict";

let assert = require('assert');
let sinon = require('sinon');
let TripService = require('../src/TripService');
let User = require('../src/User');

class StubUser extends User {
  constructor(friends) {
    super();
    this.friends = friends;
  }

  getFriends() { return this.friends; }
};

describe('TripService', () => {
  let tripService;

  beforeEach(() => {
    tripService = new TripService();
  });

  const createTripServiceForLoggedUser = (user, findTrips) => {
    const tripService = findTrips ? new TripService(findTrips) : new TripService();
    const getLoggedUser = sinon.stub(tripService, 'getLoggedUser');
    getLoggedUser.returns(user);
    return tripService;
  }

  it('throws when logged user is null', () => {
    tripService = createTripServiceForLoggedUser(null);

    assert.throws(() => tripService.getTripsByUser(new User()), { name: 'Error', message: 'User not logged in.' });
  });

  it('returns no trips when passed user has no friends', () => {
    tripService = createTripServiceForLoggedUser(new StubUser([]));

    const result = tripService.getTripsByUser(new StubUser([]));

    assert.deepEqual(result, []);
  });

  it('returns trips for friend user', () => {
    const inquiringUser = new StubUser([]);
    const findTripsByUser = _user => ['Prague'];
    tripService = createTripServiceForLoggedUser(inquiringUser, findTripsByUser);
    const thatUser = new StubUser([inquiringUser]);

    const result = tripService.getTripsByUser(thatUser);

    assert.deepEqual(result, ['Prague']);
  });
});
