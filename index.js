var express = require('express');
var app = express();
require('dotenv').config();
var url = require('url');
var bodyParser = require('body-parser');
var H = require('./helpers');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 9001));

app.get('/heartbeat', function(req, res) {
  H.getChannels();
  res.send('Running!!');
});

app.post('/rb', function(req, res) {
  var query = req.body.text;
  var quote = H.getRageQuote(query);
  var body = {
    response_type: "in_channel",
    "attachments": [{ "text": quote + "\n" + "_--Rancorage Cathal_" }]
  }
  res.send(body)
})

app.post('/events', function(req, res) {
  var text = req.body.event.text || false
  var channel = req.body.event.channel || "No channel found"
  if (text) {
    H.getPersonalQuote(text, channel);
    res.status(200).send('OK');
  } else {
    res.end()
  }
  // var challenge = req.body.challenge
  // res.send(challenge)
})


var server = app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
