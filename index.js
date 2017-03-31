var express = require('express');
var app = express();
var url = require('url');
var bodyParser = require('body-parser');
var H = require('./helpers');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', (process.env.PORT || 9001));

app.get('/heartbeat', function(req, res){
  var query = "wol"
  var quote = H.getQuote(query);
  console.log(quote);
  res.send('Running!!');
});

app.post('/rb', function(req, res){
  var query = req.body.text;
  var quote = H.getRageQuote(query);
  var body = {
    response_type: "in_channel",
    "attachments": [{ "text": quote + "\n" + "_--Rancorage Cathal_" }]
  }
  res.send(body)
})

app.post('/events', function(req, res){
  var text = req.body.event.text
  var cleaned_text = S(text).collapseWhitespace().s
  // does cleaned_text.include(names of peeeps here)
  console.log(test);
})


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
