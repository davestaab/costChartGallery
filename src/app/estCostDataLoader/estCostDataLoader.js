import template from './estCostDataLoader.tpl.html';
import style from './est-cost-data-loader.css';

import d3 from 'd3';

class estCostDataLoader {
    constructor() {
        "ngInject";
        // this.data = undefined;
    }
    $onInit() {
        d3.csv(this.datasetFile, (data) => {

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
            this.myData = stack(stackData);
            console.log('series', this.myData);
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
