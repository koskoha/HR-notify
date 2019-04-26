import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import SecurityIcon from '@material-ui/icons/Security';
import WorkIcon from '@material-ui/icons/Work';
import VocationIcon from '@material-ui/icons/FlightTakeoff';
import MoneyIcon from '@material-ui/icons/MonetizationOn';
import CalendarIcon from '@material-ui/icons/Today';
import StatusIcon from '@material-ui/icons/AssignmentTurnedIn';
import AccountIcon from '@material-ui/icons/AccountCircle';
import format from 'date-fns/format';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: 15,
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
  details: {
    alignItems: 'center',
  },
  column: {
    flexBasis: '33.33%',
    marginLeft: 15,
  },
});

function NotificationItem(props) {
  const { classes, notification, markDone } = props;
  const {
    fullName,
    contractName,
    anniversaryDate,
    status,
    ssn,
    vacationAmtPerYear,
    proratedVacationAmt,
    hourlyRate,
    hiringDate,
  } = notification._employee;
  return (
    <div className={classes.root}>
      <ExpansionPanel>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <ListItemAvatar>
            <Avatar>
              <AccountIcon />
            </Avatar>
          </ListItemAvatar>
          <div className={classes.column}>
            <Typography className={classes.heading}>{`Anniversary date for ${fullName}`}</Typography>
            <Typography className={classes.secondary}>{format(anniversaryDate, 'DD MMM YYYY')}</Typography>
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <List className={classes.root}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <SecurityIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Social Security Number" secondary={ssn} />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <WorkIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Contract Name" secondary={contractName} />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <VocationIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Vocation Amount per Year" secondary={vacationAmtPerYear} />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <VocationIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Prorated Vocation Amount" secondary={proratedVacationAmt} />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <MoneyIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Hourly Rate" secondary={hourlyRate} />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <CalendarIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Hired Date" secondary={format(hiringDate, 'DD MMM YYYY')} />
            </ListItem>

            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <StatusIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Status" secondary={status} />
            </ListItem>
          </List>
        </ExpansionPanelDetails>
        <Divider />
        <ExpansionPanelActions>
          <Button size="small" color="primary" onClick={() => markDone(notification._id)}>
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
  markDone: PropTypes.func.isRequired,
};

export default withStyles(styles)(NotificationItem);
