/*
 * Tested on: ESP8266 / NodeMCU
 *
 * Toggle LED with a button over the Internet.
 *
 * Notes:
 * - Run with xsbug.
 * - Disable "BREAK -> On Exceptions" option in xsbug preferences.
 */

import { PubNub } from 'pubnub';
import Digital from 'pins/digital';
import Monitor from 'pins/digital/monitor';
import Timer from 'timer';

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

const pressHandler = function pressHandler() {
  publishMessage('button pressed');
};

const led = new Digital({
  pin: 2,
  mode: Digital.Output,
});

const button = new Digital({
  pin: 0,
  mode: Digital.Input,
});

const buttonMonitor = new Monitor({
  pin: 0,
  mode: Digital.Input,
  edge: Monitor.Rising | Monitor.Falling,
});

let pressTimerId = null;
const pressDelay = 150;

const stopTimers = function stopTimers() {
  try {
    Timer.clear(pressTimerId);
  } catch (error) {
    // trace(`This is probably normal: ${error}\n`);
  }
};

buttonMonitor.onChanged = function onChanged() {
  if (button.read()) {
    stopTimers();
  } else {
    stopTimers();

    pressTimerId = Timer.repeat(() => {
      pressHandler();
    }, pressDelay);
  }
};

pubnub.addListener({
  message(event) {
    trace(`${event.message}\n`);
    if (event.message === 'button pressed') {
      led.write(!led.read());
    }
  },
  status(event) {
    if (event.category === 'PNConnectedCategory') {
      trace(`Subscribed to: ${channel}\n`);
    }
  },
});

pubnub.subscribe({ channels: [channel] });
