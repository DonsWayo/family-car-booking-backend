import { UserModel } from 'db/models/user';
import { EntityItem } from 'electrodb';

export type Username = string;
export type SessionId = string;

export interface IUserDomain {
  username: Username;
  sessionId?: SessionId;
  roles: string[];
  availableCars: string[];
  providedCars: string[];
  settings: {
    rideCompletionText?: string;
    notifications: {
      getNotifiedAboutBookingChanges?: boolean;
      getNotifiedAboutNewBookings?: boolean;
    };
  };
}

export type IUserDb = EntityItem<typeof UserModel>;

// for now
// might (and should) easily change
export interface IUserDto extends IUserDomain {}
