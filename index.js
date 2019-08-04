const express = require('express');
const fs = require('fs')
const https = require('https');
const bodyParser = require('body-parser');
const Pusher = require('pusher');
const app = express();

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// Session middleware

// Create an instance of Pusher
const pusher = new Pusher({
  appId: '775166',
  key: '149299ef4fa07abd4565',
  secret: '55d6b2ad0ad2e6cf0075',
  cluster: 'ap1',
  useTLS: true
});

app.get('/', (req, res) => {
  return res.sendFile(__dirname + '/index.html');
});
app.get('/2', (req, res) => {
  return res.sendFile(__dirname + '/index2.html');
});
app.get('/3', (req, res) => {
  return res.sendFile(__dirname + '/index3.html');
});

// get authentictation for the channel;
app.post('/pusher/auth', (req, res) => {
  const socketId = req.body.socket_id;
  const channel = req.body.channel_name;
  var presenceData = {
    user_id: Math.random().toString(36).slice(2) + Date.now()
  }
  const auth = pusher.authenticate(socketId, channel, presenceData);
  res.send(auth);
});

//listen on the app
// app.listen(3000, () => {
//   return console.log('Server is up on 3000')
// });

https.createServer({
  key: fs.readFileSync('server.key'),
  cert: fs.readFileSync('server.cert')
}, app)
  .listen(3000, function () {
    console.log('Example app listening on port 3000! Go to https://localhost:3000/')
  })
