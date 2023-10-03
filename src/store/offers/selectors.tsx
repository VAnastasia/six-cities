import { Store } from '../../const';
import { State } from '../../types/state';

export const getOffers = (state: Pick<State, Store.Offers>) => state[Store.Offers].offers;
export const getFetchingStatus = (state: Pick<State, Store.Offers>) => state[Store.Offers].fetchingStatus;
export const getActiveCity = (state: Pick<State, Store.Offers>) => state[Store.Offers].activeCity;
export const getSelectedOffer = (state: Pick<State, Store.Offers>) => state[Store.Offers].selectedOffer;
export const getSortType = (state: Pick<State, Store.Offers>) => state[Store.Offers].sortType;

