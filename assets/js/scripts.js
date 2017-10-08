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

'use strict';

function Task( option ) {
    this.id = option && option.id || Math.random().toString( 36 ).substr( 2, 9 );
    this.title = option && option.title || '';
    this.description = option && option.description || '';
    this.order = option && option.order || '';
}

;(function( DOM ) {

    'use strict';

    var MODEL = {

        tasks: null,

        init: function() {
            if ( !localStorage.todo ) {
                localStorage.todo = JSON.stringify([
                    new Task( { title: 'Make it better!', description: 'Lorem dfshufdhsua fds hfdhsau df', order: 1 } ),
                    new Task( { title: 'Work it harder', description: 'Lorem dfshufdhsua fds hfdhsau df', order: 0 } )
                ]);
            }

            this.tasks = JSON.parse(localStorage.todo);
        },

        getTasksLength: function() {
            return this.tasks.length;
        },

        orderBy: function( a, b ) {
            var x = a.order;
            var y = b.order;
            return x < y ? -1 : x > y ? 1 : 0;
        },

        listTasks: function() {
            return this.tasks.sort( this.orderBy );
        },

        getTask: function( id ) {
            return this.tasks.find(function( t ) {
                return id == t.id;
            });
        },

        getLastTask: function() {
            return this.listTasks().last();
        },

        createTask: function( task ) {
            this.tasks.push( new Task( task ) );
        },

        updateTask: function( task ) {
            var t     = this.getTask( task.id );
            var index = this.tasks.indexOf( t );

            this.tasks[ index ].title = task.title;
            this.tasks[ index ].description = task.description;

            this.updateLocalStorage();
        },

        removeTask: function( id ) {
            var task  = this.getTask( id );
            var index = this.tasks.indexOf( task );

            this.tasks.splice( index, 1 );

            this.updateLocalStorage();
        },

        updateLocalStorage: function() {
            localStorage.todo = JSON.stringify( this.tasks );
        }

    };

    var CONTROLLER = {

        init: function() {
            console.log( '%c --- App Init ---', 'font-size: 14px; color:#ff7381;' );
            console.log( '%c Name: Thiago Capelo', 'font-size:12px;' );
            console.log( '%c [ Github, Codepen ]: @thiagokpelo', 'font-size:10px;' );
            console.log( '%c [ Whats ]: (55 11) 9 9901 4998', 'font-size:10px;' );
            console.log( '%c Obrigado!! %s', 'font-size:12px;color:#ff7381', '🖖' )

            MODEL.init();
            VIEW.init();
        },

        listTasks: function() {
            return MODEL.listTasks();
        },

        getTask: function( id ) {
            return MODEL.getTask( id );
        },

        getLastTask: function() {
            return MODEL.getLastTask();
        },

        createTask: function( task, callback ) {
            MODEL.createTask( task );
            callback();
        },

        updateTask: function( task, callback ) {
            MODEL.updateTask( task );
            callback();
        },

        completedTask: function( id, callback ) {
            MODEL.removeTask( id );
            callback();
        },

        getTasksLength: function() {
            return MODEL.getTasksLength();
        }
    };

    var VIEW = {

        init: function() {
            DOM.$taskDetail.hide();
            VIEW.createListTasks();

            DOM.$buttonAddTask.addEventListener( 'click', VIEW.openTaskDetail );
            DOM.$buttonCloseTask.addEventListener( 'click', VIEW.closeTaskDetail );
            DOM.$descriptionTaskDetail.addEventListener( 'blur', VIEW.saveTask );
            DOM.$titleTaskDetail.addEventListener( 'blur', VIEW.saveTask );

            DOM.$titleTaskDetail.addEventListener( 'keyup', function( event ) {
                if( event.keyCode === 13 && this.value !== '' ) {
                    VIEW.saveTask();
                }
            });

            DOM.$descriptionTaskDetail.addEventListener( 'keyup', function( event ) {
                if( event.keyCode === 13 && this.value !== '' ) {
                    VIEW.saveTask();
                }
            });

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
        },

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

        getLastTask: function() {
            return CONTROLLER.getLastTask();
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
            var task = CONTROLLER.getTask( id );
            VIEW.populateTask( task );

            DOM.$taskDetail.show();
        },

        saveTask: function() {

            if ( DOM.$titleTaskDetail.value !== '' ) {
                VIEW.destroyListTasks();

                var task = {
                    id: DOM.$idTaskDetail.value,
                    title: DOM.$titleTaskDetail.value,
                    description: DOM.$descriptionTaskDetail.value,
                };

                if ( DOM.$idTaskDetail.value !== '' ) {
                    CONTROLLER.updateTask( task, function() {
                        VIEW.listTasks().map( VIEW.createListTasks );
                    });
                    return;
                }

                task.order = CONTROLLER.getTasksLength();

                CONTROLLER.createTask( task, function() {
                    VIEW.listTasks().map( VIEW.createListTasks );
                    VIEW.populateTask( VIEW.getLastTask() );
                });
            }
        },

        completedTask: function( id ) {
            VIEW.destroyListTasks();
            VIEW.closeTaskDetail();

            CONTROLLER.completedTask( id, function() {
                VIEW.listTasks().map( VIEW.createListTasks );
            });
        }
    };

    document.addEventListener( 'DOMContentLoaded', function() {
        CONTROLLER.init();
    });

})( DOM );
