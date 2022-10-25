import { userMapper } from 'services/core/user/user.mapper';
import { FamilyCarBookingApp } from 'services/db/db.service';
import { IUserDomain, SessionId } from '../user/user.types';

export enum CookieKeys {
  SESSION_ID = 'sessionId',
}

export class CookieService {
  public getSessionIdFromCookies = (cookies: string[]): SessionId => {
    return cookies.reduce((acc: SessionId, cookieString) => {
      const [key, value] = cookieString.split('=');

      if (key === CookieKeys.SESSION_ID) {
        acc = value;
      }

      return acc;
    }, '');
  };

  public checkAuthenticated = async (
    cookies: string[] | undefined,
  ): Promise<IUserDomain | false> => {
    if (!cookies) return false;

    const sessionIdFromCookies = this.getSessionIdFromCookies(cookies);

    const [user] = await FamilyCarBookingApp.entities.user.query
      .getUserBySessionId({ sessionId: sessionIdFromCookies })
      .go();

    if (!user) return false;

    return userMapper.dbToDomain(user);
  };

  public makeCookie = (
    key: string,
    value: string,
    path: string = '/',
    days = 1,
  ) => {
    const MS_IN_DAY = 86409000;

    return `${key}=${value}; Path=${path}; SameSite=None; Secure; expires=${new Date(
      new Date().getTime() + days * MS_IN_DAY,
    ).toUTCString()}`;
  };

  public buildCookieToBeRemoved(sKey: string, sPath = '/') {
    return (
      sKey +
      '=; expires=Thu, 01 Jan 1970 00:00:00 GMT' +
      (sPath ? '; path=' + sPath : '') +
      '; SameSite=None; Secure;'
    );
  }
}

export const cookieService = new CookieService();
