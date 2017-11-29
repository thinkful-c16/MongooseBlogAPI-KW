'use strict';

const express = require('express');
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const storiesRouter = require('./routers/stories-router');

const { PORT, DATABASE_URL } = require('./config');
const { BlogPost } = require('./models');


const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


const app = express();


app.use(morgan('common'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use('/api/v1', storiesRouter);

// Catch-all endpoint for requests to non-existent endpoint
// app.use(function (req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });



// Catch-all endpoint for errors
// Prevent stacktrace from being leaked to user in production
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: (app.get('env') === 'development') ? err : {}
  });
});

let server;

function runServer(databaseUrl=DATABASE_URL, port=PORT) {

  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, {useMongoClient: true}, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
        resolve();
      })
        .on('error', err => {
          mongoose.disconnect();
          reject(err);
        });
    });
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log('Closing server');
      server.close(err => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}
if (require.main === module) {
  runServer().catch(err => console.error(err));
}

module.exports = {app, runServer, closeServer};

