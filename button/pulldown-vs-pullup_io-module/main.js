/*
 * Tested on: ESP8266 (NodeMCU, Moddable One)
 *
 * Trace rising edge events on pull-up and pull-down buttons.
 *
 * Notes:
 * - Uses experimental ESP8266 implementation of TC53 IO class pattern.
 * - Simple software debouncing.
 * - Run with xsbug.
 * - Disable "BREAK -> On Exceptions" option in xsbug preferences.
 */

import Digital from 'embedded:io/digital';

let button1TimeoutId = null;
let button2TimeoutId = null;

const stopButton1Timeout = function stopButton1Timeout () {
  try {
    System.clearTimeout(button1TimeoutId);
  } catch (error) {
    trace(`This is probably normal: ${error}\n`);
  }
};

const stopButton2Timeout = function stopButton2Timeout () {
  try {
    System.clearTimeout(button2TimeoutId);
  } catch (error) {
    trace(`This is probably normal: ${error}\n`);
  }
};

const button1 = new Digital({
  pin: 4,
  mode: Digital.Input,
  edge: Digital.Rising | Digital.Falling,
  onReadable () {
    const button1Reading = this.read();
    stopButton1Timeout();
    if (!button1Reading) {
      button1TimeoutId = System.setTimeout(() => {
        trace('Pull-up button rising\n');
      }, 50);
    }
  }
});

const button2 = new Digital({
  pin: 5,
  mode: Digital.Input,
  edge: Digital.Rising | Digital.Falling,
  onReadable () {
    const button2Reading = this.read();
    stopButton2Timeout();
    if (!button2Reading) {
      button2TimeoutId = System.setTimeout(() => {
        trace('Pull-down button rising\n');
      }, 50);
    }
  }
});
