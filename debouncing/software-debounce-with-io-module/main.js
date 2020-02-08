/*
 * Tested on: ESP8266 NodeMCU / Moddable One
 *
 * Press and/or hold a button to toggle LED.
 *
 * Notes:
 * - Uses experimental ESP8266 implementation of TC53 IO class pattern.
 * - Built-in LED available via pulled up GPIO 2, HIGH at boot.
 * - Built-in Flash button available via GPIO 0.
 * - Software debouncing.
 * - Disable "BREAK -> On Exceptions" option in xsbug preferences.
 */

import Digital from 'builtin/digital';

let pressTimeoutId = null;
let holdTimeoutId = null;
const pressDelay = 100;
const holdDelay = 1000;

const led = new Digital({
  pin: 2,
  mode: Digital.Output,
});

const stopTimeouts = function stopTimeouts() {
  try {
    System.clearTimeout(pressTimeoutId);
  } catch (error) {
    // trace(`This is probably normal: ${error}\n`);
  }

  try {
    System.clearTimeout(holdTimeoutId);
  } catch (error) {
    // trace(`This is probably normal: ${error}\n`);
  }
};

const pressHandler = function pressHandler() {
  led.write(1);
};

const holdHandler = function holdHandler() {
  led.write(0);
};

const button = new Digital({
  pin: 0,
  mode: Digital.Input,
  edge: Digital.Rising | Digital.Falling,

  onReadable() {
    if (this.read()) {
      stopTimeouts();
    } else {
      stopTimeouts();

      pressTimeoutId = System.setTimeout(() => {
        pressHandler();
      }, pressDelay);

      holdTimeoutId = System.setTimeout(() => {
        holdHandler();
      }, holdDelay);
    }
  },
});
