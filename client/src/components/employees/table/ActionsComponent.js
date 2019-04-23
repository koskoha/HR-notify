import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Clear';
import Fab from '@material-ui/core/Fab';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { deleteEmployee } from '../../../actions/employeeActions';

const styles = theme => ({
  button: {
    width: 34,
    height: 34,
    minWidth: 34,
    minHeight: 34,
    margin: 2,
  },
  icon: {
    fontSize: 18,
  },
});

class ActionsComponent extends Component {
  state = {
    open: false,
  };

  handleConfirmOpen = () => {
    this.setState({ open: true });
  };

  handleConfirmClose = () => {
    this.setState({ open: false });
  };

  handleConfirmYes = () => {
    this.setState({ open: false });
    this.removeEmployee();
  };

  onEdit = () => {
    const { history, tableData } = this.props;
    history.push(`/employee/${tableData.rowData[0]}/edit`);
  };

  displayDeleteWarning = () => {
    // const isConfirm = window.confirm('Are you sure you want to delete this employee?');

    // if (isConfirm) {
    this.removeEmployee();
    // }
  };

  removeEmployee = () => {
    const { history, tableData, deleteEmployee } = this.props;
    deleteEmployee(tableData.rowData[0])
      .then(() => {
        history.push(`/employee/list`);
      })
      .catch(err => console.log(err));
  };

  render() {
    const { classes, tableData } = this.props;

    return (
      <div>
        <Fab size="small" color="primary" aria-label="Add" onClick={this.onEdit} className={classes.button}>
          <EditIcon className={classes.icon} />
        </Fab>
        <Fab
          size="small"
          color="secondary"
          aria-label="Add"
          onClick={this.handleConfirmOpen}
          className={classes.button}
        >
          <DeleteIcon />
        </Fab>

        <Dialog
          open={this.state.open}
          onClose={this.handleConfirmClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Remove Employee Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">{`Are you sure you want to remove ${
              tableData.rowData[1]
            } from Employee List table?`}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleConfirmClose} color="primary">
              No
            </Button>
            <Button onClick={this.handleConfirmYes} color="primary" autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ActionsComponent.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(
    undefined,
    { deleteEmployee }
  )
)(ActionsComponent);
