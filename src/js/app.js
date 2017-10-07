;(function( Task, HTMLElement ) {

    'use strict';

    var DOM = {
        $body: document.querySelector( 'body' ),
        $taskDetail: document.querySelector( '.task-detail' ),
        $listTasks: document.querySelector( '#tasksList' ),
        $tasks: document.querySelectorAll( '#tasksList span' ),
        $buttonAddTask: document.querySelector( '#addTask' ),
        $buttonCloseTask: document.querySelector( '#closeTask' ),
        $idTaskDetail: document.querySelector( '#idTaskDetail' ),
        $titleTaskDetail: document.querySelector( '#titleTaskDetail' ),
        $descriptionTaskDetail: document.querySelector( '#descriptionTaskDetail' )
    };

    var MODEL = {

        tasks: null,

        init: function() {
            if ( !localStorage.todo ) {
				localStorage.todo = JSON.stringify([
					new Task( { title: 'Work it harder', description: 'Lorem dfshufdhsua fds hfdhsau df' } ),
					new Task( { title: 'Make it better!', description: 'Lorem dfshufdhsua fds hfdhsau df' })
				]);
			}

			this.tasks = JSON.parse(localStorage.todo);
        },

        getTask: function( id ) {
            return this.tasks.find(function( t ) {
                return id == t.id;
            });
        },

        updateTask: function( task ) {
            var t     = CONTROLLER.getTask( task.id );
            var index = this.tasks.indexOf( t );

            this.tasks[ index ].title = task.title;
            this.tasks[ index ].description = task.description;

            this.updateLocalStorage();
        },

        removeTask: function( id ) {
            var task  = CONTROLLER.getTask( id );
            var index = MODEL.tasks.indexOf( task );

            this.tasks.splice( index, 1 );

            this.updateLocalStorage();
        },

        updateLocalStorage: function() {
			localStorage.todo = JSON.stringify( this.tasks );
		}


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
            return MODEL.getTask( id );
        },

        createTask: function( task, callback ) {
            MODEL.tasks.push( new Task( task ) );
            callback();
        },

        updateTask: function( task, callback ) {
            MODEL.updateTask( task );
            callback();
        },

        completedTask: function( id, callback ) {
            MODEL.removeTask( id );
            callback();
        }
    };

    var VIEW = {

        renderTasksList: function( task ) {
            var $li             = document.createElement( 'li' );
            var $button         = document.createElement( 'button' );
            var $img            = document.createElement( 'img' );
            var $span           = document.createElement( 'span' );
            var title           = document.createTextNode( task.title );
            var attrSrc         = document.createAttribute( 'src' );
            var attrData        = document.createAttribute( 'data-id' );
            var attrSpanClass   = document.createAttribute( 'class' );
            var attrDivClass    = document.createAttribute( 'class' );

            attrData.value = task.id;
            attrSrc.value = 'assets/images/check.svg';
            attrDivClass.value = 'icon check btn-task-completed';
            attrSpanClass.value = 'task-item';

            $img.setAttributeNode( attrSrc );
            $button.setAttributeNode( attrDivClass );
            $span.setAttributeNode( attrSpanClass );

            $span.appendChild( $button );
            $button.appendChild( $img );
            $span.appendChild( title );

            $li.setAttributeNode( attrData );
            $li.appendChild( $span );

            DOM.$listTasks.appendChild( $li );
        },

        destroyListTasks: function() {
            DOM.$listTasks.innerHTML = '';
        },

        listTasks: function() {
            return CONTROLLER.listTasks();
        },

        createListTasks: function() {
            VIEW.destroyListTasks();
            VIEW.listTasks().map( VIEW.renderTasksList );
        },

        clearTaskDetail: function() {
            VIEW.populateTask();
        },

        openTaskDetail: function() {
            VIEW.clearTaskDetail();
            DOM.$taskDetail.show();
        },

        closeTaskDetail: function() {
            VIEW.clearTaskDetail();
            DOM.$taskDetail.hide();
        },

        populateTask: function( task ) {
            DOM.$idTaskDetail.value = task && task.id || '';
            DOM.$titleTaskDetail.value = task && task.title || '';
            DOM.$descriptionTaskDetail.value = task && task.description || '';
        },

        editTask: function( id ) {
            var task = new Task( CONTROLLER.getTask( id ) );
            VIEW.populateTask( task );

            DOM.$taskDetail.show();
        },

        saveTask: function() {
            VIEW.destroyListTasks();

            var task = {
                id: DOM.$idTaskDetail.value,
                title: DOM.$titleTaskDetail.value,
                description: DOM.$descriptionTaskDetail.value
            };

            if ( DOM.$idTaskDetail.value !== '' ) {
                CONTROLLER.updateTask( task, function() {
                    VIEW.listTasks().map( VIEW.createListTasks );
                });
                return;
            }

            CONTROLLER.createTask( task, function() {
                VIEW.listTasks().map( VIEW.createListTasks );
            });
        },

        completedTask: function( id ) {
            VIEW.destroyListTasks();

            CONTROLLER.completedTask( id, function() {
                VIEW.listTasks().map( VIEW.createListTasks );
            });
        },

        init: function() {
            DOM.$taskDetail.hide();

            VIEW.createListTasks();

            DOM.$buttonAddTask.addEventListener( 'click', VIEW.openTaskDetail );

            DOM.$buttonCloseTask.addEventListener( 'click', VIEW.closeTaskDetail );

            DOM.$descriptionTaskDetail.addEventListener( 'blur', VIEW.saveTask );

            DOM.$titleTaskDetail.addEventListener( 'blur', VIEW.saveTask );

            DOM.$body.addEventListener( 'click', function( event ) {
                if ( event.target.className.toLowerCase() === 'task-item' ) {
                    var id = event.target.parentElement.dataset.id;
                    VIEW.editTask( id );
                }

                if ( event.target.parentElement.classList.contains( 'btn-task-completed' ) ) {
                    var id = event.target.parentElement.parentElement.parentElement.dataset.id;
                    VIEW.completedTask( id );
                }
            });
        }
    };

    document.addEventListener( 'DOMContentLoaded', function() {
        CONTROLLER.init( 'Init App' );
    });

})( Task, HTMLElement );
