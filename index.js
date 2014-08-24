var five = require('johnny-five'),
    board = new five.Board(),
    lodash = require('lodash'),
    accel;

var phrases = [
  // positive
  'It is certain',
  'It is decidedly so',
  'Without a doubt',
  'Yes definitely',
  'You may rely on it',
  'As I see it, yes',
  'Most likely',
  'Outlook good',
  'Yes',
  'Signs point to yes',
  // neutral
  'Reply hazy try again',
  'Ask again later',
  'Better not tell you now',
  'Cannot predict now',
  'Concentrate and ask again',
  // negative
  'Don\'t count on it',
  'My reply is no',
  'My sources say no',
  'Outlook not so good',
  'Very doubtful',
  // the thing
  'You gotta be fuckin\' kidding',
  'We gotta burn the rest of \'em',
  'How long were you alone with those dogs?',
  'You believe any of this voodoo bullshit, Blair?',
  'I\'d rather not spend the rest of this winter TIED TO THIS FUCKING COUCH!'
];

function getRandomPhrase(){
  return phrases[Math.floor(Math.random() * phrases.length)]
}


board.on('ready', function() {

  var showPhrase = lodash.debounce(function(){
    console.log(getRandomPhrase());
  }, 500);

  accel = new five.Accelerometer({
    pins: ['A3', 'A4', 'A5'],
    sensitivity: 300,// mV/degree/seconds
    zeroV: 320 // volts in ADC
  });

  accel.on('change', function(data) {
    // Limits depend on how hard you shake things
    // z > 450 && Z < 598
    // z > 0.870 ||  z < 0.490
    if (data.z > 0.45 && data.z < 0.6) {
      showPhrase();
    }
  });

});
