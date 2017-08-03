import template from './estGallery.tpl.html';
import style from './est-gallery.css';

class estGallery {
    constructor() {
        "ngInject";
    }
    $onInit() {
        this.test = "hello world";
    }

}

export default function (module) {
    module.component('estGallery', {
        template: template,
        controller: estGallery,
        transclude: true,
        bindings: {
            title: '<'
        }
    });
}
