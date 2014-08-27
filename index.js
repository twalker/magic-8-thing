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
  'You gotta be fuckin\' kidding.',
  'We gotta burn the rest of \'em.',
  'How long were you alone with that dog?',
  'You believe any of this voodoo bullshit, Blair?',
  'I\'d rather not spend the rest of this winter TIED TO THIS FUCKING COUCH!',
  'I don\'t know what the hell\'s in there, but it\'s weird and pissed off, whatever it is.',
  'This is pure nonsense. Doesn\'t prove a thing.',
  'What is that? Is that a man in there...or something?',
  'What can we do? What can we do?',
  'The chameleon strikes in the dark.',
  'Come on, man, you don\'t wanna hurt anybody.',
  'I\'m tired of talkin\', Fuchs. I just wanna get up to my shack and get drunk.',
  'We\'re gonna draw a little bit of everybody\'s blood... \'cause we\'re gonna find out who\'s The Thing.'
];

function getRandomPhrase(){
  return phrases[Math.floor(Math.random() * phrases.length)]
}


board.on('ready', function() {

  var showPhrase = lodash.debounce(function(){
    console.log(getRandomPhrase());
  }, 500);


  // Create a standard `led` hardware instance
  var led = new five.Led({
    pin: 13
  });

  // Create a new `potentiometer` hardware instance.
  var potentiometer = new five.Sensor({
    pin: 'A0',
    freq: 250
  });

  potentiometer.on('data', function() {
    console.log(this.value, this.raw);
    led.off();
    board.wait(this.value, function() {
      led.on();
    });
  });

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
