(function () {
    'use strict';

	 var socket = io();
	 $('#pieform').submit(function () {
		 socket.emit('pie-chart-data', $('#inputData').val());
		 $('#inputData').val('');
		 return false;
	 });

   $('#lineform').submit(function () {
     var obj = {
       hour: $('#inputData1').val(),
       sales: $('#inputData2').val()
     }
     console.log(obj);
      socket.emit('line-chart-data',obj);
      $('#inputData1').val('');
      $('#inputData2').val('');
      return false;
   });
})();
