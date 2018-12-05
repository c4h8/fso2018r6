import axios from 'axios';

const baseUrl = 'http://localhost:3001';

const service = {
  getAnecdotes: axios.get(`${baseUrl}/anecdotes`),

  createAnecdote: anecdote => axios.post(`${baseUrl}/anecdotes`, anecdote),

  voteAnecdote: anecdote => axios.put(`${baseUrl}/anecdotes/${anecdote.id}`, anecdote),
};

export default service;