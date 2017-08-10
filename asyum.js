"use strict";

/*;
	@module-license:
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
	@end-module-license

	@module-configuration:
		{
			"package": "asyum",
			"path": "asyum/asyum.js",
			"file": "asyum.js",
			"module": "asyum",
			"author": "Richeve S. Bebedor",
			"eMail": "richeve.bebedor@gmail.com",
			"contributors": [
				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>",
				"Vinse Vinalon <vinsevinalon@gmail.com>"
			],
			"repository": "https://github.com/volkovasystems/asyum.git",
			"test": "asyum-test.js",
			"global": true
		}
	@end-module-configuration

	@module-documentation:
		Pretend entity.

		Supported multiple delegate.
		This will return a delegated entity with bound delegated properties.
		Use this module for delegated property method proxy.
		If the delegated property method is called without sufficient override,
			this will throw a no operation done error.
		Delegate method should not be anonymous.
	@end-module-documentation

	@include:
		{
			"annon": "annon",
			"doubt": "doubt",
			"fname": "fname",
			"wichevr": "wichevr"
		}
	@end-include
*/

const annon = require( "annon" );
const doubt = require( "doubt" );
const fname = require( "fname" );
const wichevr = require( "wichevr" );

const asyum = function asyum( context, wrap, delegate ){
	/*;
		@meta-configuration:
			{
				"context:required": "*",
				"wrap": [
					"string",
					"function"
				],
				"delegate:required": [
					"string",
					"function",
					[ "string", "function" ],
					{ "string": "function" }
				]
			}
		@end-meta-configuration
	*/

	try{
		/*;
			@note:
				If there are 2 parameters then it should be context and delegate.
			@end-note
		*/
		if( arguments.length == 2 ){
			delegate = arguments[ 1 ];

			if( typeof delegate == "object" ){
				if( doubt( delegate, ARRAY ) ){
					return delegate.reduce( ( self, method ) => {
						if( annon( method ) ){
							throw new Error( `invalid delegate method, '${ method }'` );
						}

						let name = fname( method );

						self[ name ] = asyum( context, method )[ name ];

						return self;
					}, { } );

				}else{
					return Object.keys( delegate ).reduce( ( self, name ) => {
						let method = delegate[ name ];

						if( annon( method ) ){
							throw new Error( `invalid delegate method, '${ method }'` );
						}

						self[ name ] = asyum( context, method )[ name ];

						return self;
					}, { } );
				}
			}

			let self = wichevr( context, { } );

			if( annon( delegate ) ){
				throw new Error( `invalid delegate method, ${ delegate }` );
			}

			let name = fname( delegate );

			delegate = (
				typeof self[ name ] == "function" ? self[ name ] :
				typeof delegate == "function" ? delegate :
					( ) => { throw new Error ( `no operation done, ${ arguments }` ) }
			);

			return { [ name ]: delegate.bind( context ) };
		}

		/*;
			@note:
				The wrap value can be a class function or a string name of the class
					from the inheritance tree of the context.

				We have to get the original delegate method.
			@end-note
		*/
		if( arguments.length == 3 ){
			if( typeof delegate == "object" ){
				if( doubt( delegate, ARRAY ) ){
					return delegate.reduce( ( self, method ) => {
						if( annon( method ) ){
							throw new Error( `invalid delegate method, ${ method }` );
						}

						let name = fname( method );

						self[ name ] = asyum( context, wrap, method )[ name ];

						return self;
					}, { } );

				}else{
					return Object.keys( delegate ).reduce( ( self, name ) => {
						let method = delegate[ name ];

						if( annon( method ) ){
							throw new Error( `invalid delegate method, ${ method }` );
						}

						self[ name ] = asyum( context, wrap, method )[ name ];

						return self;
					}, { } );
				}
			}

			let tree = [ ];
			let prototype = Object.getPrototypeOf( context );
			do{
				tree.push( prototype.constructor );
			}while( prototype = Object.getPrototypeOf( prototype ) );

			if( annon( wrap ) ){
				throw new Error( `invalid wrapper class, ${ wrap }` );
			}

			let name = fname( wrap );
			prototype = tree.reduce( ( method, constructor ) => {
				if( constructor.name === name ){
					return constructor;

				}else{
					return method;
				}
			}, typeof wrap == "function" ? wrap : function( ){ } ).prototype;

			if( annon( delegate ) ){
				throw new Error( `invalid delegate method, ${ delegate }` );
			}

			name = fname( delegate );

			if( typeof prototype[ name ] == "function" ){
				delegate = prototype[ name ];

			}else if( typeof delegate != "function" ){
				delegate = ( ( ) => { throw new Error ( `no operation done, ${ arguments }` ) } );
			}

			return { [ name ]: delegate.bind( context ) };
		}

	}catch( error ){
		throw new Error( `cannot assume entity, ${ error.stack }` );
	}

	throw new Error( "fatal, invalid parameter, cannot assume entity" );
};

module.exports = asyum;
