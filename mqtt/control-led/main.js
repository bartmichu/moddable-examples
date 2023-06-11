/*
 * Control an LED remotely over the internet.
 *
 * Tested on: ESP8266 (NodeMCU, Moddable One).
 *
 * Notes:
 *   - Using an encrypted connection.
 *   - Using an unauthenticated connection.
 *   - Using a built-in LED connected to GPIO 2, which is pulled up and set to HIGH at boot.
 *   - One way to connect to the wireless network is by issuing the following command:
 *     mcconfig -m -p esp ssid="xxx" password="yyy"
 *   - Example usage:
 *     mosquitto_sub -h test.mosquitto.org -t "moddableexamples/#" -v
 *     mosquitto_pub -h test.mosquitto.org -t "moddableexamples/c2" -m 'on'
 *     mosquitto_pub -h test.mosquitto.org -t "moddableexamples/c2" -m 'off'
 *     mosquitto_pub -h test.mosquitto.org -t "moddableexamples/c2" -m 'toggle'
 */

import Client from 'mqtt';
import Digital from 'pins/digital';
import Net from 'net';
import Resource from 'Resource';
import SecureSocket from 'securesocket';

const broker = 'test.mosquitto.org';
const clientId = Net.get('MAC');
const c2Topic = 'moddableexamples/c2';
const personalTopic = `moddableexamples/${clientId}`;

const led = new Digital({
  pin: 2,
  mode: Digital.Output,
});

const mqttClient = new Client({
  host: broker,
  timeout: 60_000,
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
  trace(`The connection to ${broker} has been established.\n`);

  this.subscribe(c2Topic);
  this.publish(personalTopic, `hello world ${Date()}`);
};

mqttClient.onMessage = function onMessage(topic, data) {
  if (topic === c2Topic) {
    const message = String.fromArrayBuffer(data).toLowerCase();

    if (message === 'on') {
      toggleLed(0);
      this.publish(personalTopic, `The LED has been turned on,  ${Date()}`);
    } else if (message === 'off') {
      toggleLed(1);
      this.publish(personalTopic, `The LED has been turned off, ${Date()}`);
    } else if (message === 'toggle') {
      toggleLed();
      this.publish(personalTopic, `The LED has been toggled, ${Date()}`);
    }
  }
};

mqttClient.onClose = function onClose() {
  trace(`The connection to ${broker} has been lost or closed.\n`);
};
