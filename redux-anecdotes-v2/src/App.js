import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Notification from './components/Notification';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';
import service from './service';
import { setAnecdotes } from './actions/anecdoteActions';
import { createNotification } from './actions/notificationActions';

class App extends React.Component {
  componentDidMount() {
    service.getAnecdotes
      .then(res => this.props.setInitialAnecdotes(res.data))
      .catch(() => this.props.postNotification('failed to load anecdotes'));
  }

  render() {
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

App.propTypes = ({
  anecdotes: PropTypes.array,
  setInitialAnecdotes: PropTypes.func,
  postNotification: PropTypes.func
});

const mapStateToProps = state => ({
  anecdotes: state.anecdotes,
});

const mapDispatchToProps = dispatch => ({
  setInitialAnecdotes: payload => dispatch(setAnecdotes(payload)),
  postNotification: message => dispatch(createNotification(message))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);