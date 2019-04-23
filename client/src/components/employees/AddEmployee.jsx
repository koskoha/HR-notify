import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import NewEmployeeForm from '../form/NewEmployeeForm';
import { addEmployee } from '../../actions/employeeActions';

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
  form: {
    maxWidth: 650,
  },
});

const INITIAL_VALUES = {
  fullName: '',
  contractName: '',
  anniversaryDate: new Date(),
  status: 'active',
  ssn: '',
  vacationAmtPerYear: '',
  proratedVacationAmt: '',
  hourlyRate: '',
  hiringDate: new Date(),
};

class AddEmployee extends Component {
  state = {
    error: undefined,
  };

  onSubmit = employee => {
    const { addEmployee, history } = this.props;
    addEmployee(employee);
    history.push('/employee/list');
  };

  render() {
    const { error } = this.state;
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container justify="center" alignItems="center" className={classes.form}>
          <NewEmployeeForm initialValues={INITIAL_VALUES} onSubmit={this.onSubmit} error={error} />
        </Grid>
      </main>
    );
  }
}

AddEmployee.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(
    undefined,
    { addEmployee }
  )
)(AddEmployee);
