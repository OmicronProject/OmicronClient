'use strict';

process.NODE_ENV = "TEST";
var context = require.context('./src', true, /test_/);
context.keys().forEach(context);
