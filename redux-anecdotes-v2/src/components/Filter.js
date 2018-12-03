import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setFilter } from '../actions/filterActions';

const style = {
  marginBottom: 10
};

class Filter extends React.Component {
  handleChange = (event) => {
    const filterStr = event.target.value;
    this.props.setFilter(filterStr);
    // input-kentän arvo muuttujassa event.target.value
  }
  render() {
    return (
      <div style={style}>
        filter <input onChange={this.handleChange}/>
      </div>
    );
  }
}

Filter.propTypes = ({
  setFilter: PropTypes.func
});

const mapDispatchToProps = ({ setFilter });

export default connect(null, mapDispatchToProps)(Filter);
