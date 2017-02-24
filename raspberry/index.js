const i2c = require('i2c');
const nes = require('nes');
require('dotenv').config();

const address = 0x08;
const wire = new i2c(address, {device: '/dev/i2c-1'});
const client = new nes.Client(process.env.WS_URL);

const toBufferArray = function (json) {
  let buf = Buffer.from(JSON.stringify(json));
  return buf.toJSON().data; 
}

const ledHandler = function (update, flags) {
  console.log('Recieved LED data: ', update);
  wire.write(toBufferArray(update), function (err) {});
}

const servoHandler = function (update, flags) {
  console.log('Recieved Servo data: ', update);
  wire.write(toBufferArray(update), function (err) {});
}

const statusHandler = function (update, flags) {
  console.log('Recieved Status data: ', update);
  wire.write(toBufferArray(update), function (err) {});
}

client.connect(function (err) {
  client.subscribe('/led', ledHandler, function (err) {
    if (err) throw err;
  });

  client.subscribe('/servo', servoHandler, function (err) {
    if (err) throw err;
  });

  client.subscribe('/status', statusHandler, function (err) {
    if (err) throw err;
  });
});
