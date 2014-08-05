'use strict';

angular.module('chartjs-directive', []).
    directive('chart', function () {
        var baseWidth = 120;
        var baseHeight = 100;

        return {
            restrict: 'E',
            template: '<canvas></canvas>',
            scope: {
                chartObject: "=value"
            },
            link: function (scope, element, attrs) {
                var canvas = element.find('canvas')[0],
                    context = canvas.getContext('2d'),
                    chart;

                var options = {
                    type: attrs.type || "Line",
                    width: attrs.width || baseWidth,
                    height: attrs.height || baseHeight
                };
                canvas.width = options.width;
                canvas.height = options.height;
                chart = new Chart(context);


                scope.$watch(function () {
                    return element.attr('type');
                }, function (value) {
                    if (!value) return;
                    options.type = value;
                    var chartType = options.type;
                    chart[chartType](scope.chartObject.data, scope.chartObject.options);
                });

                var dataUpdateListener = function (value) {
                    if (!value) return;
                    var chartType = options.type;
                    chart[chartType](scope.chartObject.data, scope.chartObject.options);
                };

                //Update when charts data changes
                scope.$watch(function () {
                    return scope.chartObject.data;
                }, dataUpdateListener);

                //Update when charts data changes without changing the whole object
                scope.$watch(function () {
                    return scope.chartObject;
                }, dataUpdateListener);
            }
        }
    });
