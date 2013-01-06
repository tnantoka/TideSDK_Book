'use strict';

$(function() {
  var md = '#Title';
  var converter = new Showdown.converter();
  $('#result').html(converter.makeHtml(md));
});