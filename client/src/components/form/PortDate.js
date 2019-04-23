import React from 'react';
import DatePicker from 'react-datepicker';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import { subYears, addYears } from 'date-fns';
import { TextField, FormControl } from '@material-ui/core';
import InputAdornment from '@material-ui/core/InputAdornment';
import Calendar from '@material-ui/icons/Today';

import 'react-datepicker/dist/react-datepicker.css';

const styles = theme => ({
  root: {
    color: '#949494',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  calendar: {},
});

class PortDate extends React.Component {
  constructor(props) {
    super(props);

    const dateValue = props.initialDate ? new Date(props.initialDate) : new Date();

    this.state = {
      dateValue,
    };
  }

  setFieldValueAndTouched(date, touched) {
    const { setFieldValue, setFieldTouched } = this.props.form;
    const { name } = this.props.field;

    setFieldValue(name, date, true);
    setFieldTouched(name, touched, true);
  }

  handleChange = date => {
    this.setState({
      dateValue: date,
    });
    this.setFieldValueAndTouched(date, true);
  };

  render() {
    const { dateValue } = this.state;
    const {
      classes,
      label,
      form: { touched, errors },
      field,
    } = this.props;
    return (
      <React.Fragment>
        <FormControl className={classes.formControl}>
          <FormLabel margin="normal" component="legend" />
          <DatePicker
            selected={dateValue}
            onChange={this.handleChange}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            minDate={subYears(new Date(), 70)}
            maxDate={addYears(new Date(), 10)}
            dropdownMode="select"
            dateFormat="MMMM d, yyyy"
            customInput={
              <TextField
                required
                label={label}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Calendar className={classes.root} />
                    </InputAdornment>
                  ),
                }}
                margin="normal"
              />
            }
          />
          {touched[field.name] && errors[field.name] && <div className="error">{errors[field.name]}</div>}
        </FormControl>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(PortDate);
