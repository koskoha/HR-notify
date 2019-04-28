/* eslint-disable no-multi-assign */
const mongoose = require('mongoose');

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

exports.getUndoneNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ _user: req.user.id, done: false }, { __v: 0 }).populate(
      '_employee'
    );
    return res.json(notifications);
  } catch (err) {
    res.status(422).send(normalizeErrors(err));
  }
};

exports.markDone = (req, res) => {
  const { id } = req.params;
  debugger;
  Notification.findById(id, (err, foundNotification) => {
    if (err) {
      return res.status(422).send(normalizeErrors(err));
    }

    foundNotification.set({ done: true });
    foundNotification.save(err => {
      if (err) {
        return res.status(422).send(normalizeErrors(err));
      }
      return res.json({ status: 'success' });
    });
  });
};
