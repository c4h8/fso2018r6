import * as types from '../actionTypes';

// const initialState = [{ message: 'hey this renders', id: 0}];

const reducer = (state = [], action) => {
  switch (action.type) {
  case types.CREATE_NOTIFICATION:
    return [ ...state, action.content ];
  case types.DELETE_NOTIFICATION:
    return [ ...state.filter(n => n.id !== action.id) ];
  default:
    return state;
  }
};

export default reducer;
