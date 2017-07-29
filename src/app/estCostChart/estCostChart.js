import template from './estCostChart.tpl.html';
import style from './estCostChart.css';

class estCostChart {
    constructor() {
        console.log('estCostChart started');
    }
}

export default function (module) {
    module.component('estCostChart', {
        template: template,
        controller: estCostChart
    });
}
