
const fluctuate = require( "./fluctuate.js" );
const loosen = require( "loosen" );

let data = loosen( {
	"hello": {
		"world": {
			"yeah": 1,
			"ugh": false,
			"hi": [
				{
					"weeeh": {
						"yehey": 123
					}
				},
				{
					"weeeh": {
						"yehey": 1234
					}
				},
				"hello world",
				123,
				{
					"weeeeeeh": 12345
				}
			]
		}
	}
} );

console.log( require( "util").inspect( data, { "depth": 5 } ) );

console.log( require( "util").inspect( fluctuate( data ), { "depth": 5 } ) );
