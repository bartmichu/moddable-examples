/*
 * Tested on: ESP8266 / NodeMCU
 *
 * Trace messages from subscribed channel.
 *
 * Notes:
 * - Run with xsbug.
 * - Disable "BREAK -> On Exceptions" option in xsbug preferences.
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
