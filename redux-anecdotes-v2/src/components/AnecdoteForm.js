import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as anecdoteActions from '../actions/anecdoteActions';

class AnecdoteForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    this.props.createAnecote(content);
  
    e.target.anecdote.value = '';
  }
  
  render() {
    return (
      <div>
        <h2>create new</h2>
        <form onSubmit={this.handleSubmit}>
          <div><input name='anecdote'/></div>
          <button>create</button> 
        </form>
      </div>
    );
  }
}

AnecdoteForm.propTypes = ({
  createAnecote: PropTypes.func,
});

const mapDispatchToProps = dispatch => ({
  createAnecote: content => dispatch(anecdoteActions.createAnecdote(content))
});

export default connect(null, mapDispatchToProps)(AnecdoteForm);
