import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { City, Store, RequestStatus, SortType } from '../../const';
import { fetchOfferNearbyAction, fetchOffersAction } from '../api-actions';

export type OffersState = {
  offers: Offer[];
  offersNearby: Offer[];
  activeCity: City;
  selectedOffer?: Offer['id'] | null;
  sortType: SortType;
  fetchingStatus: RequestStatus;
}

const initialState: OffersState = {
  offers: [],
  offersNearby: [],
  activeCity: City.Paris,
  selectedOffer: null,
  sortType: SortType.Popular,
  fetchingStatus: RequestStatus.Init
};

export const offersStore = createSlice({
  name: Store.Offers,
  initialState,
  reducers: {
    setActiveCity(state, action: PayloadAction<City>) {
      state.activeCity = action.payload;
    },
    setSelectedOffer(state, action: PayloadAction<Offer['id'] | null>) {
      state.selectedOffer = action.payload;
    },
    setSortType(state, action: PayloadAction<SortType>) {
      state.sortType = action.payload;
    },

  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.fetchingStatus = RequestStatus.Pending;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.fetchingStatus = RequestStatus.Success;
        state.offers = action.payload;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.fetchingStatus = RequestStatus.Error;
      })
      .addCase(fetchOfferNearbyAction.fulfilled, (state, action) => {
        state.fetchingStatus = RequestStatus.Success;
        state.offersNearby = action.payload;
      })
      .addCase(fetchOfferNearbyAction.rejected, (state) => {
        state.offersNearby = [];
      });
  },
});

export const { setActiveCity, setSelectedOffer, setSortType } = offersStore.actions;
