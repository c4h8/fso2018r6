import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as anecdoteActions from '../actions/anecdoteActions';
import Filter from './Filter';

const anecdoteStyle = ({
  padding: '5px 0px'
});

class AnecdoteList extends React.Component {
  render() {
    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {this.props.anecdotes.sort((a, b) => b.votes - a.votes).map(anecdote =>
          <div key={anecdote.id} style={anecdoteStyle}>
            <div>
              {anecdote.content}
            </div>
            <div>
              votes: {anecdote.votes} {'\u00A0'}
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
  vote: (id) => dispatch(anecdoteActions.postVote(id))
});


export default connect(mapStateToProps, dispatchToProps)(AnecdoteList);
