import { initialState } from './index';
import { TOGGLE_VIEW_FILTER } from '../types';

export const viewFilterReducer = (state= initialState,  action) => {
    switch(action.type) {
        case TOGGLE_VIEW_FILTER:
        return {
            ...state,
            favsOnly: !state.favsOnly
        }

        default:
        return state;
    }
}