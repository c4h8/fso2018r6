import * as types from '../actionTypes';

const reducer = (state = '', action) => {
  switch (action.type) {
  case types.SET_FILTER:
    return action.filterString;
  default:
    return state;
  }
};

export default reducer;
