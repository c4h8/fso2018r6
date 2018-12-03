import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Notification extends React.Component {
  render() {
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    };
    return (
      <div>
        {this.props.notifications.map(n => 
          <div style={style} key={n.id}>
            {n.message} asd
          </div>
        )}
      </div>
    );
  }
}

Notification.propTypes = ({
  notifications: PropTypes.array,
});

const mapStateToProps = state => ({
  notifications: state.notifications,
});

export default connect(mapStateToProps)(Notification);
