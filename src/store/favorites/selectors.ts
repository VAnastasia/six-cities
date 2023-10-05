import { createSelector } from '@reduxjs/toolkit';
import { Store } from '../../const';
import { State } from '../../types/state';
import { Offer } from '../../types/offer';

const getFavoritesByCity = (favorites: Offer[]) => favorites.reduce<{[key: string]: Offer[]}>((acc, current) => {
  const city = current.city.name;

  if (!(city in acc)) {
    acc[city] = [];
  }
  acc[city].push(current);

  return acc;
}, {});

export const getFavorites = (state: Pick<State, Store.Favorites>) => state[Store.Favorites].favorites;
export const getFetchingStatus = (state: Pick<State, Store.Favorites>) => state[Store.Favorites].fetchingStatus;

export const getFavoritesByCities = createSelector(
  [getFavorites],
  (favorites) => getFavoritesByCity(favorites)
);
