require('dotenv').config();
const express = require('express');
const app = require('./app');
const { ExpressPeerServer } = require('peer');
const port = process.env.PORT || 5000;

const cors = require('cors');
const mongoose = require('mongoose');

//load the routers from other files
const plansRouter = require('./routes/plans');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');

// const dashboardRouter = require('./routes/dashboard');

const dbUrl = process.env.DB_URL;

app.use(cors());
app.use(express.json());

//connection to mongodb
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB connection established successfully');
});

//the routers are added as middleware
app.use('/plans', plansRouter);
app.use('/', authRouter);
app.use('/users', userRouter);

// app.use('Dashboard/', dashboardRouter);

const server = app.listen(port, (err) => {
  if (err) {
    console.log('Error occured');
  } else {
    console.log(`Successfuly connected to port: ${port}`);
  }
});

const peerServer = ExpressPeerServer(server);
app.use('/peerjs', peerServer);
