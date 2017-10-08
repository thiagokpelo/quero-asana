'use strict';

HTMLElement.prototype.show = function() {
    return this.style.display = '';
};

HTMLElement.prototype.hide = function() {
    return this.style.display = 'none';
};

Array.prototype.last = function(){
    return this[ this.length - 1 ];
};
