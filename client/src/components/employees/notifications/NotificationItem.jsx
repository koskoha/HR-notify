import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';

const styles = theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(17),
  },
  secondary: {
    fontSize: theme.typography.pxToRem(13),
    color: '#949494',
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: 'bottom',
    height: 20,
    width: 20,
  },
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
  },
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});

const renderListItems = employee => {
  // employee.map(emp => (
  //   <ListItem>
  //     <ListItemIcon>
  //       <ImageIcon />
  //     </ListItemIcon>
  //     <ListItemText primary="Single-line item" />
  //   </ListItem>
  // ));
};
function NotificationItem(props) {
  const {
    classes,
    notification: { _employee },
  } = props;
  return (
    <div className={classes.root}>
      <ExpansionPanel defaultExpanded>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <div className={classes.column}>
            <Typography className={classes.heading}>{`Anniversary date for ${_employee.fullName}`}</Typography>
            <Typography className={classes.secondary}>{_employee.anniversaryDate}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <List className={classes.root}>
            <ListItem>
              <ListItemIcon>
                <ImageIcon />
              </ListItemIcon>
              <ListItemText primary="Single-line item" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ImageIcon />
              </ListItemIcon>
              <ListItemText primary="Single-line item" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <ImageIcon />
              </ListItemIcon>
              <ListItemText primary="Single-line item" />
            </ListItem>
          </List>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small" color="primary">
            Mark as Done
          </Button>
        </ExpansionPanelActions>
      </ExpansionPanel>
    </div>
  );
}

NotificationItem.propTypes = {
  classes: PropTypes.object.isRequired,
  notification: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotificationItem);
