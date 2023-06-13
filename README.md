# Simple Moddable SDK examples and experiments

This repository contains my coding experiments focused on exploring microcontrollers, electronics basics, the Moddable SDK, and JavaScript programming in general.

I'm using devices based on the Espressif ESP8266 and ESP32, as well as the Raspberry Pi Pico W. Different examples have been tested on various boards, and you can find specific details in the notes section of each `main.js` file.

The list of parts for each example is located in the `main.js` file, and the Fritzing diagram image is located in the corresponding example's directory. If you are using the NodeMCU ESP8266 V2 board and need a push button or LED, you can utilize the built-in Flash button connected to GPIO 0 and the built-in LED connected to GPIO 2 (which is pulled up and set to HIGH at boot).
Please remember to adjust the pin values in the code to match your specific wiring configuration.

Examples with names ending in `_io` utilize the io module, while those ending in `_j5e` utilize the j5e framework. Some examples are duplicated if it's appropriate. For instance, the button debouncing example can be found in both the `rate-limiting` and `button` directories.
