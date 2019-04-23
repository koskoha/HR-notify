/* eslint-disable no-console */
const startOfToday = require('date-fns/start_of_today');
const endOfToday = require('date-fns/end_of_today');
const Employee = require('../models/employee');
const Notification = require('../models/notification');

const schedulerTest = () => {
  console.log('schedulerTest:');
  // const now = new Date();
  // const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 11, 55, 0);
  const start = startOfToday();

  // const end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 11, 55, 0);
  const end = endOfToday();

  const query = { anniversaryDate: { $gte: startOfToday(), $lt: endOfToday() }, active: true };
  // console.log('query:', query);

  Employee.find(query, { __v: 0 }).then(employees => {
    // console.log('employees:', employees);
    employees.forEach(empl => {
      const notification = new Notification({
        info: `New Anniversary for ${empl.fullName}`,
        _employee: empl._id,
        _user: empl._user,
      });

      notification
        .save()
        .then(() => {
          console.log('Test scheduler');
        })
        .catch(err => console.log('error:', err));
    });
  });
};

module.exports = schedulerTest;
