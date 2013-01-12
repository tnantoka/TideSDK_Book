'use strict';

$(function() {

  Ti.UI.getCurrentWindow().showInspector();

  var $features =$('#features');
  var $result = $('#result');

  var features = {
    'Alert': function() {
      alert('Test');
    },
    'Confirm': function() {
      var result = confirm('Test') ? 'OK' : 'Cancel';
      $result.html(result);
    },
    'Read Directory': function() {
      var path = '~/Desktop';
      var dir = Ti.Filesystem.getFile(path);
      var files = dir.getDirectoryListing().map(function(file) {
        return file.name();
      });
      files.unshift(path);
      $result.html(files.join('\n  '));
    },
    'Write File': function() {
      var path = '~/Desktop/TideSDK_Features.txt';
      var content = new Date().toString();
      var stream = Ti.Filesystem.getFileStream(path);
      stream.open(Ti.Filesystem.MODE_WRITE);
      stream.write(content);
      stream.close();
      $result.html('"' + content + '" to "' + path + '"');
    },
    'Read File': function() {
      var path = '~/Desktop/TideSDK_Features.txt';
      var file = Ti.Filesystem.getFile(path);
      var content = file.read().toString();
      $result.html(path + '\n\n' + content);
    },
    'Add Menu': function() {
      var menu = Ti.UI.createMenu();

      var menu1 = Ti.UI.createMenuItem('Menu 1');
      menu.appendItem(menu1);

      menu1.addItem('Item 1', function() {
        alert('Item 1');
      });
      menu1.addSeparatorItem();
      menu1.addItem('Item 2');

      Ti.UI.getCurrentWindow().setMenu(menu);

      $result.html('See menu bar.');
    },
    'Add Tray Icon': function() {
      var tray = Ti.UI.addTray('app://tray.png');

      var menu = Ti.UI.createMenu();

      var menu1 = Ti.UI.createMenuItem('Menu 1', function() {
        alert('Menu 1');
      });
      menu.appendItem(menu1);

      tray.setMenu(menu);

      $result.html('See menu bar.');
    },
    'HTTP Request': function() {
      var url = 'http://example.com/';
      /* Doesn't work
      var client = Ti.Network.createHTTPClient({
        onload: function(e) {
          console.log('load');
          $result.html(this.responseText);
        }
      });
      */
      var client = Ti.Network.createHTTPClient();
      client.onload = function(e) {
        $result.html(this.responseText);
        console.log(this.responseText);
      };
      client.open('GET',url);
      client.send();
    },
    'Show Notification': function() {
      var notification = Ti.Notification.createNotification();
       notification.setTitle('Title');
       notification.setMessage('Message');
       notification.show();
      $result.html('See notification.');
    },
    'Open Window': function() {
      /*
      var win= Ti.UI.getCurrentWindow().createWindow({
        title: 'New Window',
        contents: 'Test'
       });
       */
      /*
      var win= Ti.UI.getCurrentWindow().createWindow({
        url: 'app://new.html'
       });
       */
      var win= Ti.UI.getCurrentWindow().createWindow('app://new.html');
      win.open();
      $result.html('See window.');
    },
    'Database': function() {
      var dbFile = Ti.Filesystem.getFile(Ti.Filesystem.getApplicationDataDirectory(), 'test.db');
      var db = Ti.Database.openFile(dbFile);

      db.execute('CREATE TABLE IF NOT EXISTS logs(id  INTEGER PRIMARY KEY AUTOINCREMENT, created_at TEXT)');
      db.execute('INSERT INTO logs VALUES(NULL, ?)', new Date().toString());

      var rows = db.execute('SELECT * FROM logs');
      while (rows.isValidRow()) {
        $result.html([$result.html(), rows.fieldByName('id'), '  ', rows.fieldByName('created_at'), '\n'].join(''));
        console.log([$result.html(), rows.fieldByName('id'), '  ', rows.fieldByName('created_at'), '\n'].join(''));
        rows.next();
      }

      rows.close();
      db.close();
    }

  };

  Object.keys(features).forEach(function(feature) {
    var $feature = $('<li><a href="#">' + feature + '</a></li>');
    $feature.on('click', 'a', function() {
      $result.html('');
      features[feature]();
    });
    $features.append($feature);
  });

});
