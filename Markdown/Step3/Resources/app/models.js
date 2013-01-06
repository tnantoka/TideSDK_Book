'use strict';

define([
  'backbone',
  'moment'
], function(Backbone) {

  var File = Backbone.Model.extend({
    defaults: {
      current: false
    },
    initialize: function() {
      var path = this.get('path');
      var file = Ti.Filesystem.getFile(path);
      var name = path.split('/').pop();

      if (!file.exists()) {
        this.set('text', '#' + name);
        this.save();
        file = Ti.Filesystem.getFile(path);
      }

      this.set('text', file.open().read().toString());
      this.set('name', name);
    },
    save: function() {
      var stream = Ti.Filesystem.getFileStream(this.get('path'));
      stream.open(Ti.Filesystem.MODE_WRITE);
      stream.write(this.get('text'));
      stream.close();
    }
  });

  var FileList = Backbone.Collection.extend({
    model: File,
    save: function() {
      var paths = this.map(function(model) {
        return model.get('path');
      });
      localStorage.setItem('fileList', JSON.stringify(paths));
    },
    load: function() {
      var paths = JSON.parse(localStorage.getItem('fileList'));

      if (!paths) return;

      for (var i = 0; i < paths.length; i++) {
        var path = paths[i];
        var file = Ti.Filesystem.getFile(path);
        if (file.exists()) {
          var model = new File({
            path: path
          });
          this.add(model);
        }
      }

      this.save();
    }

  });

  return {
    File: File,
    FileList: FileList
  };

});
