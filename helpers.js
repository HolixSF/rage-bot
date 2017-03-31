var S = require('string');
var Client = require('@slack/client').WebClient;
var token = process.env.SLACK_API_TOKEN || '';
var slack = new Client(token);

var rageQuotes = {
  "wol": "'We are the Warriors of light such as if you where to go rogue you would still be a a sch.'",
  "stoping": "'I like pulling and stoping and pulling and stoping and then getting that big burst of white light'"
};

var personalQuotes = {
  "Ali": "",
  "Rage": "",
  "Rav": "",
  "Red": "",
  "Kupo": "",
  "Coren": "",
  "Zema": ""
};

var randomQuote = function (obj) {
  var keys = Object.keys(obj);
  return obj[keys[ keys.length * Math.random() << 0]];
};

module.exports = {
  normalize: function (text, res) {
    var cleanedText = S(text).collapseWhitespace().s
    for (var name in personalQuotes) {
      if (personalQuotes.hasOwnProperty(name)) {
        if (S(cleanedText).contains(name.toLowerCase())) {
          
        }
      }
    }
  },

  getRageQuote: function (query) {
    var quote;

    if (query) {
      if (typeof(rageQuotes[query]) == "undefined") {
        quote = "'I dont fuckin know dude. That quote doesn't exist for all I know.'"
      } else {
        quote = rageQuotes[query]
      }
    } else {
      quote = randomQuote(rageQuotes)
    }
    return quote;
  }
}
