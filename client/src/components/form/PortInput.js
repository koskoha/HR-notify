import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import { FormControl } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    width: 600,
  },
});

const PortInput = ({ classes, label, adornment, type, field, form: { touched, errors }, ...props }) => (
  <FormControl className={classes.formControl} error>
    <TextField
      {...field}
      {...props}
      required
      type={type}
      id="standard-required"
      label={label}
      margin="normal"
      InputLabelProps={{ shrink: true }}
      error={touched[field.name] && errors[field.name] && true}
      InputProps={adornment ? { startAdornment: <InputAdornment position="start">$</InputAdornment> } : undefined}
    />

    {touched[field.name] && errors[field.name] && (
      <FormHelperText id="component-error-text">{errors[field.name]}</FormHelperText>
    )}
  </FormControl>
);

PortInput.defaultProps = {
  adornment: false,
};

PortInput.propTypes = {
  classes: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  adornment: PropTypes.bool,
};

export default withStyles(styles)(PortInput);
