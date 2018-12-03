import * as types from '../actionTypes';

export const createAnecdote = content => ({
  type: types.CREATE_ANECDOTE,
  content
});

export const voteAnecdote = id => ({
  type: types.VOTE_ANECDOTE,
  id
});
