import { Entity } from 'electrodb';
import { dynamoDBClient } from '../db.service';
import { ELECTRO_DB_SERVICE, TABLE_NAME } from '../db.constants';

export const BookingModel = new Entity(
  {
    model: {
      entity: 'bookings',
      version: '1',
      service: ELECTRO_DB_SERVICE,
    },
    attributes: {
      username: {
        type: 'string',
        required: true,
      },
      carId: {
        type: 'string',
        required: true,
      },
      startTime: {
        type: 'number',
        required: true,
      },
      endTime: {
        type: 'number',
        required: false,
      },
      description: {
        type: 'string',
        required: false,
      },
      carLocationAfterRideText: {
        type: 'string',
        required: false,
      },
      carLocationAfterRideLat: {
        type: 'string',
        required: false,
      },
      carLocationAfterRideLong: {
        type: 'string',
        required: false,
      },
    },
    indexes: {
      bookings: {
        pk: {
          field: 'pk',
          composite: ['username'],
        },
        sk: {
          field: 'sk',
          composite: ['carId', 'startTime'],
        },
      },
    },
  },
  { client: dynamoDBClient, table: TABLE_NAME },
);
