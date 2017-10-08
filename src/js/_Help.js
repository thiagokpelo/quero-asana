'use strict';

HTMLElement.prototype.show = function() {
    return this.style.display = '';
};

HTMLElement.prototype.hide = function() {
    return this.style.display = 'none';
};
