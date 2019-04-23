import React from 'react';
import format from 'date-fns/format';
import AddEmployee from '../../Toolbar/AddEmployee';
import ActionsComponent from '../ActionsComponent';

export default {
  muiTheme: {
    typography: {
      useNextVariants: true,
    },
    overrides: {
      MUIDataTableBodyCell: {
        root: {
          paddingLeft: 10,
        },
      },
      MUIDataTableHeadCell: {
        root: {
          padding: 10,
          fontWeight: 800,
          fontSize: 13,
          color: '#3f51b5',
        },
      },
    },
  },
  options: history => ({
    filter: true,
    selectableRows: false,
    filterType: 'dropdown',
    responsive: 'stacked',
    rowsPerPage: 15,
    customToolbar: () => <AddEmployee history={history} />,
  }),
  columns: history => [
    {
      name: '_id',
      options: {
        display: false,
      },
    },
    {
      name: 'fullName',
      label: 'Full Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'ssn',
      label: 'SSN',
      options: {
        filter: true,
        sort: false,
      },
    },
    {
      name: 'anniversaryDate',
      label: 'Anniversary Date',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => <div>{format(value, 'MMMM DD, YYYY')}</div>,
      },
    },
    {
      name: 'contractName',
      label: 'Contract Name',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'vacationAmtPerYear',
      label: 'V/a per Year',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'proratedVacationAmt',
      label: 'Prorated v/a',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'hourlyRate',
      label: 'Hourly Rate',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      name: 'hiringDate',
      label: 'Hiring Date',
      options: {
        filter: true,
        sort: true,
        customBodyRender: value => <div>{format(value, 'MMMM DD, YYYY')}</div>,
      },
    },
    {
      name: 'status',
      label: 'Status',
      options: {
        filter: true,
        sort: true,
      },
    },
    {
      label: 'Actions',
      options: {
        filter: false,
        sort: false,
        customBodyRender: (value, tableMeta, updateValue) => (
          <ActionsComponent history={history} tableData={tableMeta} />
        ),
      },
    },
  ],
};
