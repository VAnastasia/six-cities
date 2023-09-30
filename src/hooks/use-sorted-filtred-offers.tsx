import { useMemo } from 'react';
import { SortTypes } from '../const';
import { Offer } from '../types/offer';

const sortOffers = {
  [SortTypes.Popular]: (offersBySort: Offer[]) => offersBySort,
  [SortTypes.Asc]: (offersBySort: Offer[]) => offersBySort.slice().sort((a, b) => a.price - b.price),
  [SortTypes.Desc]: (offersBySort: Offer[]) => offersBySort.slice().sort((a, b) => b.price - a.price),
  [SortTypes.Rated]: (offersBySort: Offer[]) => offersBySort.slice().sort((a, b) => b.rating - a.rating),
};

export const useSortedFiltredOffers = (
  offers: Offer[],
  currentSortType: SortTypes,
  activeCity: string,
) => useMemo(() => {
  const offersByCity = offers.filter((offer) => offer.city.name === activeCity);
  const offersBySort = sortOffers[currentSortType](offersByCity);
  return offersBySort;
}, [offers, currentSortType, activeCity]);

