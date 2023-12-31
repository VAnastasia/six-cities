import { Store } from '../../const';
import { State } from '../../types/state';

export const getDetails = (state: Pick<State, Store.Details>) => state[Store.Details].details;
export const getFetchingStatus = (state: Pick<State, Store.Details>) => state[Store.Details].fetchingStatus;

