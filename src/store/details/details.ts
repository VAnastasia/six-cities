import { createSlice } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { Store, RequestStatus } from '../../const';
import { fetchDetailsOfferAction } from '../api-actions';

export type DetailsState = {
  details: Offer | null;
  fetchingStatus: RequestStatus;
}

const initialState: DetailsState = {
  details: null,
  fetchingStatus: RequestStatus.Init
};

export const detailsStore = createSlice({
  name: Store.Details,
  initialState,
  reducers: {
    resetDetailsOffer(state) {
      state.details = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchDetailsOfferAction.pending, (state) => {
        state.fetchingStatus = RequestStatus.Pending;
      })
      .addCase(fetchDetailsOfferAction.fulfilled, (state, action) => {
        state.fetchingStatus = RequestStatus.Success;
        state.details = action.payload;
      })
      .addCase(fetchDetailsOfferAction.rejected, (state) => {
        state.fetchingStatus = RequestStatus.Error;
      });
  },
});

export const { resetDetailsOffer } = detailsStore.actions;
