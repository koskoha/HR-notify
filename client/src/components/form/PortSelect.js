import React from 'react';
import PropTypes from 'prop-types';
import FormHelperText from '@material-ui/core/FormHelperText';
import { withStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { FormControl, TextField, Button } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
    marginBottom: 20,
    width: '98%',
  },
});

const renderOptions = options => {
  const optionsList = options.map(option => (
    <MenuItem key={option} value={option.toLowerCase()}>
      {option}
    </MenuItem>
  ));

  return optionsList;
};

const PortSelect = ({
  classes,
  label,
  options,
  // type,
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <FormControl required className={classes.formControl} error={touched[field.name] && errors[field.name] && true}>
    <InputLabel htmlFor={`${field.name}-required`}>{label}</InputLabel>
    <Select
      {...field}
      {...props}
      name={field.name}
      inputProps={{
        id: `${field.name}-required`,
      }}
    >
      {renderOptions(options)}
    </Select>
    {touched[field.name] && errors[field.name] && (
      <FormHelperText id="component-error-text">{errors[field.name]}</FormHelperText>
    )}
  </FormControl>
);

PortSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  field: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
};

export default withStyles(styles)(PortSelect);
