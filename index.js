/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const errorHandler = require('errorhandler');
const keys = require('./config/keys');
const dbCheckScheduler = require('./services/scheduler');
const dbCheckSchedulerTest = require('./services/schedulerTest');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;
mongoose.set('useCreateIndex', true);

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

const corsOptions = {
  origin: keys.frontendHost,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));
app.use(cors(corsOptions));

if (!isProduction) {
  app.use(errorHandler());
}

dbCheckScheduler.start();
// dbCheckSchedulerTest();

require('./models/user');
require('./models/employee');
require('./models/notification');

const router = require('./routes');

if (isProduction) {
  // eslint-disable-next-line global-require
  const path = require('path');
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.use('/api', router);

// if (!isProduction) {
//   app.use((err, req, res) => {
//     res.status(err.status || 500);

//     res.json({
//       errors: {
//         message: err.message,
//         error: err,
//       },
//     });
//   });
// }

// app.use((err, req, res) => {
//   res.status(err.status || 500);

//   res.json({
//     errors: {
//       message: err.message,
//       error: {},
//     },
//   });
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log('hr-notify server listening at port: ', PORT);
});
