;(function() {

    'use strict';

    var VIEW = {
        init: function() {

            console.log('VIEW INIT');

            var $taskDetail      = document.querySelector( '.task-detail' );
            var $buttonAddTask   = document.querySelector( '#addTask' );
            var $buttonCloseTask = document.querySelector( '#closeTask' );

            $buttonAddTask.addEventListener( 'click', function() {
                $taskDetail.show()
            });
            $buttonCloseTask.addEventListener( 'click', function() {
                $taskDetail.hide();
            });

        },
    };

    VIEW.init();



})();

HTMLElement.prototype.show = function() {
    return this.style.display = '';
};

HTMLElement.prototype.hide = function() {
    return this.style.display = 'none';
};
