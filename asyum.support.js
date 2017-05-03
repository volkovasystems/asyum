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
              			"repository": "https://github.com/volkovasystems/asyum.git",
              			"test": "asyum-test.js",
              			"global": true
              		}
              	@end-module-configuration
              
              	@module-documentation:
              		Pretend entity.
              
              		Supported multiple delegate.
              		This will return a delegated entity with bound delegated properties.
              		Use this module for delegatet property method proxy.
              		If the delegated property method is called without sufficient override,
              			this will throw a no operation done error.
              		Delegate method should not be anonymous.
              	@end-module-documentation
              
              	@include:
              		{
              			"annon": "annon",
              			"doubt": "doubt",
              			"fname": "fname",
              			"protype": "protype",
              			"wichevr": "wichevr"
              		}
              	@end-include
              */var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _defineProperty2 = require("babel-runtime/helpers/defineProperty");var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _keys = require("babel-runtime/core-js/object/keys");var _keys2 = _interopRequireDefault(_keys);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var annon = require("annon");
var doubt = require("doubt");
var fname = require("fname");
var protype = require("protype");
var wichevr = require("wichevr");

var asyum = function asyum(context, wrap, delegate) {var _arguments = arguments;
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

	try {
		/*;
      	@note:
      		If there are 2 parameters then it should be context and delegate.
      	@end-note
      */
		if (arguments.length == 2) {
			delegate = arguments[1];

			if (protype(delegate, OBJECT)) {
				if (doubt(delegate, ARRAY)) {
					return delegate.reduce(function (self, method) {
						if (annon(method)) {
							throw new Error("invalid delegate method, '" + method + "'");
						}

						var name = fname(method);

						self[name] = asyum(context, method)[name];

						return self;
					}, {});

				} else {
					return (0, _keys2.default)(delegate).reduce(function (self, name) {
						var method = delegate[name];

						if (annon(method)) {
							throw new Error("invalid delegate method, '" + method + "'");
						}

						self[name] = asyum(context, method)[name];

						return self;
					}, {});
				}
			}

			var self = wichevr(context, {});

			if (annon(delegate)) {
				throw new Error("invalid delegate method, '" + delegate + "'");
			}

			var name = fname(delegate);

			delegate = protype(delegate, FUNCTION) ? delegate :
			protype(self[name], FUNCTION) ? self[name] :
			function () {throw new Error("no operation done, " + _arguments);};

			return (0, _defineProperty3.default)({}, name, delegate.bind(context));
		}

		/*;
    	@note:
    		The wrap value can be a class function or a string name of the class
    			from the inheritance tree of the context.
    			We have to get the original delegate method.
    	@end-note
    */

		if (arguments.length == 3) {
			if (protype(delegate, OBJECT)) {
				if (doubt(delegate, ARRAY)) {
					return delegate.reduce(function (self, method) {
						if (annon(method)) {
							throw new Error("invalid delegate method, '" + method + "'");
						}

						var name = fname(method);

						self[name] = asyum(context, wrap, method)[name];

						return self;
					}, {});

				} else {
					return (0, _keys2.default)(delegate).reduce(function (self, name) {
						var method = delegate[name];

						if (annon(method)) {
							throw new Error("invalid delegate method, '" + method + "'");
						}

						self[name] = asyum(context, wrap, method)[name];

						return self;
					}, {});
				}
			}

			var tree = [];
			var prototype = (0, _getPrototypeOf2.default)(context);
			do {
				tree.push(prototype.constructor);
			} while (prototype = (0, _getPrototypeOf2.default)(prototype));

			if (annon(wrap)) {
				throw new Error("invalid wrapper class, '" + wrap + "'");
			}

			var _name = fname(wrap);
			prototype = tree.reduce(function (method, constructor) {
				if (constructor.name === _name) {
					return constructor;

				} else {
					return method;
				}
			}, protype(wrap, FUNCTION) ? wrap : function () {}).prototype;

			if (annon(delegate)) {
				throw new Error("invalid delegate method, '" + delegate + "'");
			}

			_name = fname(delegate);

			delegate = protype(prototype[_name], FUNCTION) ? prototype[_name] :
			protype(delegate, FUNCTION) ? delegate :
			function () {throw new Error("no operation done, " + _arguments);};

			return (0, _defineProperty3.default)({}, _name, delegate.bind(context));
		}

	} catch (error) {
		throw new Error("cannot assume entity, " + error.stack);
	}

	throw new Error("fatal, invalid parameter, cannot assume entity");
};

module.exports = asyum;

//# sourceMappingURL=asyum.support.js.map