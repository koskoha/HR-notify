import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { markDone, getNotifications } from '../../../actions/notificationActions';
import NotificationItem from './NotificationItem';

const styles = theme => ({
  title: {
    fontSize: 30,
  },
  card: {
    textAlign: 'center',
  },
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
  componentDidMount = () => {
    const { getNotifications } = this.props;
    getNotifications();
  };

  handleNotificationDone = id => {
    const { markDone } = this.props;
    markDone(id);
  };

  renderNotifications = () => {
    const { notifications } = this.props;
    return notifications.map(notification => (
      <NotificationItem key={notification._id} notification={notification} markDone={this.handleNotificationDone} />
    ));
  };

  render() {
    const { classes, notifications } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {notifications.length === 0 ? (
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                No new notifications.
              </Typography>
            </CardContent>
          </Card>
        ) : (
          this.renderNotifications()
        )}
      </main>
    );
  }
}

NotificationList.defaultProps = {
  notifications: [],
};

NotificationList.propTypes = {
  classes: PropTypes.object.isRequired,
  markDone: PropTypes.func.isRequired,
  getNotifications: PropTypes.func.isRequired,
  notifications: PropTypes.array,
};

const mapStateToProps = ({ notifications }) => ({ notifications });

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { markDone, getNotifications }
  )
)(NotificationList);
