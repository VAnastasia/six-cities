import { City as CityType } from './types/offer';

export const Setting = {
  OffersCount: 6
};

export enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Main = '/',
  Offer = '/offer/'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export enum APIRoute {
  Offers = '/offers',
  Login = '/login',
  Logout = '/logout',
  Favorite = '/favorite',
  Comments = '/comments'
}

export enum City {
  Paris = 'Paris',
  Cologne = 'Cologne',
  Brussels = 'Brussels',
  Amsterdam = 'Amsterdam',
  Hamburg = 'Hamburg',
  Dusseldorf = 'Dusseldorf'
}

export const CityMap: Record<City, CityType> = {
  [City.Paris]: {
    name: City.Paris,
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13
    }
  },
  [City.Cologne]: {
    name: City.Cologne,
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13
    }
  },
  [City.Brussels]: {
    name: City.Brussels,
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13
    }
  },
  [City.Amsterdam]: {
    name: City.Amsterdam,
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13
    }
  },
  [City.Hamburg]: {
    name: City.Hamburg,
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13
    }
  },
  [City.Dusseldorf]: {
    name: City.Dusseldorf,
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13
    }
  },
} as const;

export enum SortType {
  Popular = 'Popular',
  Asc = 'Price: low to high',
  Desc = 'Price: high to low',
  Rated = 'Top rated first'
}

export enum ResourcePath {
  Pin = '/img/pin.svg',
  PinActive = '/img/pin-active.svg'
}

export enum MapSettings {
  PinIconSizeX = 27,
  PinIconSizeY = 39,
  PinIconAnchorX = 13,
  PinIconAnchorY = 39,
  PinActiveIconSizeX = 27,
  PinActiveIconSizeY = 39,
  PinActiveIconAnchorX = 13,
  PinActiveIconAnchorY = 39,
}

export enum Store {
  Offers = 'offers',
  Details = 'details',
  Comments = 'comments',
  Favorites = 'favorites',
  Auth = 'auth'
}

export enum RequestStatus {
  Init = 'init',
  Pending = 'pending',
  Success = 'success',
  Error = 'error'
}

export enum OfferCardType {
  Cities = 'cities',
  Favorites = 'favorites'
}
