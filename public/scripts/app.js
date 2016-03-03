(function() {
  'use strict';

  angular
    .module('app', ['ngd3'])
    .controller('appController', Controller);

  Controller.$inject = ['$scope', '$interval'];

  function Controller($scope, $interval) {
    $scope.donutData = [10, 20, 30, 40];
    $scope.lineData = [
        {hour: 1,sales: 54},
        {hour: 2,sales: 66},
        {hour: 3,sales: 77},
        {hour: 4,sales: 70},
        {hour: 5,sales: 60},
        {hour: 6,sales: 63},
        {hour: 7,sales: 55},
        {hour: 8,sales: 47},
        {hour: 9,sales: 55},
        {hour: 10,sales: 30}
    ];
    // console.log($scope.donutData);

    // Making WebSocket connection
    var socket = io();
    socket.on('pie-chart-data', function(msg) {
      // On receive of amy new data
      $scope.$apply(function() {
        $scope.donutData.push(parseInt(msg));
      });
      console.log("inside app.js" + $scope.donutData);
    });
    socket.on('line-chart-data', function(msg) {
      // On receive of amy new data
      $scope.$apply(function() {
        $scope.lineData.push(msg);
      });
      console.log("inside app.js line " +$scope.lineData);
    });
  }
})();
