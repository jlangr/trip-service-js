"use strict";

let UserSession = require('./UserSession');
let TripDAO = require('./TripDAO');

class TripService {
  constructor(findTripsByUser = TripDAO.findTripsByUser) {
    this.findTripsByUser = findTripsByUser;
  }

  getTripsByUser(thatUser) {
    if (this.getLoggedUser() === null) throw new Error('User not logged in.');
    return thatUser.isFriend(this.getLoggedUser())
      ? this.findTripsByUser(thatUser)
      : [];
  }

  getLoggedUser() {
    return UserSession.getLoggedUser();
  }
}

module.exports = TripService
