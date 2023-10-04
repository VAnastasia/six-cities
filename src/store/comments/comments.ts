import { createSlice } from '@reduxjs/toolkit';
import { Store, RequestStatus } from '../../const';
import { fetchCommentsAction, postCommentAction } from '../api-actions';
import { Comment } from '../../types/comment';

export type ComentsState = {
  comments: Comment[];
  fetchingStatus: RequestStatus;
  sendingStatus: RequestStatus;
}

const initialState: ComentsState = {
  comments: [],
  fetchingStatus: RequestStatus.Init,
  sendingStatus: RequestStatus.Init
};

export const commentsStore = createSlice({
  name: Store.Offers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.comments = [];
        state.fetchingStatus = RequestStatus.Pending;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.fetchingStatus = RequestStatus.Success;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.comments = [];
        state.fetchingStatus = RequestStatus.Error;
      })
      .addCase(postCommentAction.pending, (state) => {
        state.sendingStatus = RequestStatus.Pending;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.sendingStatus = RequestStatus.Success;
        state.comments.push(action.payload);
      })
      .addCase(postCommentAction.rejected, (state) => {
        state.sendingStatus = RequestStatus.Error;
      });
  },
});
