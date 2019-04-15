import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Route, Redirect } from 'react-router-dom';
import Header from '../header/Header';
import EmployeeTable from '../employees/EmployeeTable';
import AddEmployeeForm from '../employees/AddEmployeeForm';
import Reports from '../employees/Reports';

const styles = theme => ({});

class BaseLayout extends Component {
  render() {
    const { match } = this.props;
    return (
      <Header {...this.props}>
        <Route exact path={`${match.url}/list`} component={EmployeeTable} />
        <Route exact path={`${match.url}/add`} component={AddEmployeeForm} />
        <Route exact path={`${match.url}/reports`} component={Reports} />
        <Redirect to={`${match.url}/list`} />
      </Header>
    );
  }
}

BaseLayout.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
};

export default withStyles(styles)(BaseLayout);
