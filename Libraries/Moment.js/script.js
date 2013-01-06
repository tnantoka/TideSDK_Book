'use strict';

$(function() {
  $('#result').html(moment("20130101", "YYYYMMDD").fromNow());
  moment("20130101", "YYYYMMDD").fromNow();
});