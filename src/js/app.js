;(function() {

    'use strict';

    var MODEL = {

        init: function() {},

        tasks: [
            { id: 1, title: 'Work it harder', description: 'Lorem ipsum fa fdasj fasij' },
            { id: 2, title: 'Make it better!', description: 'Lorem ipsum fa fdasj fasij' },
            { id: 3, title: 'Testando essa parada', description: '' }
        ]
     };

    var CONTROLLER = {

        init: function( args ) {
            console.log( args );

            MODEL.init();
            VIEW.init();
        },

        listTasks: function() {
            return MODEL.tasks;
        },

        getTask: function( id ) {
            return MODEL.tasks.filter(function( t ) {
                return id == t.id;
            });
        }
    };

    var VIEW = {
        init: function() {
            VIEW.$taskDetail.hide();

            VIEW.listTasks().map( VIEW.createTasksList );

            VIEW.$buttonAddTask.addEventListener( 'click', function() {
                VIEW.$taskDetail.show();
            });

            VIEW.$buttonCloseTask.addEventListener( 'click', function() {
                VIEW.$taskDetail.hide();
            });

            VIEW.$body.addEventListener( 'click', function( event ) {
                if (event.target.tagName.toLowerCase() === 'span') {
                    VIEW.editTask( event.target.dataset.id );
                }
            });
        },

        $body:            document.querySelector( 'body' ),
        $taskDetail:      document.querySelector( '.task-detail' ),
        $tasksList:       document.querySelector( '#tasksList' ),
        $tasks:           document.querySelectorAll( '#tasksList span' ),
        $buttonAddTask:   document.querySelector( '#addTask' ),
        $buttonCloseTask: document.querySelector( '#closeTask' ),

        createTasksList: function( task ) {
            var $li       = document.createElement( 'li' );
            var $span     = document.createElement( 'span' );
            var title     = document.createTextNode( task.title );
            var attrData  = document.createAttribute( 'data-id' );

            attrData.value = task.id;
            $span.setAttributeNode( attrData );
            $span.appendChild( title );
            $li.appendChild( $span );
            VIEW.$tasksList.appendChild( $li );
        },

        listTasks: function() {
            return CONTROLLER.listTasks();
        },

        editTask: function( id ) {
            var task = CONTROLLER.getTask( id )[0];

            document.querySelector( '#titleTaksDetail' ).value = task.title;
            document.querySelector( '#descriptionTaskDetail' ).value = task.description;

            VIEW.$taskDetail.show();
        },

        populateTask: function() {

        },
    };

    document.addEventListener( 'DOMContentLoaded', function() {
        CONTROLLER.init( 'Init App' );
    });

})();

HTMLElement.prototype.show = function() {
    return this.style.display = '';
};

HTMLElement.prototype.hide = function() {
    return this.style.display = 'none';
};
