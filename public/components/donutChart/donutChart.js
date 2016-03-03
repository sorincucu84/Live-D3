(function() {
  'use strict';

  angular
    .module('ngd3')
    .directive('donutChart', directive);

  /* @ngInject */
  function directive() {
    var directive = {
      restrict: 'E',
      scope: {
        data: '='
      },
      controller: Controller,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

  }

  Controller.$inject = ['$scope', '$element', '$attrs'];

  /* @ngInject */
  function Controller($scope, $element, attrs) {
    var vm = this;
    // var exp = $parse(attrs.data);
    var donutData = vm.data;

    var el = $element[0];
    var color = d3.scale.category10();
    var width = el.clientWidth;
    var height = el.clientHeight;
    var min = Math.min(width, height);
    var pie = d3.layout.pie().sort(null);
    var arc = d3.svg.arc()
      .innerRadius(min / 2 * 0.5)
      .outerRadius(min / 2 * 0.9);
    var svg = d3.select(el).append('svg').attr({
      width: width,
      height: height
    });

    var g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    function fillChartData(data) {
      g.selectAll('path')
        .data(pie(data))
        .enter().append('path')
        .attr('d', arc)
        .attr('fill', function(d, i) {
          return color(i)
        });
    }
    // For First time
    fillChartData(donutData);
    // Watching any change in data
    $scope.$watchCollection('vm.data', function(newVal, oldVal) {
      fillChartData(newVal);
      console.log("new val : " + newVal);
    });

  }
})();
