const express = require('express');
const app = express();
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const socket = require('socket.io');

// Middleware import
const errorHandler = require('./middleware/error');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));

  app.get('/test', (req, res) => {
    res.status(200).send('Hello World');
  });
}

// Rout files
const auth = require('./routes/auth');
const subject = require('./routes/subject');
const course = require('./routes/course');
const download = require('./routes/download');
const academicBatch = require('./routes/academicBatch');
const meeting = require('./routes/meeting');
const crudInfo = require('./routes/crudInfo');
const storage = require('./routes/storage');
const user = require('./routes/user');
const config = require('./routes/config');
const accountRequest = require('./routes/accountRequest');
const announcement = require('./routes/announcement');

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/subject', subject);
app.use('/api/v1/course', course);
app.use('/api/v1/download', download);
app.use('/api/v1/academic-batch', academicBatch);
app.use('/api/v1/meeting', meeting);
app.use('/api/v1/crud-info', crudInfo);
app.use('/api/v1/storage', storage);
app.use('/api/v1/user', user);
app.use('/api/v1/config', config);
app.use('/api/v1/account-request', accountRequest);
app.use('/api/v1/announcement', announcement);

// Handle all error
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.black
      .bgGreen
  )
);

app.set('LOGGED_USERS', new Map());

const io = socket(server);
//Whenever someone connects this gets executed
io.on('connection', (socket) => {
  console.log('A user connected'.green);

  socket.on('INIT_NOTIFICATION', (data) => {
    const map = app.get('LOGGED_USERS');
    if (data && Number.isInteger(data.id)) {
      map.set(socket.id, {
        id: data.id,
        at: new Date(),
      });
    }
    // console.log(map, data.id);
    app.set('LOGGED_USERS', map);
  });

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', () => {
    const map = app.get('LOGGED_USERS');
    map.delete(socket.id);
    app.set('LOGGED_USERS', map);
    // console.log(map);
    console.log('A user disconnected'.yellow);
  });
});
app.set('socketio', io);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`unhandledRejection Error: ${err.message}`.red.inverse);
});
