'use strict';

require('@babel/register')({
	presets: [
    '@babel/preset-env'
  ]
});

require('./server').default();