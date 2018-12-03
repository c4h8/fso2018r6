import * as types from '../actionTypes';

export const setFilter = filterString => ({
  type: types.SET_FILTER,
  filterString
});
