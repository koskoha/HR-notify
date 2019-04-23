/* eslint-disable no-console */
const { CronJob } = require('cron');
const startOfToday = require('date-fns/start_of_today');
const endOfToday = require('date-fns/end_of_today');
const Employee = require('../models/employee');
const Notification = require('../models/notification');

const dbCheck = new CronJob('05 00 00 * * *', function() {
  const query = { anniversaryDate: { $gte: startOfToday(), $lt: endOfToday() }, active: true };
  Employee.find(query, { __v: 0 }).then(employees => {
    employees.forEach(empl => {
      const notification = new Notification({
        info: `New Anniversary for ${empl.fullName}`,
        _employee: empl._id,
        _user: empl._user,
      });

      notification.save();
    });
  });
});

module.exports = dbCheck;
