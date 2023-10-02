import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { City, Store, RequestStatus, SortType } from '../../const';
import { fetchOffersAction } from '../api-actions';

export type OffersState = {
  offers?: Offer[];
  activeCity: City;
  selectedOffer?: Offer['id'] | null;
  sortType: SortType;
  fetchingStatus: RequestStatus;
}

const initialState: OffersState = {
  offers: [],
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
    }
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
      });
  },
});

export const { setActiveCity, setSelectedOffer } = offersStore.actions;
