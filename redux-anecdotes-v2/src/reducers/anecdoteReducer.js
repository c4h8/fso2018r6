import * as types from '../actionTypes';

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ];

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   };
// };

// const initialState = anecdotesAtStart.map(asObject);

const reducer = (store = [], action) => {
  switch (action.type) {

  case types.SET_ANECDOTES:
    return action.payload;

  case types.VOTE_ANECDOTE: {
    const old = store.filter(a => a.id !== action.payload.id);

    return [...old,  action.payload ];
  }

  case types.CREATE_ANECDOTE:
    return [...store, action.payload];

  default:
    return store;
  }
};

export default reducer;
