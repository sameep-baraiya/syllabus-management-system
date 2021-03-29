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

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/subject', subject);
app.use('/api/v1/course', course);
app.use('/api/v1/download', download);
app.use('/api/v1/academic-batch', academicBatch);
app.use('/api/v1/meeting', meeting);
app.use('/api/v1/crud-info', crudInfo);
app.use('/api/v1/storage', storage);

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

const io = socket(server);
//Whenever someone connects this gets executed
io.on('connection', (socket) => {
  console.log('A user connected'.green);

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', () => {
    console.log('A user disconnected'.yellow);
  });
});
app.set('socketio', io);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`unhandledRejection Error: ${err.message}`.red.inverse);
});
