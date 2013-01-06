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
    }
  },
  paths: {
    'jquery': '../lib/jquery-1.8.3.min',
    'underscore': '../lib/underscore-min',
    'backbone': '../lib/backbone-min'
  }
});

require([
  'jquery',
  'models',
  'views'
], function ($, models, views) {

  $(function() {
    var todoList = new models.TodoList();
    var todoListView = new views.TodoListView({
      collection: todoList,
      el: $('#todoList').get(0)
    });
  });

});
