import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { TextField } from '@material-ui/core';
import { withRouter } from 'react-router';
import { addContract } from '../../actions/contractActions';

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

class NewContract extends Component {
  state = {
    name: '',
    open: false,
  };

  handleConfirmOpen = () => {
    this.setState({ open: true });
  };

  handleConfirmClose = () => {
    this.setState({ open: false });
  };

  handleSubmit = () => {
    const { addContract, history } = this.props;
    console.log('history:', history);
    history.push();
    this.setState({ open: false });
    addContract({ name: this.state.name });
  };

  handleInputChange = e => {
    const name = e.target.value;
    this.setState(() => ({ ...this.state, name }));
  };

  addContract = () => {
    // const { history } = this.props;
  };

  render() {
    const { classes } = this.props;
    const { open, name } = this.state;

    return (
      <div>
        <Button size="small" variant="outlined" color="primary" onClick={this.handleConfirmOpen}>
          {/* <AddIcon /> */}
          New
        </Button>

        <Dialog
          open={open}
          onClose={this.handleConfirmClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">New Contract</DialogTitle>
          <DialogContent>
            <TextField
              required
              id="standard-required"
              label="Enter contract name"
              className={classes.textField}
              value={name}
              onChange={this.handleInputChange}
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleConfirmClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleSubmit} color="primary" autoFocus>
              Submit
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

NewContract.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  withRouter,
  connect(
    undefined,
    { addContract }
  )
)(NewContract);
