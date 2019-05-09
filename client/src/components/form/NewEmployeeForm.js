import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import { Grid } from '@material-ui/core';
import PortInput from './PortInput';
import PortDate from './PortDate';
import PortSelect from './PortSelect';
import NewContract from '../employees/NewContract';
import { getContracts } from '../../actions/contractActions';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
});

const validateInputs = values => {
  const errors = {};
  Object.entries(values).forEach(([key, value]) => {
    if (!values[key] && key !== 'deleted') {
      errors[key] = `Field is required!`;
    }
  });

  return errors;
};

const contractNames = [
  'LMCA-NM',
  'US Coast Guard - RI',
  'USACE Vicksburg- W912EQ17C0001',
  'DOE-DC DE-MA0014369',
  'NAVY Gulfport-N6883617P0406',
  'NTIS-SB134217CN0016',
];

const NewEmployeeForm = ({ classes, initialValues, onSubmit, error, contracts, getContracts }) => {
  useEffect(() => {
    getContracts();
  }, [getContracts]);

  return (
    <Formik initialValues={initialValues} validate={validateInputs} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <Card>
            <CardHeader title="New Employee" />
            <CardContent>
              <Field label="Full Name" type="text" name="fullName" component={PortInput} />
              <Field label="SSN" type="text" name="ssn" component={PortInput} />
              <Field
                initialDate={initialValues.anniversaryDate}
                name="anniversaryDate"
                label="Anniversary Date"
                component={PortDate}
              />
              <Field
                initialDate={initialValues.hiringDate}
                name="hiringDate"
                label="Hiring Date"
                component={PortDate}
              />
              <Grid container direction="row" justify="space-between" alignItems="center">
                <Grid item xs={10}>
                  <Field name="contractName" options={contracts} label="Contract Name" component={PortSelect} />
                </Grid>
                <Grid item>
                  <NewContract />
                </Grid>
              </Grid>
              <Field
                name="vacationAmtPerYear"
                options={['80', '120', '160']}
                label="Vacation Amount Per Year"
                component={PortSelect}
              />
              <Field label="Prorated Vacation Amount" type="number" name="proratedVacationAmt" component={PortInput} />
              <Field label="Hourly Rate" name="hourlyRate" type="number" adornment component={PortInput} />
              <Field name="status" options={['Active', 'Not Active']} label="Employee Status" component={PortSelect} />

              {error && <FormHelperText id="component-error-text">{error}</FormHelperText>}
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                type="submit"
                color="primary"
                disabled={isSubmitting}
                className={classes.button}
              >
                Save
              </Button>
            </CardActions>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

NewEmployeeForm.defaultProps = {
  error: '',
  contracts: [],
};

NewEmployeeForm.propTypes = {
  classes: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  contracts: PropTypes.array,
};

export default compose(
  withStyles(styles),
  connect(
    ({ contracts }) => ({ contracts: contracts.map(contract => contract.name) }),
    { getContracts }
  )
)(NewEmployeeForm);
