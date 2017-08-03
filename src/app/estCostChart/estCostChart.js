import template from './estCostChart.tpl.html';
import style from './estCostChart.css';
import d3 from 'd3';
import costChart from './costChart/costChart';
import { translate } from './utils';


class estCostChart {
    constructor($element) {
        // console.log('estCostChart started');
        this.element = $element;
        this.chart = costChart();
    }

    $onInit() {
        d3.select(this.element[0])
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
        console.log('cost chart changes', changes);
        if(changes.chartData){
            console.log('chart data changes');
        }
    }
}

export default function (module) {
    module.component('estCostChart', {
        // template: template,
        controller: estCostChart,
        bindings: {
            myData: '<'
        }
    });
}
