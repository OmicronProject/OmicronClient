'use strict';

var context = require.context('./src', true, /test_/);
context.keys().forEach(context);
