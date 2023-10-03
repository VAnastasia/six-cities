import { createSlice } from '@reduxjs/toolkit';
import { Offer } from '../../types/offer';
import { Store, RequestStatus } from '../../const';
import { fetchFavoritesAction, statusFavoriteAction } from '../api-actions';

export type FavoritesState = {
  favorites: Offer[];
  fetchingStatus: RequestStatus;
}

const initialState: FavoritesState = {
  favorites: [],
  fetchingStatus: RequestStatus.Init
};

export const favoritesStore = createSlice({
  name: Store.Favorites,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFavoritesAction.pending, (state) => {
        state.fetchingStatus = RequestStatus.Pending;
      })
      .addCase(fetchFavoritesAction.fulfilled, (state, action) => {
        state.fetchingStatus = RequestStatus.Success;
        state.favorites = action.payload;
      })
      .addCase(fetchFavoritesAction.rejected, (state) => {
        state.favorites = [];
        state.fetchingStatus = RequestStatus.Error;
      })
      .addCase(statusFavoriteAction.fulfilled, (state, action) => {
        const { isFavorite } = action.payload;
        if (isFavorite) {
          state.favorites.push(action.payload);
        } else {
          state.favorites = state.favorites.filter(({id}) => id === action.payload.id);
        }
      });
  },
});
