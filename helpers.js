var S = require('string');
var Client = require('@slack/client').WebClient;
var token = process.env.SLACK_API_TOKEN || '';
var slack = new Client(token);

var rageQuotes = {
  "wol": "'We are the Warriors of light such as if you where to go rogue you would still be a a sch.'",
  "stoping": "'I like pulling and stoping and pulling and stoping and then getting that big burst of white light'"
};

var personalQuotes = {
  "Ali": [
    "'Finally I can raid without pants and not get shit for it.'",
    "'Roegadyn do not have large dicks'",
    "'Ugh I ate too much pho. I'm going to be hungry again in 10 mins instead of 5'",
    "'Why is Coren so much better as a dad than red?'",
    "'Maybe I clogged my drains with all the semen from masturbating. But that's got to be a lot of semen.'",
    "'I have no transferrable skills since according to this administration public masturbation isn't a job skill'"
  ],
  "Rage": [
    "'Seems like a lot of work and my dick is already raw from fucking every race in andromeda ... Even the animals'",
    "'I don't even know what my voice sounds like. I sound like a dumbass. '",
  ],
  "Rav": [
    "'I have shame?'",
    "'if it's something mindless, I can probably do fine'",
    "'Actually.....'"
  ],
  "Red": [
    "'Fucking Rav.....'",
    "'Rav....What the fuck'",
    "'What the fuck Rav'",
    "Sigh....",
    "I'm just drawn to your semen"
  ],
  "Kupo": [
    "'I have no clue what to do'"
  ],
  "Coren": [
    "'was it phonominal'",
    "'What's the tallest building in the world? The library. It has the most stories in it'"
  ],
  "Kaizer": [
    "'Did you just assume my rape preference?'",
    "'I hate you still'"
  ],
  "Kal": [
    "'It's just the other players that make it bad really'"
  ]
};

var randomRageQuote = function (obj) {
  var keys = Object.keys(obj);
  return obj[keys[ keys.length * Math.random() << 0]];
};

var randomNameQuote = function (name) {
  var quotes = personalQuotes[name]
  var author;
  switch (name) {
    case 'Ali':
      author = '_-Alinestra Covelia_';
      break;
    case 'Rage':
      author = '_-Rancorage Cathal_';
      break;
    case 'Rav':
      author = '_-Rmvastazia Zoltiava_';
      break;
    case 'Red':
      author = '_-Red Shield_';
      break;
    case 'Kupo':
      author = '_-Kupo Noodle_';
      break;
    case 'Coren':
      author = '_-Coren Kelyn_';
      break;
    case 'Kaizer':
      author = '_-Kaizer Furian_';
      break;
    case 'Kal':
      author = '_-Kalinas Luminas_';
      break;
  }
  return `>_${quotes[Math.floor(Math.random() * quotes.length)]}_
  *${author}*`
}

var normalize = function (text) {
  return S(text).collapseWhitespace().s.toLowerCase().split();
};

module.exports = {
  getChannels: function () {
    slack.channels.list(function(err, info) {
      if (err) {
         console.log('Error:', err);
      } else {
         for(var i in info.channels) {
          console.log(info.channels[i].name);
         }
      }
    });
  },

  getPersonalQuote: function (text, channel) {
    var cleanedTexts = normalize(text);

    for (var name in personalQuotes) {
      if (personalQuotes.hasOwnProperty(name)) {
        if (cleanedTexts.includes(name.toLowerCase())) {
          slack.chat.postMessage(channel, randomNameQuote(name), function(err, res) {
            if (err) {
              console.log('Error:', err);
            } else {
              console.log('Message sent: ', res);
            }
          });
          return
        } else {
          console.log('Could not find', name, 'from: ', cleanedTexts)
        }
      } else {
        return
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
      quote = randomRageQuote(rageQuotes)
    }
    return quote;
  }
}
