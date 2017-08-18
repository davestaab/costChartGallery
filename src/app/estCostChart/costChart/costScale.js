import d3 from 'd3';
import moment from 'moment';
import { flatMap, head, uniqBy } from 'lodash';
import { legendDataFromDomain, domainByYear } from '../utils';

export default function costChart() {
    let width = 500;
    let height = 30;
    let margin = {
        top: 0, right: 10, bottom: 0, left: 10
    };
    let seenYears = [];
    let x = d3.scale.ordinal().rangeRoundPoints([0,width - margin.left - margin.right])
    let axis = d3.svg.axis()
        .orient('bottom')
        .scale(x)
        .tickFormat((d) => moment(d, 'YYYYMM').format('YY'))
        ;


    function chart(entry) {
        const data = head(entry.data());
        x.domain(data.domain);
        const legendData = legendDataFromDomain(data.domain, data.active)
        const domainByYearData = domainByYear(data.domain);
        let matchedYear;
        const axisTickValues = data.domain.reduce((result, d) => {
            const year = moment(d, 'YYYYMM').year();
            if(!matchedYear || matchedYear !== year){
                matchedYear = year;
                return [...result, d];
            }
            return result;
        }, []);
        axis.tickValues(axisTickValues);
        const selection = entry
            .selectAll('.cost-scale__range')
            .data(d => legendData);


        // console.log('point midway', pointMidway);
        selection.enter()
            .append('rect')
            .attr('class', (d) => {
                // console.log('cost scale', d, i);
                return 'cost-scale__range cost-scale__range--' + d.label;
            })
            .attr('height', height - margin.top - margin.bottom)
            .attr('x', (d, i) => x(d.range[0]))
            .attr('width', (d, i) => x(d.range[1]) - x(d.range[0])
            );
        entry.append('g')
            .attr('class', 'cost-scale__axis')
            .call(axis)
          .selectAll("text")
            // .style("text-anchor", "start")
            .attr('x', (d, i) => {
                const year = '' + moment(d, 'YYYYMM').year();
                const domain = domainByYearData[year]
                return (x(domain[1]) - x(domain[0]))/2;
            })
            ;
;
    }

    chart.x = function (_) {
        if (!arguments.length) return x;
        x = _;
        return chart;
    };
    chart.margin = function (_) {
        if (!arguments.length) return margin;
        margin = _;
        return chart;
    };
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
    chart.axis = function (_) {
        if (!arguments.length) return axis;
        axis = _;
        return chart;
    };

    return chart;
}
