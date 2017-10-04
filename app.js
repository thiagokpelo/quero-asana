;(function() {

    'use strict';

    HTMLElement.prototype.show = function() {
        return this.style.display = 'block';
    };

    HTMLElement.prototype.hide = function() {
        return this.style.display = 'none';
    };

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
