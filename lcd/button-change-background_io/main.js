/*
 * Hold a button to change the background color.
 * A basic throttling mechanism is being used to compensate for unreliable button.
 *
 * Tested on: ESP8266 (Moddable One).
 *
 * Parts list:
 *   - Moddable One
 */

// NOTE: Using the IO module, which is an experimental implementation of ECMA-419.
import Digital from 'embedded:io/digital';
import Poco from 'commodetto/Poco';
import Timer from 'timer';

const poco = new Poco(global.screen, { displayListLength: 2048 });
const black = poco.makeColor(0, 0, 0);
const yellow = poco.makeColor(255, 255, 0);
const red = poco.makeColor(255, 0, 0);

const paintBackground = function paintBackground(color) {
  poco.begin();
  poco.fillRectangle(color, 0, 0, poco.width, poco.height);
  poco.end();
};

paintBackground(black);

// NOTE: Using timers to implement a basic throttling mechanism.
const holdTimer = Timer.set((id) => {
  paintBackground(red);
  Timer.schedule(id);
}, 5000);
Timer.schedule(holdTimer);

// NOTE: Using a built-in Flash button connected to GPIO 0.
// eslint-disable-next-line no-unused-vars
const button = new Digital({
  pin: 0,
  mode: Digital.Input,
  edge: Digital.Rising | Digital.Falling,

  onReadable() {
    if (this.read() === 0) {
      Timer.schedule(holdTimer, 1000);
    } else {
      Timer.schedule(holdTimer);
      paintBackground(yellow);
    }
  },
});
