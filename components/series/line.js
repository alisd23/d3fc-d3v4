(function(d3, fc) {
    'use strict';

    fc.series.line = function() {

        var xValue = fc.utilities.valueAccessor('date'),
            yValue = fc.utilities.valueAccessor('close'),
            xScale = fc.scale.dateTime(),
            yScale = fc.scale.linear(),
            underFill = true,
            area = d3.svg.area(),
            d3line = d3.svg.line(),
            css = 'line-series';

        var line = function(selection) {
            var container, areapath, linepath;
            selection.each(function(data) {

                if (underFill) {
                    area.x(function(d) { return xScale(xValue(d)); })
                        .y0(yScale(0))
                        .y1(function(d) { return yScale(yValue(d)); });
                }

                d3line
                    .x(function(d) { return xScale(xValue(d)); })
                    .y(function(d) { return yScale(yValue(d)); });

                // add a 'root' g element on the first enter selection. This ensures
                // that it is just added once
                container = d3.select(this)
                    .selectAll('.' + css)
                    .data([data]);
                container.enter()
                    .append('g')
                    .classed(css, true);

                areapath = container
                        .selectAll('.area')
                        .data([data]);
                // enter
                areapath.enter()
                    .append('path');
                // update
                areapath
                    .classed('area', true)
                    .attr('d', function(d) {
                        return underFill ? area(d) : null;
                    });
                // exit
                areapath.exit()
                    .remove();


                linepath = container
                    .selectAll('.line')
                    .data([data]);
                // enter
                linepath.enter()
                    .append('path');
                // update
                linepath
                    .classed('line', true)
                    .attr('d', d3line);
                // exit
                linepath.exit()
                    .remove();
            });
        };

        line.xValue = function(value) {
            if (!arguments.length) {
                return xValue;
            }
            xValue = value;
            return line;
        };

        line.yValue = function(value) {
            if (!arguments.length) {
                return yValue;
            }
            yValue = value;
            return line;
        };

        line.xScale = function(value) {
            if (!arguments.length) {
                return xScale;
            }
            xScale = value;
            return line;
        };

        line.yScale = function(value) {
            if (!arguments.length) {
                return yScale;
            }
            yScale = value;
            return line;
        };

        line.underFill = function(value) {
            if (!arguments.length) {
                return underFill;
            }
            underFill = value;
            return line;
        };

        return line;
    };
}(d3, fc));