import { AxiosInstance } from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppDispatch, State } from '../types/state.js';
// import { loadOffers, requireAuthorization } from './action';
import { saveToken, dropToken } from '../services/token';
import { APIRoute } from '../const';
import { Auth } from '../types/auth';
import { User } from '../types/user';
import { Offer } from '../types/offer.js';
import { Comment } from '../types/comment.js';

type Params = {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}

export const fetchOffersAction = createAsyncThunk<Offer[], undefined, Params>(
  'data/fetchOffers',
  async (_arg, {extra: api}) => {
    const {data} = await api.get<Offer[]>(APIRoute.Offers);
    return data;
  },
);

export const fetchDetailsOfferAction = createAsyncThunk<Offer, Offer['id'], Params>(
  'data/fetchOfferDetails',
  async (id, {extra: api}) => {
    const {data} = await api.get<Offer>(`${APIRoute.Offers}/${id}`);
    return data;
  },
);

export const fetchCommentsAction = createAsyncThunk<Comment[], Offer['id'], Params>(
  'comments/fetchComments',
  async (id, {extra: api}) => {
    const { data } = await api.get<Comment[]>(`${APIRoute.Comments}/${id}`);

    return data;
  }
);

export const postCommentAction = createAsyncThunk<Comment, {comment: Comment; offerId: Offer['id']}, Params>(
  'data/postComment',
  async ({ comment, offerId }, {extra: api}) => {
    const { data } = await api.post<Comment>(`${APIRoute.Comments}/${offerId}`, comment);

    return data;
  }
);

export const fetchOfferNearbyAction = createAsyncThunk<Offer[], Offer['id'], Params>(
  'data/fetchOfeftsNearby',
  async (id, {extra: api}) => {
    const {data} = await api.get<Offer[]>(`${APIRoute.Offers}/${id}/nearby`);

    return data;
  }
);

export const fetchFavoritesAction = createAsyncThunk<Offer[], undefined, Params>(
  'data/fetchFavorites',
  async (_arg, {extra: api}) => {
    const { data } = await api.get<Offer[]>(APIRoute.Favorite);

    return data;
  }
);

export const statusFavoriteAction = createAsyncThunk<Offer, Offer, Params>(
  'data/statusFavorite',
  async ({ id, isFavorite }, {dispatch, extra: api}) => {
    const { data } = await api.post<Offer>(`${APIRoute.Favorite}/${id}/${Number(isFavorite)}`);
    dispatch(fetchFavoritesAction());
    dispatch(fetchOffersAction());
    dispatch(fetchDetailsOfferAction(id));
    return data;
  }
);

export const checkAuthAction = createAsyncThunk<User, undefined, Params>(
  'user/checkAuth',
  async (_arg, { extra: api }) => {
    const { data } = await api.get<User>(APIRoute.Login);

    return data;
  }
);

export const loginAction = createAsyncThunk<User, Auth, Params>(
  'user/login',
  async ({login: email, password}, {extra: api}) => {
    const {data, status} = await api.post<User>(APIRoute.Login, {email, password});

    if (status >= 200 && status < 300) {
      saveToken(data.token);
    }

    return data;
  }
);

export const logoutAction = createAsyncThunk<void, undefined, Params>(
  'user/logout',
  async(_arg, { extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  }
);
