import 'core-js/client/shim';

import 'core-js/es6';
import 'core-js/es7/reflect';

import 'zone.js/dist/zone';

import 'ts-helpers';
import 'reflect-metadata';

if (ENV !== 'production') {
  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
