'use strict';

require.config({
  shim: {
    'jquery': {
      exports: 'jQuery'
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['underscore', 'jquery'],
      exports: 'Backbone'
    },
    'showdown': {
      exports: 'Showdown'
    },
    'moment': {
      exports: 'moment'
    }
  },
  paths: {
    'jquery': '../lib/jquery-1.8.3.min',
    'underscore': '../lib/underscore-min',
    'backbone': '../lib/backbone-min',
    'showdown': '../lib/showdown/showdown',
    'moment': '../lib/moment.min',
    'text': '../lib/text'
  }
});

require([
  'jquery',
  'models',
  'views'
], function ($, models, views) {

  var DEBUG;
  DEBUG = true;

  $(function() {

    if (DEBUG) {
      Ti.UI.getCurrentWindow().showInspector();
    }

    console.log('Hello, Markdown');

  });

});
