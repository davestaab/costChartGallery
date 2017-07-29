import template from './estCostChart.tpl.html';
import style from './estCostChart.css';
import d3 from 'd3';

class estCostChart {
    constructor($element) {
        // console.log('estCostChart started');
        this.element = $element;
    }

    $onInit() {
        d3.select(this.element[0])
            .append('svg')
            .attr('width', 500)
            .attr('height', 300)
            ;
    }
}

export default function (module) {
    module.component('estCostChart', {
        template: template,
        controller: estCostChart
    });
}
