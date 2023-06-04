/*
 * Tested on: ESP8266 (NodeMCU, Moddable One)
 *
 * Trace messages from subscribed topic and reply when appropriate.
 *
 * Notes:
 * - Unencrypted connection.
 * - Example usage:
 *   mosquitto_sub -h test.mosquitto.org -t "moddableexamples/#" -v
 *   mosquitto_pub -h test.mosquitto.org -t "moddableexamples/cli" -m 'hello'
 *
 * Relevant documentation:
 * - https://github.com/Moddable-OpenSource/moddable/blob/public/documentation/network/network.md#class-mqtt
 */

import Client from 'mqtt';

const clientId = 'esp8266';
const broker = 'test.mosquitto.org';

const mqttClient = new Client({
  host: broker,
  id: clientId,
});

mqttClient.onReady = function onReady() {
  trace(`Connection to ${broker} is established.\n`);

  mqttClient.subscribe('moddableexamples/#');

  mqttClient.publish(`moddableexamples/${clientId}`, 'Hi, I am ready');

  mqttClient.onMessage = function onMessage(topic, data) {
    trace(`Topic: ${topic}\n`);
    trace(`Data: ${String.fromArrayBuffer(data)}\n\n`);

    if (topic !== `moddableexamples/${clientId}`) {
      mqttClient.publish(`moddableexamples/${clientId}`, 'Roger');
    }
  };
};

mqttClient.onClose = function onClose() {
  trace(`Connection to ${broker} is lost or closed.\n`);
};
