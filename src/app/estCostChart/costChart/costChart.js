import d3 from 'd3';

export default function costChart() {


    let width = 480;
    let height = 280;
    let x = d3.scale.ordinal().rangeRoundPoints([0,width]);
    let y = d3.scale.linear().range([height, 0]);
    var area = d3.svg.area()
        .x(function(d) { return x(d.date); })
        .y0(function(d) { return y(d.y0); })
        .y1(function(d) { return y(d.y0 + d.y); });
    function chart(entry) {
        const selection = entry
            .selectAll('.area')
            .data(d => d);

        selection.enter()
            .append('path')
            .attr('class', (d) => {
                return 'area area--' + d.name.toLowerCase();
            })
            .attr('d', (d, i) => {
                // debugger;
                console.log('d.values: ', i, d.values);
                return area(d.values);
            })
            ;
    }


    // properties
    chart.width = function (_) {
        if (!arguments.length) return width;
        width = _;
        return chart;
    };

    chart.height = function (_) {
        if (!arguments.length) return height;
        height = _;
        return chart;
    };

    chart.x = function (_) {
        if (!arguments.length) return x;
        x = _;
        return chart;
    };

    chart.y = function (_) {
        if (!arguments.length) return y;
        y = _;
        return chart;
    };

    return chart;
}
