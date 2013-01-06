'use strict';

$(function() {
  var template = '<p><strong><%= test %></strong></p>';
  $('#result').html(_.template(template, { test: 'Hello' }));
});