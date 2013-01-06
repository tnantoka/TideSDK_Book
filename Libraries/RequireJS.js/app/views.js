'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'models'
], function($, _, Backbone, models) {

  var TODO_TEMPLATE = '<a href="#" class="check">&check;</a>\
  <%= name %>\
  <a href="#" class="remove">&times;</a>';

  var TodoView = Backbone.View.extend({
    tagName: 'li',
    events: {
      'click .remove': 'remove',
      'click .check': 'check'
    },
    initialize: function() {
      this.model.bind('change', this.render, this);
      this.model.bind("destroy", this.onDestroy, this);
    },
    render: function() {
      var bgColor = this.model.get('is_done') ? 'silver' : 'white';
      $(this.el)
        .html(_.template(TODO_TEMPLATE, this.model.attributes))
        .css('background', bgColor)
      ;
      return this;
    },
    remove: function() {
      this.model.destroy();
      return false;
    },
    check: function() {
      this.model.set('is_done', !this.model.get('is_done'));
      return false;
    },
    onDestroy: function () {
      $(this.el).remove();
    }
  });

  var TodoListView = Backbone.View.extend({
    events: {
      'click .add': 'add'
    },
    initialize: function() {
      this.collection.bind('add', this.onAdd, this);
      this.collection.bind("remove", this.onRemove, this);

      this.collection.load();
    },
    onAdd: function(model) {
      var view = new TodoView({ model: model });
      $(this.el).find('ul').append(view.render().el);
      this.collection.save();
    },
    onRemove: function(model) {
      this.collection.save();
    },
    add: function () {
      var model = new models.Todo({
        name: 'TODO ' + (this.collection.length + 1)
      });
      this.collection.add(model);
      return false;
    }
  });

  return {
    TodoView: TodoView,
    TodoListView: TodoListView
  };

});

