import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';

const defaultToolbarStyles = {
  iconButton: {},
};

class AddEmployee extends React.Component {
  handleClick = history => {
    history.push('/employee/add');
    console.log('history:', history);
    console.log('clicked on icon!');
  };

  render() {
    const { classes, history } = this.props;

    return (
      <React.Fragment>
        <Tooltip title="Add Employee">
          <IconButton className={classes.iconButton} onClick={() => this.handleClick(history)}>
            <AddIcon className={classes.deleteIcon} />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  }
}

export default withStyles(defaultToolbarStyles, { name: 'AddEmployee' })(AddEmployee);
