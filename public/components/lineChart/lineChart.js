(function() {
  'use strict';

  angular
    .module('ngd3')
    .directive('lineChart', directive);

  /* @ngInject */
  function directive() {
    var directive = {
      restrict: 'E',
      scope: {
        data: '='
      },
      link: linkFunc,
      controller: Controller,
      controllerAs: 'vm',
      bindToController: true
    };

    return directive;

    function linkFunc(scope, el, attr, ctrl) {

    }
  }

  Controller.$inject = ['$scope','$element','$attrs'];

  /* @ngInject */
  function Controller($scope,$element, attrs) {
    var vm = this;
    var lineData = vm.data;
    console.log("inside line data : "+ lineData);
    var el = $element[0];
    var width = 450;//el.clientWidth;
    var height = 200;//el.clientHeight;
    var padding = 20;
    var pathClass = "path";
    var xScale, yScale, xAxisGen, yAxisGen, lineFun;

    var svg = d3.select(el).append('svg').attr({
      width: width,
      height: height
    });
    // var g = svg.append('g').attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

    function setChartParameters() {

      xScale = d3.scale.linear()
        .domain([lineData[0].hour, lineData[lineData.length - 1].hour])
        .range([padding + 5, width - padding]);

      yScale = d3.scale.linear()
        .domain([0, d3.max(lineData, function(d) {
          return d.sales;
        })])
        .range([height - padding, 0]);

      xAxisGen = d3.svg.axis()
        .scale(xScale)
        .orient("bottom")
        .ticks(lineData.length - 1);

      yAxisGen = d3.svg.axis()
        .scale(yScale)
        .orient("left")
        .ticks(5);

      lineFun = d3.svg.line()
        .x(function(d) {
          return xScale(d.hour);
        })
        .y(function(d) {
          return yScale(d.sales);
        })
        .interpolate("basis");
    }

    function drawLineChart() {

      setChartParameters();

      svg.append("svg:g")
        .attr("class", "x axis")
        .attr("transform", "translate(0,180)")
        .call(xAxisGen);

      svg.append("svg:g")
        .attr("class", "y axis")
        .attr("transform", "translate(20,0)")
        .call(yAxisGen);

      svg.append("svg:path")
        .attr({
          d: lineFun(lineData),
          "stroke": "#2ca02c",
          "stroke-width": 2,
          "fill": "none",
          "class": pathClass
        });
    }

    function redrawLineChart() {

      setChartParameters();

      svg.selectAll("g.y.axis").call(yAxisGen);

      svg.selectAll("g.x.axis").call(xAxisGen);

      svg.selectAll("." + pathClass)
        .attr({
          d: lineFun(lineData)
        });
    }

    // For First time
    drawLineChart();
    // Watching any change in data
    $scope.$watchCollection('vm.data', function(newVal, oldVal) {
      lineData = newVal;
      redrawLineChart();
      console.log("new val : " + newVal);
    });

  }
})();
