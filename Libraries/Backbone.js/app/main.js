'use strict';

$(function() {
  var todoList = new TodoList();
  var todoListView = new TodoListView({
    collection: todoList,
    el: $('#todoList').get(0)
  });
});
