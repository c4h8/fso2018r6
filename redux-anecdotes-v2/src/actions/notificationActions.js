import * as types from '../actionTypes';

const getId = () => (100000*Math.random()).toFixed(0);

const addNotification = content => ({
  type: types.CREATE_NOTIFICATION,
  content
});

const deleteNotification = id => ({
  type: types.DELETE_NOTIFICATION,
  id
});

export const createNotification = (content, lifespan = 5) => {
  const id = getId();

  return dispatch => {
    dispatch(addNotification({...content, id }));
    setTimeout(() => dispatch(deleteNotification(id)), lifespan * 1000);
  };
};

