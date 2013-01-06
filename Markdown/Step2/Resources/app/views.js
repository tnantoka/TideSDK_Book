'use strict';

define([
  'jquery',
  'underscore',
  'backbone',
  'models',
  'showdown',
  'text!html/file.html'
], function($, _, Backbone, models, Showdown, fileHtml) {

  var FileView = Backbone.View.extend({
    tagName: 'li',
    events: {
        'click' : 'onClick'
    },
    initialize: function() {
      this.model.bind('change', this.render, this);
      this.model.bind("destroy", this.onDestroy, this);
    },
    onClick: function(e) {
      this.trigger('select', this);
    },
    onDestroy: function () {
      $(this.el).remove();
    },
    render: function() {
      var current = this.model.get('current') ? 'current' : '';
      $(this.el)
        .html(_.template(fileHtml, this.model.attributes))
        .removeClass('current')
        .addClass(current)
      ;
      return this;
    }
  });

  var FileListView = Backbone.View.extend({
    events: {
      'click .add': 'add',
      'click .open': 'open',
      'click .remove': 'remove'
    },
    initialize: function() {
      this.collection.bind('add', this.onAdd, this);
      this.collection.bind("remove", this.onRemove, this);
    },
    onAdd: function(model) {
      var view = new FileView({ model: model });
      $(this.el).find('.list').append(view.render().el);
      view.bind('select', this.onSelect, this);
      $(view.el).click();
      this.collection.save();
    },
    onRemove: function(model) {
      this.collection.save();
    },
    onSelect: function(view) {
      this.trigger('select', view);
      this.currentItem = view.model;

      this.collection.each(function(model) {
        model.set('current', model == view.model);
      });
    },
    add: function () {
      this.openDialog('openSaveAsDialog', 'Create File');
    },
    open: function () {
      this.openDialog('openFileChooserDialog');
    },
    remove: function() {
      if (!this.currentItem) return;
      if (!confirm('Remove item from list?\n(Real file is not deleted.)')) return;

      this.currentItem.destroy();
      delete this.currentItem;
      this.trigger('deselect');
    },
    openDialog: function(func, title) {
      var options = {
        multiple: false,
        directories: false,
        files: true,
        types: ['md', 'markdown']
      };
      if (title) {
        options.title = title;
      }
      Ti.UI[func](_.bind(function(f) {
        if (f.length) {
          var path = f[0];

          var paths = this.collection.each(function(model) {
            if (model.get('path') == path) {
              model.destroy();
            }
          });

          var model = new models.File({
            path: path
          });
          this.collection.add(model);
        }
      }, this), options);
    }
  });

  return {
    FileView: FileView,
    FileListView: FileListView
  };
});

