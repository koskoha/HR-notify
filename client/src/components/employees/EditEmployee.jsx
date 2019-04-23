import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import NewEmployeeForm from '../form/NewEmployeeForm';
import { updateEmployee } from '../../actions/employeeActions';

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

class EditEmployee extends Component {
  state = {
    error: undefined,
  };

  updateEmployee = (employeeValues, { setSubmitting }) => {
    setSubmitting(true);

    const { updateEmployee, history } = this.props;

    updateEmployee(employeeValues)
      .then(employee => {
        setSubmitting(false);
        this.setState({ error: undefined });
        history.push('/employee/list');
      })
      .catch(err => {
        setSubmitting(false);
        const error = err.message || 'Server Error';
        this.setState({ error });
      });
  };

  render() {
    const { error } = this.state;
    const { classes, employee } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Grid container justify="center" alignItems="center" className={classes.form}>
          <NewEmployeeForm initialValues={employee[0]} onSubmit={this.updateEmployee} error={error} />
        </Grid>
      </main>
    );
  }
}

EditEmployee.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ employees }, props) => {
  const { id } = props.match.params;
  return {
    employee: employees.filter(emp => emp._id === id),
  };
};

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { updateEmployee }
  )
)(EditEmployee);
