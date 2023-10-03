import { createSelector } from '@reduxjs/toolkit';
import { City, Store } from '../../const';
import { State } from '../../types/state';
import { SortType } from '../../const';
import { Offer } from '../../types/offer';

const sortOffers = {
  [SortType.Popular]: (offersBySort: Offer[]) => offersBySort,
  [SortType.Asc]: (offersBySort: Offer[]) => offersBySort.slice().sort((a, b) => a.price - b.price),
  [SortType.Desc]: (offersBySort: Offer[]) => offersBySort.slice().sort((a, b) => b.price - a.price),
  [SortType.Rated]: (offersBySort: Offer[]) => offersBySort.slice().sort((a, b) => b.rating - a.rating),
};

const sortFilterOffers = (offers: Offer[] = [], currentSortType: SortType, activeCity: City): Offer[] => {
  const offersByCity = offers.filter((offer) => offer.city.name === activeCity);
  const offersBySort = sortOffers[currentSortType](offersByCity);
  return offersBySort;
};

export const getOffers = (state: Pick<State, Store.Offers>) => state[Store.Offers].offers;
export const getFetchingStatus = (state: Pick<State, Store.Offers>) => state[Store.Offers].fetchingStatus;
export const getActiveCity = (state: Pick<State, Store.Offers>) => state[Store.Offers].activeCity;
export const getSelectedOffer = (state: Pick<State, Store.Offers>) => state[Store.Offers].selectedOffer;
export const getSortType = (state: Pick<State, Store.Offers>) => state[Store.Offers].sortType;
export const getOffersNearby = (state: Pick<State, Store.Offers>) => state[Store.Offers].offersNearby.slice(0, 3);

export const getOffersByFilterSort = createSelector(
  [getOffers, getSortType, getActiveCity],
  (offers, activeSort, activeCity) => sortFilterOffers(offers, activeSort, activeCity)
);

