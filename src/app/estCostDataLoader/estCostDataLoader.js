import template from './estCostDataLoader.tpl.html';
import style from './est-cost-data-loader.css';

import d3 from 'd3';
import angular from 'angular';

class estCostDataLoader {

    constructor($timeout) {
        "ngInject";
        this.$timeout = $timeout;
    }

    $onInit() {
        d3.csv(this.datasetFile, (data) => {
            this.$timeout(() => {
                console.log('data', data);
                const categories = ["Labor","Subcontracts","Materials","Travel_ODC","Internal"];

                const stackData = categories.map((cat) => {
                    return {
                        name: cat,
                        values: data.map((d) => {
                            return {
                                date: d.date,
                                y: Number(d[cat])
                            };
                        })
                    };
                });
                console.log('stackData', stackData);
                //
                let stack = d3.layout.stack().values((d) => d.values);
                let stacked = stack(stackData);
                console.log('series', stacked);
                this.theData = stacked;
            });
        });
    }

}

export default function (module) {
    module.component('estCostDataLoader', {
        template: template,
        controller: estCostDataLoader,
        bindings: {
            datasetFile: '<'
        }
    });
}
