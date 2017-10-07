function Task( option ) {
    this.id = option && option.id || Math.random().toString( 36 ).substr( 2, 9 );
    this.title = option && option.title || '';
    this.description = option && option.description || '';
}
