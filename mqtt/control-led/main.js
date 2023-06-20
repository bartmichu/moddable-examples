/*
 * Control an LED remotely over the internet.
 *
 * Tested on: ESP8266 (NodeMCU, Moddable One), RP2040 (Raspberry Pi Pico W).
 *
 * Notes:
 *   - Using an encrypted connection.
 *   - Using an unauthenticated connection.
 *   - Reading from an output pin is generally considered improper usage or abuse.
 *   - One way to connect to the wireless network is by issuing the following command:
 *     mcconfig -m -p esp ssid="xxx" password="yyy"
 *   - Example usage:
 *     mosquitto_sub -h test.mosquitto.org -t "moddableexamples/#" -v
 *     mosquitto_pub -h test.mosquitto.org -t "moddableexamples/c2" -m 'on'
 *     mosquitto_pub -h test.mosquitto.org -t "moddableexamples/c2" -m 'off'
 *     mosquitto_pub -h test.mosquitto.org -t "moddableexamples/c2" -m 'toggle'
 *
 * Parts list:
 *   - Raspberry Pi Pico W
 *   - Beadboard
 *   - Jumper wires
 *   - Light-emitting diode (LED)
 *   - 330 ohm Resistor (Orange, Orange, Brown, Gold)
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

// pin 22 on Pico W, pin 5 on NodeMCU V2
const led = new Digital({
  pin: 22,
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

const toggleLed = function toggleLed(newState) {
  led.write(typeof newState === 'undefined' ? !led.read() : newState);
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
