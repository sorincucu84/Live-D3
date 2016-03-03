(function(){
  'use strict';
  var express = require("express");
  var app = express();
  var http = require('http').Server(app);
  var io = require('socket.io')(http);

  app.use(express.static(__dirname + '/public'));
  
  io.on('connection', function(socket){
    console.log('a user connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
    // For Pie Chart
    socket.on('pie-chart-data', function(msg){
      console.log('pie chart data : ' + msg);
  	 io.emit('pie-chart-data', msg);
    });
    // For Line Chart
    socket.on('line-chart-data', function(msg){
      console.log('line chart data : ' + msg);
  	 io.emit('line-chart-data', msg);
    });
  });

  http.listen(3000, function () {
      console.log('listening on *:4000');
  });

})();
