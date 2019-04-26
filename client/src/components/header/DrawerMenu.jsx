import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ReportsIcon from '@material-ui/icons/Assignment';
import EmployeesIcon from '@material-ui/icons/SupervisorAccount';
import Badge from '@material-ui/core/Badge';
import AddIcon from '@material-ui/icons/PersonAdd';
import { Link } from 'react-router-dom';
import NotificationsIcon from '@material-ui/icons/Notifications';

const drawerWidth = 240;

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing.unit * 7 + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9 + 1,
    },
  },
});

class DrawerMenu extends Component {
  menuList = [
    {
      name: 'Employees',
      path: '/employee/list',
      icon: <EmployeesIcon />,
    },
    {
      name: 'Add Employee',
      path: '/employee/add',
      icon: <AddIcon />,
    },
    {
      name: 'Notifications',
      path: '/employee/notifications',
      icon: <NotificationsIcon />,
      badge: true,
    },
    {
      name: 'Reports',
      path: '/employee/reports',
      icon: <ReportsIcon />,
    },
  ];

  notificationMenuItem = () => (
    <IconButton component={Link} to="/employee/notifications" color="inherit">
      <Badge badgeContent={11} color="secondary">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );

  render() {
    const { handleDrawerClose, drawerOpen, classes, theme, notificationsAmount } = this.props;

    return (
      <React.Fragment>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: drawerOpen,
            [classes.drawerClose]: !drawerOpen,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: drawerOpen,
              [classes.drawerClose]: !drawerOpen,
            }),
          }}
          open={drawerOpen}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {this.menuList.map(({ name, icon, path, badge }, index) => (
              <ListItem button component={Link} to={path} key={name}>
                {badge ? (
                  <Badge badgeContent={notificationsAmount} color="secondary">
                    <ListItemIcon>{icon}</ListItemIcon>
                  </Badge>
                ) : (
                  <ListItemIcon>{icon}</ListItemIcon>
                )}
                <ListItemText primary={name} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </React.Fragment>
    );
  }
}

DrawerMenu.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ notifications }) => ({ notificationsAmount: notifications.length });

export default compose(
  withStyles(styles, { withTheme: true }),
  connect(
    mapStateToProps,
    undefined
  )
)(DrawerMenu);
