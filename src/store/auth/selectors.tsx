import { Store } from '../../const';
import { State } from '../../types/state';

export const getUser = (state: Pick<State, Store.Auth>) => state[Store.Auth].user;
