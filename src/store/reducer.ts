import { combineReducers } from '@reduxjs/toolkit';
import { Store } from '../const';
import { offersStore } from './offers/offers';
import { authStore } from './auth/auth';
import { favoritesStore } from './favorites/favorites';
import { detailsStore } from './details/details';
import { commentsStore } from './comments/comments';

export const reducer = combineReducers({
  [Store.Offers]: offersStore.reducer,
  [Store.Auth]: authStore.reducer,
  [Store.Favorites]: favoritesStore.reducer,
  [Store.Details]: detailsStore.reducer,
  [Store.Comments]: commentsStore.reducer,
});

