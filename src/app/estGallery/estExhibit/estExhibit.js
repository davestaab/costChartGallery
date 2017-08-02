import template from './estExhibit.tpl.html';
import style from './est-exhibit.css';

class estExhibit {
    constructor() {
        "ngInject";
    }


}

export default function (module) {
    module.component('estExhibit', {
        template: template,
        controller: estExhibit,
        transclude: {
            description: "exhibitDescription",
            display: "exhibitDisplay"
        },
    });
}
