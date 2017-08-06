import template from './estCostChart.tpl.html';
import style from './estCostChart.css';
import d3 from 'd3';
import costChart from './costChart/costChart';
import costChartStyle from './costChart/cost-chart.css';
import { translate } from './utils';
import { flatMap } from 'lodash';

class estCostChart {
    constructor($element) {
        // console.log('estCostChart started');
        this.element = $element;
        this.chart = costChart();
    }

    $onInit() {
        this.selection = d3.select(this.element[0])
            .append('svg')
            .attr('width', 500)
            .attr('height', 300)
            .append('g')
            .attr('transform', translate(10, 10))
            // .datum(this.chartData)
            // .call(this.chart)
            ;
    }

    $onChanges(changes) {
        if(changes.chartData && changes.chartData.currentValue){
            this.updateChart(this.chartData);
        }
    }

    updateChart(data){
        // debugger;
        const xDomain = data[0].values.map((d) => d.date)
        this.chart.x().domain(xDomain);
        const yDomain = d3.extent(flatMap(data, (d) => {
            return d3.extent(d.values.map((dd) => {
                return dd.y + dd.y0;
            }));
        }));
        this.chart.y().domain(yDomain);
        this.selection.datum(data).call(this.chart);
    }
}

export default function (module) {
    module.component('estCostChart', {
        // template: template,
        controller: estCostChart,
        bindings: {
            chartData: '<'
        }
    });
}
