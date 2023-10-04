import { Store } from '../../const';
import { State } from '../../types/state';

export const getComments = (state: Pick<State, Store.Comments>) => state[Store.Comments].comments;
export const getSendingStatus = (state: Pick<State, Store.Comments>) => state[Store.Comments].sendingStatus;

