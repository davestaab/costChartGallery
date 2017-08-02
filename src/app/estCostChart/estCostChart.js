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
        d3.csv('data/cost-2016.csv', (data) => {

            console.log('data', data);
            const categories = ["Labor","Subcontracts","Materials","Travel_ODC","Internal"];

            const stackData = categories.map((cat) => {
                return {
                    name: cat,
                    values: data.map((d) => {
                        return {
                            date: d.date,
                            y: d[cat]
                        };
                    })
                };
            });
            console.log('stackData', stackData);
            //
            let stack = d3.layout.stack().values((d) => d.values);
            this.series = stack(stackData);
            console.log('series', this.series);
        });

    }

    $onInit() {
        if(this.chartData){
            d3.select(this.element[0])
                .append('svg')
                .attr('width', 500)
                .attr('height', 300)
                .append('g')
                .attr('transform', translate(10, 10))
                .datum(this.chartData)
                .call(this.chart)
                ;
        }
    }

    $onChanges(changes) {
        if(changes.chartData){

        }
    }
}

export default function (module) {
    module.component('estCostChart', {
        template: template,
        controller: estCostChart,
        bindings: {
            chartData: '<'
        }
    });
}
