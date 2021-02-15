require('dotenv').config();
const app = require('./app');
const { ExpressPeerServer } = require('peer');
const port = process.env.PORT || 5000;

const server = app.listen(port, (err) => {
  if (err) {
    console.log('Error occured');
  } else {
    console.log(`Successfuly connected to to port: ${port}`);
  }
});

const peerServer = ExpressPeerServer(server);
app.use('/peerjs', peerServer);
