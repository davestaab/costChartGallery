import d3 from 'd3';
import costScale from '../estCostChart/costChart/costScale';
import style from '../estCostChart/costChart/cost-scale.css';
import { translate, legendDataFromDomain, createYears, gradient } from '../estCostChart/utils';
import { flatMap } from 'lodash';
import moment from 'moment';

class estCostLegend {

    constructor($element) {
        "ngInject";
        this.$element = $element;
    }

    $onInit() {
        this.selection = d3.select(this.$element[0])
            .append('svg')
            .attr('width', 500)
            .attr('height', 300);
        let svgDefs = this.selection.append('defs');
        gradient(svgDefs, 'pastGradient',
            ['cost-scale__stop-one', 'cost-scale__stop-two']);
        gradient(svgDefs, 'futureGradient',
            ['cost-scale__stop-two', 'cost-scale__stop-one']);

        this.chartGroup = this.selection
            .append('g')
            .attr('transform', translate(10, 10));
        // chart1
        let chart1 = costScale();
        // chart1.x().domain(createYears(2016, 2017, 2018));
        this.chartGroup.append('g')
            .datum({
                active: 2017,
                domain: createYears(2016, 2017, 2018),
            })
            .call(chart1);
        // chart2
        let chart2 = costScale();
        // chart2.x().domain(createYears(2016, 2017, 2018));
        this.chartGroup.append('g')
            .attr('transform', translate(0, 40))
            .datum({
                active: 2016,
                domain: createYears(2016, 2017, 2018)
            })
            .call(chart2);
        // chart 3
        let chart3 = costScale();
        this.chartGroup.append('g')
            .attr('transform', translate(0, 40 * 2))
            .datum({
                active: 2018,
                domain: createYears(2016, 2017, 2018),
            })
            .call(chart3);
        // chart4
        let chart4 = costScale();
        this.chartGroup.append('g')
            .attr('transform', translate(0, 40 * 3))
            .datum({
                active: 2018,
                domain: [createYears(2016, 2017, 2018), '201901'],
            })
            .call(chart4);

    }
}

export default function (module) {
    module.component('estCostLegend', {
        controller: estCostLegend,
        bindings: {
        }
    });
}
