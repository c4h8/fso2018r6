import * as types from '../actionTypes';
import service from '../service';
import { createNotification } from './notificationActions';

const getId = () => (100000*Math.random()).toFixed(0);

const createAnecdote = payload => ({
  type: types.CREATE_ANECDOTE,
  payload
});

const voteAnecdote = payload => ({
  type: types.VOTE_ANECDOTE,
  payload
});

export const setAnecdotes = payload => ({
  type: types.SET_ANECDOTES,
  payload
});

export const postAnecdote = (content) => {
  const payload = ({ content, id: getId(), votes:0 });

  return (dispatch) => {
    service.createAnecdote(payload)
      .then(res => dispatch(createAnecdote(res.data)))
      .catch(() => dispatch(createNotification({ message: 'failed to create a new anecdote' })));
  };
};

export const postVote = (id) => {
  return (dispatch, getState) => {
    const oldAnecdote = getState().anecdotes.find(a => a.id === id);

    oldAnecdote && service.voteAnecdote({ ...oldAnecdote, votes: oldAnecdote.votes + 1 })
      .then((res) => {
        dispatch(voteAnecdote(res.data));
        dispatch(createNotification({ message: 'voted anecdote' }, 1));
      })
      .catch(() => dispatch(createNotification({ message: 'failed to create a vote anecdote' })));
  };
};
