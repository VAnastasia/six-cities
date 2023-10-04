import { Store } from '../../const';
import { State } from '../../types/state';

export const getDetails = (state: Pick<State, Store.Details>) => state[Store.Details].details;
