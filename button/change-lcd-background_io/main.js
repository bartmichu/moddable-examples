/*
 * Hold a button to change the background color.
 *
 * Tested on: ESP8266 (Moddable One).
 *
 * Notes:
 *   - Using the IO module, which is an experimental implementation of ECMA-419.
 *   - Using a built-in Flash button connected to GPIO 0.
 *
 * Parts list:
 *   - Moddable One
 */

import Digital from 'embedded:io/digital';
import Poco from 'commodetto/Poco';

const poco = new Poco(global.screen, { displayListLength: 2048 });
const black = poco.makeColor(0, 0, 0);
const yellow = poco.makeColor(255, 255, 0);
const red = poco.makeColor(255, 0, 0);
let holdTimer = null;

const paintBackground = function paintBackground(color) {
  poco.begin();
  poco.fillRectangle(color, 0, 0, poco.width, poco.height);
  poco.end();
};

paintBackground(black);

// eslint-disable-next-line no-unused-vars
const button = new Digital({
  pin: 0,
  mode: Digital.Input,
  edge: Digital.Rising | Digital.Falling,
  onReadable() {
    const reading = button.read();
    if (reading === 0) {
      holdTimer = System.setTimeout(() => {
        paintBackground(red);
        holdTimer = null;
      }, 1000);
    } else if (holdTimer !== null) {
      System.clearTimeout(holdTimer);
      paintBackground(yellow);
    }
  },
});
