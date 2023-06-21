/*
 * Trace the messages received from a subscribed channel.
 * A debugger is required. Use the -d argument to build a debug instrumented version.
 *
 * Tested on: ESP8266 (NodeMCU, Moddable One), RP2040 (Raspberry Pi Pico W).
 *
 * Parts list:
 *   - Microcontroller
 */

import { PubNub } from 'pubnub';
import Time from 'time';

const publishInterval = 5000;
const channel = 'pubnub_onboarding_channel';

const pubnub = new PubNub({
  publishKey: 'YOUR_KEY',
  subscribeKey: 'YOUR_KEY',
});

function startPublishing() {
  System.setInterval(() => {
    const message = Time.ticks;
    pubnub.publish({ channel, message }, (error, data) => {
      trace(`${error} ${data}\n`);
    }, this);
  }, publishInterval);
}

pubnub.addListener({
  message(event) {
    trace(`${event.message}\n`);
  },
  status(event) {
    if (event.category === 'PNConnectedCategory') {
      trace(`Subscribed to: ${channel}\n`);
      startPublishing();
    }
  },
});

pubnub.subscribe({ channels: [channel] });
