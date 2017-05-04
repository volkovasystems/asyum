
const assert = require( "assert" );
const asyum = require( "./asyum.js" );

assert.equal( asyum( { }, function test( ){ return "test"; } ).test( ), "test", "should return 'test'" );

class ClassA{
	constructor( ){ }
	method( ){ return "hello"; }
}

let testA = new ClassA( );
assert.equal( asyum( testA, ClassA, function method( ){ return "world"; } ).method( ), "hello", "should return value 'hello'" );

assert.equal( asyum( testA, ClassA, function methodB( ){ return "world"; } ).methodB( ), "world", "should return value 'world'" );

console.log( "ok" );
