"use strict";

/*;
	@test-license:
		The MIT License (MIT)
		@mit-license

		Copyright (@c) 2017 Richeve Siodina Bebedor
		@email: richeve.bebedor@gmail.com

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-test-license

	@test-configuration:
		{
			"package": "asyum",
			"path": "asyum/test.module.js",
			"file": "test.module.js",
			"module": "test",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"contributors": [
				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>",
				"Vinse Vinalon <vinsevinalon@gmail.com>"
			],
			"repository": "https://github.com/volkovasystems/asyum.git"
		}
	@end-test-configuration

	@test-documentation:

	@end-test-documentation

	@include:
		{
			"assert": "should",
			"asyum": "asyum"
		}
	@end-include
*/

const assert = require( "should" );

//: @server:
const asyum = require( "./asyum.js" );
//: @end-server

//: @client:
const asyum = require( "./asyum.support.js" );
//: @end-client

//: @bridge:
const path = require( "path" );
//: @end-bridge

//: @bridge:

describe( "asyum", ( ) => {

	let bridgeURL = `file://${ path.resolve( __dirname, "bridge.html" ) }`;

	describe( "`asyum( { }, function test( ){ return 'test'; } ).test( )`", ( ) => {
		it( "should be equal to 'test'", ( ) => {

			let result = browser.url( bridgeURL ).execute(

				function( ){

					return asyum( { }, function test( ){ return "test"; } ).test( );

				}

			).value;

			assert.equal( result, "test" );

		} );
	} );

	describe( "`asyum( testA, ClassA, function method( ){ return 'world'; } ).method( )`", ( ) => {
		it( "should be equal to 'hello'", ( ) => {
			//: @ignore:
			let result = browser.url( bridgeURL ).execute(

				function( ){
					class ClassA{
						constructor( ){ }
						method( ){ return "hello"; }
					}

					let testA = new ClassA( );

					return asyum( testA, ClassA, function method( ){ return "world"; } ).method( );
				}

			).value;
			//: @end-ignore
			assert.equal( result, "hello" );

		} );
	} );

	describe( "`asyum( testA, ClassA, function methodB( ){ return 'world'; } ).methodB( )`", ( ) => {
		it( "should be equal to 'world'", ( ) => {
			//: @ignore:
			let result = browser.url( bridgeURL ).execute(

				function( ){
					class ClassA{
						constructor( ){ }
						method( ){ return "hello"; }
					}

					let testA = new ClassA( );
					return asyum( testA, ClassA, function methodB( ){ return "world"; } ).methodB( );
				}

			).value;
			//: @end-ignore
			assert.equal( result, "world" );

		} );
	} );

	describe( "`Asyum with context and wrap`", ( ) => {
		it( "should be equal to 'yeah'", ( ) => {

			let result = browser.url( bridgeURL ).execute(

				function( ){
					return asyum( { "test": function test( ){ return "yeah"; } },
					function test( ){ return "test"; } ).test( );
				}

			).value;

			assert.equal( result, "yeah" );

		} );
	} );

} );

//: @end-bridge
