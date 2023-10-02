import { useMemo } from 'react';
import { City, SortType } from '../const';
import { Offer } from '../types/offer';

const sortOffers = {
  [SortType.Popular]: (offersBySort: Offer[]) => offersBySort,
  [SortType.Asc]: (offersBySort: Offer[]) => offersBySort.slice().sort((a, b) => a.price - b.price),
  [SortType.Desc]: (offersBySort: Offer[]) => offersBySort.slice().sort((a, b) => b.price - a.price),
  [SortType.Rated]: (offersBySort: Offer[]) => offersBySort.slice().sort((a, b) => b.rating - a.rating),
};

export const useSortedFiltredOffers = (
  offers: Offer[] = [],
  currentSortType: SortType,
  activeCity: City,
) => useMemo(() => {
  const offersByCity = offers.filter((offer) => offer.city.name === activeCity);
  const offersBySort = sortOffers[currentSortType](offersByCity);
  return offersBySort;
}, [offers, currentSortType, activeCity]);

