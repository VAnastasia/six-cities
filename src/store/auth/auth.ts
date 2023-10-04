import { createSlice } from '@reduxjs/toolkit';
import { Store, AuthorizationStatus, RequestStatus } from '../../const';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { User } from '../../types/user';

type AuthState = {
  user: User | null;
  authorizationStatus: AuthorizationStatus;
  fetchingStatus: RequestStatus;
}

const initialState: AuthState = {
  user: null,
  authorizationStatus: AuthorizationStatus.Unknown,
  fetchingStatus: RequestStatus.Init,
};

export const authStore = createSlice({
  name: Store.Auth,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.pending, (state) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.Unknown;
      })
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      })
      .addCase(loginAction.pending, (state) => {
        state.fetchingStatus = RequestStatus.Pending;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.fetchingStatus = RequestStatus.Success;
      })
      .addCase(loginAction.rejected, (state) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.fetchingStatus = RequestStatus.Error;
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.user = null;
        state.authorizationStatus = AuthorizationStatus.NoAuth;
      });
  },
});
