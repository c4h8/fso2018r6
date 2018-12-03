import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as anecdoteActions from '../actions/anecdoteActions';

class AnecdoteList extends React.Component {
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
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

const mapStateToProps = state => ({
  anecdotes: state
});

const dispatchToProps = dispatch => ({
  vote: id => dispatch(anecdoteActions.voteAnecdote(id))
});


export default connect(mapStateToProps, dispatchToProps)(AnecdoteList);
