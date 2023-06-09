/*
 * Trace the messages received from a subscribed MQTT topic and respond accordingly when necessary.
 *
 * Tested on: ESP8266 (NodeMCU, Moddable One).
 *
 * Notes:
 *   - Using an unencrypted connection.
 *   - Example usage:
 *     mosquitto_sub -h test.mosquitto.org -t "moddableexamples/#" -v
 *     mosquitto_pub -h test.mosquitto.org -t "moddableexamples/cli" -m 'hello'
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
