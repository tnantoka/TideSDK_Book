'use strict';

define([
  'models'
], function(models) {

  module('Todo');

  test('Defaults',
    function() {
      var todo = new models.Todo();
      equal(todo.get('is_done'), false);
      equal(todo.get('name'), 'TODO');
    }
  );

  module('TodoList', {
    setup: function() {
      this.todo1 = new models.Todo({
        name: 'TODO 1'
      });
      this.todo2 = new models.Todo({
        name: 'TODO 2'
      });
    }
  });

  test("Save",
    function() {
      var todoList = new models.TodoList();
      todoList.add(this.todo1);
      todoList.add(this.todo2);
      todoList.save();
      ok(true, 'successfully saved');
    }
  );

  test('Load',
    function() {
      var todoList = new models.TodoList();
      todoList.load();
      equal(todoList.models[0].get('name'), this.todo1.get('name'));
      equal(todoList.models[1].get('name'), this.todo2.get('name'));
    }
  );

});

