
const assert = require( "assert" );
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

console.log( require( "util" ).inspect( data, { "depth": 5 } ) );

assert.equal( typeof fluctuate( data ) == "object", true, "should be of object data type" );

let globalData = loosen( global, 1, true );

assert.ok( fluctuate( globalData ), "should not throw error" );

console.log( "ok" );
