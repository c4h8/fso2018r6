import React from 'react';
import { connect } from 'react-redux';
import Notification from './components/Notification';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';

class App extends React.Component {

  render() {
    // const anecdotes = this.props.store.getState()
    return (
      <div>
        <h1>Programming anecdotes</h1>
        <Notification />
        <AnecdoteList />
        <AnecdoteForm />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state,
  anecdotes: state.anecdotes
});

export default connect(mapStateToProps)(App);