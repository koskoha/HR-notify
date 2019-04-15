/* eslint-disable no-multi-assign */
const mongoose = require('mongoose');
const router = require('express').Router();

const { employeesNotFound, employeeCreateError } = require('../../validation/errMessages');

const Employee = mongoose.model('employee');

async function getAllEmployees(req, res, next) {
  try {
    const employees = await Employee.find({ _user: req.user.id });
    res.json(employees);
  } catch (error) {
    return employeesNotFound;
  }
}

const addEmployee = async (req, res, next) => {
  const { firstName, lastName, phone, email, address } = req.body;
  try {
    const employee = new Employee({
      firstName,
      lastName,
      phone,
      email,
      address,
      _user: req.user.id,
    });

    const newEmployee = await employee.save();
    res.json(newEmployee);
  } catch (error) {
    return employeeCreateError;
  }
};

module.exports = {
  getAllEmployees,
  addEmployee,
};
