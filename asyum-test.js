
const assert = require( "assert" );
const asyum = require( "./asyum.js" );

let duration = Date.now( );
assert.equal( asyum( { }, function test( ){ return "test"; } ).test( ),
	"test", "should be equal to 'test'" );

class ClassA{
	constructor( ){ }
	method( ){ return "hello"; }
}

let testA = new ClassA( );
assert.equal( asyum( testA, ClassA, function method( ){ return "world"; } ).method( ),
	"hello", "should be equal to 'hello'" );

assert.equal( asyum( testA, ClassA, function methodB( ){ return "world"; } ).methodB( ),
	"world", "should be equal to 'world'" );

assert.equal( asyum( { "test": function test( ){ return "yeah"; } },
	function test( ){ return "test"; } ).test( ), "yeah", "should be equal to 'yeah'" );

console.log( "ok", Date.now( ) - duration, "ms" );
