import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MUIDataTable from 'mui-datatables';

const columns = ['Name', 'Company', 'City', 'State'];

const data = [
  ['Joe James', 'Test Corp', 'Yonkers', 'NY'],
  ['John Walsh', 'Test Corp', 'Hartford', 'CT'],
  ['Bob Herm', 'Test Corp', 'Tampa', 'FL'],
  ['James Houston', 'Test Corp', 'Dallas', 'TX'],
];

const options = {
  filterType: 'checkbox',
};

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
  render() {
    const { classes } = this.props;
    return (
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <MUIDataTable title="Employee List" data={data} columns={columns} options={options} />;
      </main>
    );
  }
}

EmployeeTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EmployeeTable);
