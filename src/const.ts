export const Setting = {
  OffersCount: 6
};


export enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Main = '/',
  Offer = '/offer'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const CITIES = ['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'];

export enum SortTypes {
  Popular = 'Popular',
  Asc = 'Price: low to high',
  Desc = 'Price: high to low',
  Rated = 'Top rated first'
}
