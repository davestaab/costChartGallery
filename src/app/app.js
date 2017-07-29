import angular from 'angular';

import '../style/app.css';

import estCostChart from './estCostChart/estCostChart';
// let app = () => {
//   return {
//     template: require('./app.html'),
//     controller: 'AppCtrl',
//     controllerAs: 'app'
//   }
// };
//
// class AppCtrl {
//   constructor() {
//     this.url = 'https://github.com/preboot/angular-webpack';
//   }
// }

const MODULE_NAME = 'app';

const module = angular.module(MODULE_NAME, []);
estCostChart(module);
  // .directive('app', app)
  // .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;
