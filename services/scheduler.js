/* eslint-disable no-console */
const { CronJob } = require('cron');
const startOfToday = require('date-fns/start_of_today');
const endOfToday = require('date-fns/end_of_today');
const Employee = require('../models/employee');
const Notification = require('../models/notification');
const Mailer = require('./Mailer');
const anniversaryTemplate = require('../services/emailTemplates/anniversaryTemplate');

const dbCheck = new CronJob('00 05 * * *', function() {
  console.log('Scheduler has started.');
  const query = { anniversaryDate: { $gte: startOfToday(), $lt: endOfToday() }, active: true };
  Employee.find(query, { __v: 0 }).then(employees => {
    employees.forEach(employee => {
      const notification = new Notification({
        _employee: employee._id,
        _user: employee._user,
      });

      notification.save();

      const mailer = new Mailer(employee, anniversaryTemplate(employee));
      mailer.send();
    });
  });
});

module.exports = dbCheck;
