import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import MUIDataTable from 'mui-datatables';
import tableConfig from './table/configs/tableConfig';

import { getEmployees } from '../../actions/employeeActions';
import { getNotifications } from '../../actions/notificationActions';

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
});

class EmployeeTable extends Component {
  componentDidMount() {
    const { getEmployees } = this.props;
    getEmployees();
  }

  getMuiTheme = () => createMuiTheme(tableConfig.muiTheme);

  render() {
    const { classes, history, employees } = this.props;

    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <MuiThemeProvider theme={this.getMuiTheme()}>
          <MUIDataTable
            title="Employee List"
            data={employees}
            columns={tableConfig.columns(history)}
            options={tableConfig.options(history)}
          />
        </MuiThemeProvider>
      </main>
    );
  }
}

EmployeeTable.defaultProps = {
  employees: [],
};

EmployeeTable.propTypes = {
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  getEmployees: PropTypes.func.isRequired,
  getNotifications: PropTypes.func.isRequired,
  employees: PropTypes.array,
};

const mapStateToProps = ({ employees }) => ({ employees });

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    { getEmployees, getNotifications }
  )
)(EmployeeTable);
