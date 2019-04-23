import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import NotificationItem from './NotificationItem';

const styles = theme => ({
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class NotificationList extends Component {
  renderNotifications = () => {
    const { notifications } = this.props;
    return notifications.map(notification => <NotificationItem notification={notification} />);
  };

  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {this.renderNotifications()}
      </main>
    );
  }
}

NotificationList.defaultProps = {
  notifications: [],
};

NotificationList.propTypes = {
  classes: PropTypes.object.isRequired,
  notifications: PropTypes.array,
};

const mapStateToProps = ({ notifications }) => ({ notifications });

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    undefined
  )
)(NotificationList);
