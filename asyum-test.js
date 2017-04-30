
const assert = require( "assert" );
const asyum = require( "./asyum.js" );

assert.equal( asyum( { }, function test( ){ return "test"; } ).test( ), "test", "should return 'test'" );

console.log( "ok" );
