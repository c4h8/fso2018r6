import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as anecdoteActions from '../actions/anecdoteActions';
import * as notificationActions from '../actions/notificationActions';
import Filter from './Filter';

class AnecdoteList extends React.Component {
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.props.vote(anecdote.id) }>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

AnecdoteList.propTypes = ({
  anecdotes: PropTypes.array,
  vote: PropTypes.func,
});

const mapStateToProps = (state) => {
  const regex = new RegExp(state.filter, 'i');

  return ({ anecdotes: state.anecdotes.filter(a => regex.test(a.content)) });
};

const dispatchToProps = dispatch => ({
  vote: (id) => {
    dispatch(anecdoteActions.voteAnecdote(id));
    dispatch(notificationActions.createNotification({message: 'voted anecdote'}));
  }
});


export default connect(mapStateToProps, dispatchToProps)(AnecdoteList);
