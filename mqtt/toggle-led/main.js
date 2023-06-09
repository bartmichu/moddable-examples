/*
 * Tested on: ESP8266 (NodeMCU, Moddable One).
 *
 * Notes:
 *   - Using an unencrypted connection.
 *   - Example usage:
 *     mosquitto_sub -h test.mosquitto.org -t "moddableexamples/#" -v
 *     mosquitto_pub -h test.mosquitto.org -t "moddableexamples/c2" -m "ping"
 *     mosquitto_pub -h test.mosquitto.org -t "moddableexamples/c2" -m "toggle"
 */

import Client from 'mqtt';
import Digital from 'pins/digital';
import Monitor from 'pins/digital/monitor';
import Net from 'net';
import Resource from 'Resource';
import SecureSocket from 'securesocket';

const clientId = Net.get('MAC');
const broker = 'test.mosquitto.org';
const c2Topic = 'moddableexamples/c2';
const personalTopic = `moddableexamples/${clientId}`;

const led = new Digital({
  pin: 2,
  mode: Digital.Output,
});

const button = new Digital({
  pin: 0,
  mode: Digital.Input,
});

const buttonMonitor = new Monitor({
  pin: button.pin,
  mode: Digital.Input,
  edge: Monitor.Rising,
});

const mqttClient = new Client({
  host: broker,
  port: 8883,
  id: clientId,
  Socket: SecureSocket,
  secure: {
    protocolVersion: 0x0303,
    certificate: new Resource('mosquitto.org.der'),
    trace: false,
  },
});

const toggleLed = function toggleLed(ledState) {
  led.write(typeof ledState === 'undefined' ? !led.read() : ledState);
};

mqttClient.onReady = function onReady() {
  trace(`Connection to ${broker} is established.\n`);
  mqttClient.subscribe(c2Topic);
  mqttClient.publish(personalTopic, 'hello\n');

  buttonMonitor.onChanged = function onChanged() {
    toggleLed();
    mqttClient.publish(personalTopic, 'LED toggled');
  };

  mqttClient.onMessage = function onMessage(topic, data) {
    if (topic === c2Topic) {
      const message = String.fromArrayBuffer(data).toLowerCase();

      if (message === 'ping') {
        mqttClient.publish(personalTopic, 'pong');
      } else if (message === 'on') {
        toggleLed(0);
        mqttClient.publish(personalTopic, 'LED turned on');
      } else if (message === 'off') {
        toggleLed(1);
        mqttClient.publish(personalTopic, 'LED turned off');
      } else if (message === 'toggle') {
        toggleLed();
        mqttClient.publish(personalTopic, 'LED toggled');
      }
    }
  };
};

mqttClient.onClose = function onClose() {
  trace(`Connection to ${broker} is lost or closed.\n`);
};
