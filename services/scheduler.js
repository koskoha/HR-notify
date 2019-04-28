/* eslint-disable no-console */
const { CronJob } = require('cron');
const getDayOfYear = require('date-fns/get_day_of_year');
const Employee = require('../models/employee');
const Notification = require('../models/notification');
const Mailer = require('./Mailer');
const anniversaryTemplate = require('../services/emailTemplates/anniversaryTemplate');

const dbCheck = new CronJob('00 06 * * *', function() {
  console.log('Scheduler has started.');
  const dayOfYear = getDayOfYear(new Date());
  Employee.aggregate([
    { $match: { active: true } },
    {
      $redact: {
        $cond: [{ $eq: [{ $dayOfYear: '$anniversaryDate' }, dayOfYear] }, '$$KEEP', '$$PRUNE'],
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
    });
  });
});

module.exports = dbCheck;
