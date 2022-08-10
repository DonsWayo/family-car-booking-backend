// noinspection ES6PreferShortImport

import {
  FAMILY_HONDA_CAR_NUMBER,
  STRANGERS_BMW,
  // todo try to make possible to have short imports here as well. Might need to have just one single tsconfig for the entire project
} from '../services/core/car/car.constants';
import { FamilyCarBookingApp } from '../services/db/db.service';

(async () => {
  await Promise.all([
    // remove users
    FamilyCarBookingApp.entities.user.delete({ username: 'papa' }).go(),
    FamilyCarBookingApp.entities.user.delete({ username: 'ilya' }).go(),
    FamilyCarBookingApp.entities.user.delete({ username: 'masha' }).go(),
    FamilyCarBookingApp.entities.user
      .delete({ username: 'stranger' })
      .go(),

    // remove cars
    FamilyCarBookingApp.entities.car
      .delete({ carId: FAMILY_HONDA_CAR_NUMBER })
      .go(),

    FamilyCarBookingApp.entities.car.delete({ carId: STRANGERS_BMW }).go(),
  ]);

  await removeAllBookingSeeds();
})();

async function removeAllBookingSeeds() {
  const allSeedBookings = await Promise.all([
    FamilyCarBookingApp.entities.booking.query
      .bookingsByUser({
        username: 'ilya',
        carId: FAMILY_HONDA_CAR_NUMBER,
      })
      .go(),
    FamilyCarBookingApp.entities.booking.query
      .bookingsByUser({
        username: 'papa',
        carId: FAMILY_HONDA_CAR_NUMBER,
      })
      .go(),
    FamilyCarBookingApp.entities.booking.query
      .bookingsByUser({
        username: 'masha',
        carId: FAMILY_HONDA_CAR_NUMBER,
      })
      .go(),
    FamilyCarBookingApp.entities.booking.query
      .bookingsByUser({
        username: 'stranger',
        carId: 'bmw-789',
      })
      .go(),
  ]);

  const testBookingsToRemove = allSeedBookings.flat(1).map((booking) => {
    return FamilyCarBookingApp.entities.booking
      .delete({
        username: booking.username,
        carId: booking.carId,
        startTime: booking.startTime,
      })
      .go();
  });

  await Promise.all(testBookingsToRemove);
}
