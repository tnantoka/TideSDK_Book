'use strict';

define([
  'backbone'
], function(Backbone) {

  var Todo = Backbone.Model.extend({
    defaults: {
      name: 'TODO',
      is_done: false
    }
  });

  var TodoList = Backbone.Collection.extend({
    model: Todo,
    save: function() {
      var todos = this.map(function(model) {
        return model.attributes;
      });
      localStorage.setItem('todoList', JSON.stringify(todos));
    },
    load: function() {
      var todos = JSON.parse(localStorage.getItem('todoList'));
      if (!todos) return;
      for (var i = 0; i < todos.length; i++) {
        var todo = todos[i];
        this.add(todo);
      }
    }
  });

  return {
    Todo: Todo,
    TodoList: TodoList
  };

});
