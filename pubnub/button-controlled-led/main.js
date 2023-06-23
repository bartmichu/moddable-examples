/*
 * Toggle an LED using a button over the Internet.
 *
 * For the purpose of this example a debugger is necessary. Use the -d argument to build a debug
 * instrumented version.
 *
 * Tested on: ESP8266 (NodeMCU, Moddable One), RP2040 (Raspberry Pi Pico).
 *
 * Parts list:
 *   - Raspberry Pi Pico W
 *   - Beadboard
 *   - Jumper wires
 *   - Light-emitting diode (LED)
 *   - Pushbutton
 *   - 330 ohm Resistor (Orange, Orange, Brown, Gold)
 *   - 10K ohm Resistor (Brown, Black, Orange, Gold)
 */

import { PubNub } from 'pubnub';
import Digital from 'pins/digital';
import Monitor from 'pins/digital/monitor';

const channel = 'pubnub_onboarding_channel';

const pubnub = new PubNub({
  publishKey: 'YOUR_KEY',
  subscribeKey: 'YOUR_KEY',
});

const publishMessage = (message) => {
  pubnub.publish({ channel, message }, (error, data) => {
    trace(`${error} ${data}\n`);
  }, this);
};

// NOTE: The LED must be connected to a GPIO (General-purpose input/output) pin,
// e.g. pin 22 on Pico W, pin 5 on NodeMCU V2.
const led = new Digital({
  pin: 2,
  mode: Digital.Output,
});

// NOTE: The button must be connected to a GPIO (General-purpose input/output) pin,
// e.g. pin 9 on Pico W, pin 12 on NodeMCU V2.
const button = new Monitor({
  pin: 0,
  mode: Digital.Input,
  edge: Monitor.Rising | Monitor.Falling,
});

const pressDelay = 150;

button.onChanged = function onChanged() {
  if (this.read() === 0) {
    this.timeout ??= System.setTimeout(() => {
      publishMessage('button pressed');
      delete this.timeout;
    }, pressDelay);
  } else {
    System.clearTimeout(this.timeout);
    delete this.timeout;
  }
};

pubnub.addListener({
  message(event) {
    trace(`${event.message}\n`);
    if (event.message === 'button pressed') {
      // NOTE: Reading from an output pin is generally considered improper usage or abuse.
      led.write(1 ^ led.read());
    }
  },
  status(event) {
    if (event.category === 'PNConnectedCategory') {
      trace(`Subscribed to: ${channel}\n`);
    }
  },
});

pubnub.subscribe({ channels: [channel] });
