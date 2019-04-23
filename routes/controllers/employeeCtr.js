/* eslint-disable no-multi-assign */
const mongoose = require('mongoose');

const { employeesNotFound, employeeCreateError } = require('../../validation/errMessages');

const Employee = mongoose.model('employee');
const Notification = mongoose.model('notification');

function normalizeErrors(errors) {
  const normalizeError = [];
  // eslint-disable-next-line no-restricted-syntax
  for (const property in errors) {
    if (Object.prototype.hasOwnProperty.call(errors, property)) {
      normalizeError.push({ title: property, detail: errors[property].message });
    }
  }
  return normalizeErrors;
}

exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find({ _user: req.user.id, active: true }, { __v: 0 });
    return res.json(employees);
  } catch (err) {
    res.status(422).send(err);
  }
};

exports.getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ _user: req.user.id, notified: true }, { __v: 0 }).populate(
      '_employee'
    );
    return res.json(notifications);
  } catch (err) {
    res.status(422).send(normalizeErrors(err));
  }
};

exports.deleteEmployee = (req, res) => {
  const { id } = req.params;
  Employee.findById(id, (err, foundEmployee) => {
    if (err) {
      return res.status(422).send(normalizeErrors(err));
    }
    foundEmployee.set({ ...foundEmployee, active: false });
    foundEmployee.save(err => {
      if (err) {
        return res.status(422).send(normalizeErrors(err));
      }
      return res.json({ status: 'portfolio deleted.' });
    });
  });
};

exports.updateEmployee = (req, res) => {
  const employeeData = req.body;
  const { id } = req.params;

  Employee.findById(id, (err, foundEmployee) => {
    if (err) {
      return res.status(422).send(normalizeErrors(err));
    }

    foundEmployee.set(employeeData);
    foundEmployee.save((err, updatedEmployee) => {
      if (err) {
        return res.status(422).send(normalizeErrors(err));
      }

      return res.json(updatedEmployee);
    });
  });
};

// exports.getEmployeeById = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const foundEmployee = await Employee.findById(id);
//     res.json(foundEmployee);
//   } catch (err) {
//     res.status(422).send(normalizeErrors(err));
//   }
// };

exports.addEmployee = async (req, res, next) => {
  const {
    fullName,
    contractName,
    anniversaryDate,
    status,
    ssn,
    vacationAmtPerYear,
    proratedVacationAmt,
    hourlyRate,
    hiringDate,
  } = req.body;
  try {
    const employee = new Employee({
      fullName,
      contractName,
      anniversaryDate,
      status,
      ssn,
      vacationAmtPerYear,
      proratedVacationAmt,
      hourlyRate,
      hiringDate,
      _user: req.user.id,
    });

    const newEmployee = await employee.save();
    if (newEmployee) {
      return res.json({ success: 'New Employee Added' });
    }
    return res.status(404).json({ error: 'Fail to add new employee' });

    // res.json(newEmployee);
  } catch (error) {
    return employeeCreateError;
  }
};
