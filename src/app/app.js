import angular from 'angular';

import '../style/app.css';

import estCostChart from './estCostChart/estCostChart';
import estGallery from './estGallery/estGallery';
import estExhibit from './estGallery/estExhibit/estExhibit';

const MODULE_NAME = 'app';

const module = angular.module(MODULE_NAME, []);
estCostChart(module);
estGallery(module);
estExhibit(module);

export default MODULE_NAME;
