import { combineReducers } from '@reduxjs/toolkit';
// import { setSelectedOffer, setActiveCity, loadOffers, requireAuthorization } from './action';
import { Store } from '../const';
// import { Offer } from '../types/offer';
import { offersStore } from './offers/offers';
import { authStore } from './auth/auth';

// type InitialState = {
//   offers?: Offer[];
//   activeCity: City;
//   selectedOffer?: Offer['id'] | null;
//   authorizationStatus: AuthorizationStatus;
// }

// const initialState: InitialState = {
//   offers: [],
//   activeCity: City.Paris,
//   selectedOffer: null,
//   authorizationStatus: AuthorizationStatus.Unknown
// };

// const reducer = createReducer(initialState, (builder) => {
//   builder
//     .addCase(setActiveCity, (state, {payload}) => {
//       state.activeCity = payload;
//     })
//     .addCase(setSelectedOffer, (state, {payload}) => {
//       state.selectedOffer = payload;
//     })
//     .addCase(loadOffers, (state, {payload}) => {
//       state.offers = payload;
//     })
//     .addCase(requireAuthorization, (state, {payload}) => {
//       state.authorizationStatus = payload;
//     });
// });

// export {reducer};
export const reducer = combineReducers({
  [Store.Offers]: offersStore.reducer,
  [Store.Auth]: authStore.reducer,
});

