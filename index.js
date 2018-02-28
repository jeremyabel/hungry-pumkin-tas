const tail = require( 'tail' ).Tail;
const robot = require( 'robotjs' );

const itemNames = [ "x", "hamburger", "pizza", "sandwich", "hotdog", "fries", "eggs", "chicken", "butter", "cheese", "bread", "rice", "noodles", "salt", "pepper", "fish", "jam", "icewater", "orangejuice", "soda", "coffee" ];
const giveMeTrigger = 'h_giveme';

const flashLogTail = new tail( '/Users/jeremyabel/Library/Preferences/Macromedia/Flash\ Player/Logs/flashlog.txt' );

var foodRows = [ [], [], [], [], [] ];
var currentRow = 0;
var currentTurn = 0;
var startTime = 0;

console.log( '' );
console.log( 'Hungry Pumkin TAS v0.0.1' );
console.log( '------------------------' );
console.log( '' );
console.log( 'waiting for flashlog.txt updates...' );

flashLogTail.on( 'line', data => {

	// Item order string
	if ( data.match( /^\d/ ) && data.length > 5 ) {
		console.log( "got item order: " );

		var rowIndex = 0;
		data.split( ',' ).forEach( ( itemId, i ) => {
			foodRows[ rowIndex ].push( itemNames[ itemId ] );
			if ( i > 0 && ( i + 1 ) % 4 === 0 ) rowIndex++;
		});

	 	foodRows.forEach( ( row, i ) => {
	 		var rowFoods = '';
	 		row.forEach( ( food, i ) => {
	 			rowFoods += food;
	 			if ( i < 3 ) rowFoods += ', ';
	 		});

	 		console.log( '  row ' + ( i + 1 ) + ': ' + rowFoods );
	 	});

	 	console.log( '' );
	 	console.log( 'START TIME' );
	 	console.log( '' );

	 	startTime = new Date();
	}

	// "Give me the X"
	if ( data.includes( giveMeTrigger ) ) {
		var requestedItem = data.substr( giveMeTrigger.length + 4 );
		var requestedIndex = foodRows[ currentRow ].indexOf( requestedItem );

		robot.keyTap( 'tab' );

		for ( var i = 0; i < requestedIndex; i++ ) {
			robot.keyTap( 'tab' );
		}

		robot.keyTap( 'space' );

		foodRows[ currentRow ].splice( requestedIndex, 1 );

		console.log( 'Give me the ' + requestedItem + '!  row ' + ( currentRow + 1 ) + ', turn ' + ( currentTurn + 1 ) + ': ' + requestedItem + ' at index ' + requestedIndex );

		currentTurn++;

		if ( currentTurn === 4 ) {
			if ( currentRow === 4 ) {
				var endTime = new Date();
				var deltaTime = new Date( endTime - startTime );
				console.log( '' );
				console.log( 'END TIME: ' + deltaTime.getMinutes() + ':' + deltaTime.getSeconds() + ':' + deltaTime.getMilliseconds() ); 
				return;
			}

			currentRow++;
			currentTurn = 0;
		}
	}
});