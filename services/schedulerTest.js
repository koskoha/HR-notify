/* eslint-disable no-console */
const getDayOfYear = require('date-fns/get_day_of_year');
const Employee = require('../models/employee');
const Notification = require('../models/notification');
const Mailer = require('./Mailer');
const anniversaryTemplate = require('../services/emailTemplates/anniversaryTemplate');

const schedulerTest = () => {
  console.log('Scheduler has started.');
  const dayOfYear = getDayOfYear(new Date());
  Employee.aggregate([
    { $match: { active: true } },
    {
      $redact: {
        $cond: [{ $eq: [{ $dayOfYear: '$anniversaryDate' }, dayOfYear + 1] }, '$$KEEP', '$$PRUNE'],
      },
    },
  ]).exec((err, employees) => {
    if (err) {
      console.log(err);
    }
    employees.forEach(employee => {
      const notification = new Notification({
        _employee: employee._id,
        _user: employee._user,
      });

      notification.save();

      const mailer = new Mailer(employee, anniversaryTemplate(employee));
      mailer.send();
      console.log('message send successfully');
    });
  });
};

module.exports = schedulerTest;
