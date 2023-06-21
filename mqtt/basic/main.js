/*
 * Trace the messages received from a subscribed MQTT topic and respond accordingly when necessary.
 *
 * Tested on: ESP8266 (NodeMCU, Moddable One), RP2040 (Raspberry Pi Pico W).
 *
 * Notes:
 *   - One way to connect to the wireless network is by issuing the following command:
 *     mcconfig -m -p esp ssid="xxx" password="yyy"
 *   - Example usage:
 *     mosquitto_sub -h test.mosquitto.org -t "moddableexamples/#" -v
 *     mosquitto_pub -h test.mosquitto.org -t "moddableexamples/command" -m 'ping'
 *     mosquitto_pub -h test.mosquitto.org -t "moddableexamples/command" -m 'whatever'
 *
 * Parts list:
 *   - Microcontroller
 */

import Client from 'mqtt';

const broker = 'test.mosquitto.org';

// NOTE: Using an unencrypted and unauthenticated connection.
const mqttClient = new Client({
  host: broker,
  timeout: 60_000,
});

mqttClient.onReady = function onReady() {
  trace(`The connection to ${broker} has been established.\n`);

  this.subscribe('moddableexamples/#');
  this.publish('moddableexamples/presence', `I'm here ${Date()}`);
};

mqttClient.onMessage = function onMessage(topic, body) {
  const message = String.fromArrayBuffer(body);
  trace(`received "${topic}": ${message}\n`);

  if (topic === 'moddableexamples/command') {
    if (message === 'ping') {
      this.publish('moddableexamples/confirm', `pong ${Date()}`);
    }
  }
};

mqttClient.onClose = function onClose() {
  trace(`The connection to ${broker} has been lost or closed.\n`);
};
