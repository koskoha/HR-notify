import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Formik, Form, Field } from 'formik';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import PortInput from './PortInput';
import PortDate from './PortDate';
import PortSelect from './PortSelect';

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

const NewEmployeeForm = ({ classes, initialValues, onSubmit, error }) => (
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
            <Field initialDate={initialValues.hiringDate} name="hiringDate" label="Hiring Date" component={PortDate} />
            <Field name="contractName" options={contractNames} label="Contract Name" component={PortSelect} />
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

NewEmployeeForm.defaultProps = {
  error: '',
};

NewEmployeeForm.propTypes = {
  classes: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  error: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

export default withStyles(styles)(NewEmployeeForm);
