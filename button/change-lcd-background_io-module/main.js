/*
 * Tested on: ESP8266 (Moddable One)
 *
 * Press or hold the button to change background color.
 *
 * Notes:
 * - Uses experimental ESP8266 implementation of TC53 IO class pattern.
 * - Built-in Flash button available via GPIO 0.
 * - Disable "BREAK -> On Exceptions" option in xsbug preferences.
 */

import Digital from 'embedded:io/digital';
import Poco from 'commodetto/Poco';

const poco = new Poco(global.screen, { displayListLength: 2048 });
const black = poco.makeColor(0, 0, 0);
const yellow = poco.makeColor(255, 255, 0);
const red = poco.makeColor(255, 0, 0);
let timeoutId = null;

const stopTimeout = function stopTimeout () {
  try {
    System.clearTimeout(timeoutId);
  } catch (error) {
    trace(`This is probably normal: ${error}\n`);
  }
};

const paintBackground = function paintBackground (color) {
  poco.begin();
  poco.fillRectangle(color, 0, 0, poco.width, poco.height);
  poco.end();
};

paintBackground(black);

const button = new Digital({
  pin: 0,
  mode: Digital.Input,
  edge: Digital.Rising | Digital.Falling,
  onReadable () {
    const reading = this.read();
    if (reading) {
      stopTimeout();
      paintBackground(black);
    } else {
      stopTimeout();
      paintBackground(yellow);
      timeoutId = System.setTimeout(() => {
        paintBackground(red);
      }, 1000);
    }
  }
});
