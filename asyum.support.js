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
              			"wichevr": "wichevr"
              		}
              	@end-include
              */var _getPrototypeOf = require("babel-runtime/core-js/object/get-prototype-of");var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);var _defineProperty2 = require("babel-runtime/helpers/defineProperty");var _defineProperty3 = _interopRequireDefault(_defineProperty2);var _keys = require("babel-runtime/core-js/object/keys");var _keys2 = _interopRequireDefault(_keys);var _typeof2 = require("babel-runtime/helpers/typeof");var _typeof3 = _interopRequireDefault(_typeof2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var annon = require("annon");
var doubt = require("doubt");
var fname = require("fname");
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

			if ((typeof delegate === "undefined" ? "undefined" : (0, _typeof3.default)(delegate)) == "object") {
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

			delegate = typeof self[name] == "function" ? self[name] :
			typeof delegate == "function" ? delegate :
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
			if ((typeof delegate === "undefined" ? "undefined" : (0, _typeof3.default)(delegate)) == "object") {
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
			}, typeof wrap == "function" ? wrap : function () {}).prototype;

			if (annon(delegate)) {
				throw new Error("invalid delegate method, '" + delegate + "'");
			}

			_name = fname(delegate);

			if (typeof prototype[_name] == "function") {
				delegate = prototype[_name];

			} else if (typeof delegate != "function") {
				delegate = function delegate() {throw new Error("no operation done, " + _arguments);};
			}

			return (0, _defineProperty3.default)({}, _name, delegate.bind(context));
		}

	} catch (error) {
		throw new Error("cannot assume entity, " + error.stack);
	}

	throw new Error("fatal, invalid parameter, cannot assume entity");
};

module.exports = asyum;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzeXVtLnN1cHBvcnQuanMiXSwibmFtZXMiOlsiYW5ub24iLCJyZXF1aXJlIiwiZG91YnQiLCJmbmFtZSIsIndpY2hldnIiLCJhc3l1bSIsImNvbnRleHQiLCJ3cmFwIiwiZGVsZWdhdGUiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJBUlJBWSIsInJlZHVjZSIsInNlbGYiLCJtZXRob2QiLCJFcnJvciIsIm5hbWUiLCJiaW5kIiwidHJlZSIsInByb3RvdHlwZSIsInB1c2giLCJjb25zdHJ1Y3RvciIsImVycm9yIiwic3RhY2siLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0VBLElBQU1BLFFBQVFDLFFBQVMsT0FBVCxDQUFkO0FBQ0EsSUFBTUMsUUFBUUQsUUFBUyxPQUFULENBQWQ7QUFDQSxJQUFNRSxRQUFRRixRQUFTLE9BQVQsQ0FBZDtBQUNBLElBQU1HLFVBQVVILFFBQVMsU0FBVCxDQUFoQjs7QUFFQSxJQUFNSSxRQUFRLFNBQVNBLEtBQVQsQ0FBZ0JDLE9BQWhCLEVBQXlCQyxJQUF6QixFQUErQkMsUUFBL0IsRUFBeUM7QUFDdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQSxLQUFHO0FBQ0Y7Ozs7O0FBS0EsTUFBSUMsVUFBVUMsTUFBVixJQUFvQixDQUF4QixFQUEyQjtBQUMxQkYsY0FBV0MsVUFBVyxDQUFYLENBQVg7O0FBRUEsT0FBSSxRQUFPRCxRQUFQLHVEQUFPQSxRQUFQLE1BQW1CLFFBQXZCLEVBQWlDO0FBQ2hDLFFBQUlOLE1BQU9NLFFBQVAsRUFBaUJHLEtBQWpCLENBQUosRUFBOEI7QUFDN0IsWUFBT0gsU0FBU0ksTUFBVCxDQUFpQixVQUFFQyxJQUFGLEVBQVFDLE1BQVIsRUFBb0I7QUFDM0MsVUFBSWQsTUFBT2MsTUFBUCxDQUFKLEVBQXFCO0FBQ3BCLGFBQU0sSUFBSUMsS0FBSixnQ0FBeUNELE1BQXpDLE9BQU47QUFDQTs7QUFFRCxVQUFJRSxPQUFPYixNQUFPVyxNQUFQLENBQVg7O0FBRUFELFdBQU1HLElBQU4sSUFBZVgsTUFBT0MsT0FBUCxFQUFnQlEsTUFBaEIsRUFBMEJFLElBQTFCLENBQWY7O0FBRUEsYUFBT0gsSUFBUDtBQUNBLE1BVk0sRUFVSixFQVZJLENBQVA7O0FBWUEsS0FiRCxNQWFLO0FBQ0osWUFBTyxvQkFBYUwsUUFBYixFQUF3QkksTUFBeEIsQ0FBZ0MsVUFBRUMsSUFBRixFQUFRRyxJQUFSLEVBQWtCO0FBQ3hELFVBQUlGLFNBQVNOLFNBQVVRLElBQVYsQ0FBYjs7QUFFQSxVQUFJaEIsTUFBT2MsTUFBUCxDQUFKLEVBQXFCO0FBQ3BCLGFBQU0sSUFBSUMsS0FBSixnQ0FBeUNELE1BQXpDLE9BQU47QUFDQTs7QUFFREQsV0FBTUcsSUFBTixJQUFlWCxNQUFPQyxPQUFQLEVBQWdCUSxNQUFoQixFQUEwQkUsSUFBMUIsQ0FBZjs7QUFFQSxhQUFPSCxJQUFQO0FBQ0EsTUFWTSxFQVVKLEVBVkksQ0FBUDtBQVdBO0FBQ0Q7O0FBRUQsT0FBSUEsT0FBT1QsUUFBU0UsT0FBVCxFQUFrQixFQUFsQixDQUFYOztBQUVBLE9BQUlOLE1BQU9RLFFBQVAsQ0FBSixFQUF1QjtBQUN0QixVQUFNLElBQUlPLEtBQUosZ0NBQXlDUCxRQUF6QyxPQUFOO0FBQ0E7O0FBRUQsT0FBSVEsT0FBT2IsTUFBT0ssUUFBUCxDQUFYOztBQUVBQSxjQUFXLE9BQU9LLEtBQU1HLElBQU4sQ0FBUCxJQUF1QixVQUF2QixHQUFvQ0gsS0FBTUcsSUFBTixDQUFwQztBQUNWLFVBQU9SLFFBQVAsSUFBbUIsVUFBbkIsR0FBZ0NBLFFBQWhDO0FBQ0MsZUFBTyxDQUFFLE1BQU0sSUFBSU8sS0FBSixvQ0FBTixDQUF5RCxDQUZwRTs7QUFJQSw0Q0FBV0MsSUFBWCxFQUFtQlIsU0FBU1MsSUFBVCxDQUFlWCxPQUFmLENBQW5CO0FBQ0E7O0FBRUQ7Ozs7Ozs7O0FBUUEsTUFBSUcsVUFBVUMsTUFBVixJQUFvQixDQUF4QixFQUEyQjtBQUMxQixPQUFJLFFBQU9GLFFBQVAsdURBQU9BLFFBQVAsTUFBbUIsUUFBdkIsRUFBaUM7QUFDaEMsUUFBSU4sTUFBT00sUUFBUCxFQUFpQkcsS0FBakIsQ0FBSixFQUE4QjtBQUM3QixZQUFPSCxTQUFTSSxNQUFULENBQWlCLFVBQUVDLElBQUYsRUFBUUMsTUFBUixFQUFvQjtBQUMzQyxVQUFJZCxNQUFPYyxNQUFQLENBQUosRUFBcUI7QUFDcEIsYUFBTSxJQUFJQyxLQUFKLGdDQUF5Q0QsTUFBekMsT0FBTjtBQUNBOztBQUVELFVBQUlFLE9BQU9iLE1BQU9XLE1BQVAsQ0FBWDs7QUFFQUQsV0FBTUcsSUFBTixJQUFlWCxNQUFPQyxPQUFQLEVBQWdCQyxJQUFoQixFQUFzQk8sTUFBdEIsRUFBZ0NFLElBQWhDLENBQWY7O0FBRUEsYUFBT0gsSUFBUDtBQUNBLE1BVk0sRUFVSixFQVZJLENBQVA7O0FBWUEsS0FiRCxNQWFLO0FBQ0osWUFBTyxvQkFBYUwsUUFBYixFQUF3QkksTUFBeEIsQ0FBZ0MsVUFBRUMsSUFBRixFQUFRRyxJQUFSLEVBQWtCO0FBQ3hELFVBQUlGLFNBQVNOLFNBQVVRLElBQVYsQ0FBYjs7QUFFQSxVQUFJaEIsTUFBT2MsTUFBUCxDQUFKLEVBQXFCO0FBQ3BCLGFBQU0sSUFBSUMsS0FBSixnQ0FBeUNELE1BQXpDLE9BQU47QUFDQTs7QUFFREQsV0FBTUcsSUFBTixJQUFlWCxNQUFPQyxPQUFQLEVBQWdCQyxJQUFoQixFQUFzQk8sTUFBdEIsRUFBZ0NFLElBQWhDLENBQWY7O0FBRUEsYUFBT0gsSUFBUDtBQUNBLE1BVk0sRUFVSixFQVZJLENBQVA7QUFXQTtBQUNEOztBQUVELE9BQUlLLE9BQU8sRUFBWDtBQUNBLE9BQUlDLFlBQVksOEJBQXVCYixPQUF2QixDQUFoQjtBQUNBLE1BQUU7QUFDRFksU0FBS0UsSUFBTCxDQUFXRCxVQUFVRSxXQUFyQjtBQUNBLElBRkQsUUFFUUYsWUFBWSw4QkFBdUJBLFNBQXZCLENBRnBCOztBQUlBLE9BQUluQixNQUFPTyxJQUFQLENBQUosRUFBbUI7QUFDbEIsVUFBTSxJQUFJUSxLQUFKLDhCQUF1Q1IsSUFBdkMsT0FBTjtBQUNBOztBQUVELE9BQUlTLFFBQU9iLE1BQU9JLElBQVAsQ0FBWDtBQUNBWSxlQUFZRCxLQUFLTixNQUFMLENBQWEsVUFBRUUsTUFBRixFQUFVTyxXQUFWLEVBQTJCO0FBQ25ELFFBQUlBLFlBQVlMLElBQVosS0FBcUJBLEtBQXpCLEVBQStCO0FBQzlCLFlBQU9LLFdBQVA7O0FBRUEsS0FIRCxNQUdLO0FBQ0osWUFBT1AsTUFBUDtBQUNBO0FBQ0QsSUFQVyxFQU9ULE9BQU9QLElBQVAsSUFBZSxVQUFmLEdBQTRCQSxJQUE1QixHQUFtQyxZQUFXLENBQUcsQ0FQeEMsRUFPMkNZLFNBUHZEOztBQVNBLE9BQUluQixNQUFPUSxRQUFQLENBQUosRUFBdUI7QUFDdEIsVUFBTSxJQUFJTyxLQUFKLGdDQUF5Q1AsUUFBekMsT0FBTjtBQUNBOztBQUVEUSxXQUFPYixNQUFPSyxRQUFQLENBQVA7O0FBRUEsT0FBSSxPQUFPVyxVQUFXSCxLQUFYLENBQVAsSUFBNEIsVUFBaEMsRUFBNEM7QUFDM0NSLGVBQVdXLFVBQVdILEtBQVgsQ0FBWDs7QUFFQSxJQUhELE1BR00sSUFBSSxPQUFPUixRQUFQLElBQW1CLFVBQXZCLEVBQW1DO0FBQ3hDQSxlQUFhLG9CQUFPLENBQUUsTUFBTSxJQUFJTyxLQUFKLG9DQUFOLENBQXlELENBQS9FO0FBQ0E7O0FBRUQsNENBQVdDLEtBQVgsRUFBbUJSLFNBQVNTLElBQVQsQ0FBZVgsT0FBZixDQUFuQjtBQUNBOztBQUVELEVBL0hELENBK0hDLE9BQU9nQixLQUFQLEVBQWM7QUFDZCxRQUFNLElBQUlQLEtBQUosNEJBQXFDTyxNQUFNQyxLQUEzQyxDQUFOO0FBQ0E7O0FBRUQsT0FBTSxJQUFJUixLQUFKLENBQVcsZ0RBQVgsQ0FBTjtBQUNBLENBdkpEOztBQXlKQVMsT0FBT0MsT0FBUCxHQUFpQnBCLEtBQWpCIiwiZmlsZSI6ImFzeXVtLnN1cHBvcnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qO1xyXG5cdEBtb2R1bGUtbGljZW5zZTpcclxuXHRcdFRoZSBNSVQgTGljZW5zZSAoTUlUKVxyXG5cdFx0QG1pdC1saWNlbnNlXHJcblxyXG5cdFx0Q29weXJpZ2h0IChAYykgMjAxNyBSaWNoZXZlIFNpb2RpbmEgQmViZWRvclxyXG5cdFx0QGVtYWlsOiByaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXHJcblxyXG5cdFx0UGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxyXG5cdFx0b2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxyXG5cdFx0aW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xyXG5cdFx0dG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxyXG5cdFx0Y29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXHJcblx0XHRmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxyXG5cclxuXHRcdFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluIGFsbFxyXG5cdFx0Y29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cclxuXHJcblx0XHRUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXHJcblx0XHRJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcclxuXHRcdEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxyXG5cdFx0QVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxyXG5cdFx0TElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcclxuXHRcdE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXHJcblx0XHRTT0ZUV0FSRS5cclxuXHRAZW5kLW1vZHVsZS1saWNlbnNlXHJcblxyXG5cdEBtb2R1bGUtY29uZmlndXJhdGlvbjpcclxuXHRcdHtcclxuXHRcdFx0XCJwYWNrYWdlXCI6IFwiYXN5dW1cIixcclxuXHRcdFx0XCJwYXRoXCI6IFwiYXN5dW0vYXN5dW0uanNcIixcclxuXHRcdFx0XCJmaWxlXCI6IFwiYXN5dW0uanNcIixcclxuXHRcdFx0XCJtb2R1bGVcIjogXCJhc3l1bVwiLFxyXG5cdFx0XHRcImF1dGhvclwiOiBcIlJpY2hldmUgUy4gQmViZWRvclwiLFxyXG5cdFx0XHRcImVNYWlsXCI6IFwicmljaGV2ZS5iZWJlZG9yQGdtYWlsLmNvbVwiLFxyXG5cdFx0XHRcImNvbnRyaWJ1dG9yc1wiOiBbXHJcblx0XHRcdFx0XCJKb2huIExlbm9uIE1hZ2hhbm95IDxqb2hubGVub25tYWdoYW5veUBnbWFpbC5jb20+XCIsXHJcblx0XHRcdFx0XCJWaW5zZSBWaW5hbG9uIDx2aW5zZXZpbmFsb25AZ21haWwuY29tPlwiXHJcblx0XHRcdF0sXHJcblx0XHRcdFwicmVwb3NpdG9yeVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS92b2xrb3Zhc3lzdGVtcy9hc3l1bS5naXRcIixcclxuXHRcdFx0XCJ0ZXN0XCI6IFwiYXN5dW0tdGVzdC5qc1wiLFxyXG5cdFx0XHRcImdsb2JhbFwiOiB0cnVlXHJcblx0XHR9XHJcblx0QGVuZC1tb2R1bGUtY29uZmlndXJhdGlvblxyXG5cclxuXHRAbW9kdWxlLWRvY3VtZW50YXRpb246XHJcblx0XHRQcmV0ZW5kIGVudGl0eS5cclxuXHJcblx0XHRTdXBwb3J0ZWQgbXVsdGlwbGUgZGVsZWdhdGUuXHJcblx0XHRUaGlzIHdpbGwgcmV0dXJuIGEgZGVsZWdhdGVkIGVudGl0eSB3aXRoIGJvdW5kIGRlbGVnYXRlZCBwcm9wZXJ0aWVzLlxyXG5cdFx0VXNlIHRoaXMgbW9kdWxlIGZvciBkZWxlZ2F0ZXQgcHJvcGVydHkgbWV0aG9kIHByb3h5LlxyXG5cdFx0SWYgdGhlIGRlbGVnYXRlZCBwcm9wZXJ0eSBtZXRob2QgaXMgY2FsbGVkIHdpdGhvdXQgc3VmZmljaWVudCBvdmVycmlkZSxcclxuXHRcdFx0dGhpcyB3aWxsIHRocm93IGEgbm8gb3BlcmF0aW9uIGRvbmUgZXJyb3IuXHJcblx0XHREZWxlZ2F0ZSBtZXRob2Qgc2hvdWxkIG5vdCBiZSBhbm9ueW1vdXMuXHJcblx0QGVuZC1tb2R1bGUtZG9jdW1lbnRhdGlvblxyXG5cclxuXHRAaW5jbHVkZTpcclxuXHRcdHtcclxuXHRcdFx0XCJhbm5vblwiOiBcImFubm9uXCIsXHJcblx0XHRcdFwiZG91YnRcIjogXCJkb3VidFwiLFxyXG5cdFx0XHRcImZuYW1lXCI6IFwiZm5hbWVcIixcclxuXHRcdFx0XCJ3aWNoZXZyXCI6IFwid2ljaGV2clwiXHJcblx0XHR9XHJcblx0QGVuZC1pbmNsdWRlXHJcbiovXHJcblxyXG5jb25zdCBhbm5vbiA9IHJlcXVpcmUoIFwiYW5ub25cIiApO1xyXG5jb25zdCBkb3VidCA9IHJlcXVpcmUoIFwiZG91YnRcIiApO1xyXG5jb25zdCBmbmFtZSA9IHJlcXVpcmUoIFwiZm5hbWVcIiApO1xyXG5jb25zdCB3aWNoZXZyID0gcmVxdWlyZSggXCJ3aWNoZXZyXCIgKTtcclxuXHJcbmNvbnN0IGFzeXVtID0gZnVuY3Rpb24gYXN5dW0oIGNvbnRleHQsIHdyYXAsIGRlbGVnYXRlICl7XHJcblx0Lyo7XHJcblx0XHRAbWV0YS1jb25maWd1cmF0aW9uOlxyXG5cdFx0XHR7XHJcblx0XHRcdFx0XCJjb250ZXh0OnJlcXVpcmVkXCI6IFwiKlwiLFxyXG5cdFx0XHRcdFwid3JhcFwiOiBbXHJcblx0XHRcdFx0XHRcInN0cmluZ1wiLFxyXG5cdFx0XHRcdFx0XCJmdW5jdGlvblwiXHJcblx0XHRcdFx0XSxcclxuXHRcdFx0XHRcImRlbGVnYXRlOnJlcXVpcmVkXCI6IFtcclxuXHRcdFx0XHRcdFwic3RyaW5nXCIsXHJcblx0XHRcdFx0XHRcImZ1bmN0aW9uXCIsXHJcblx0XHRcdFx0XHRbIFwic3RyaW5nXCIsIFwiZnVuY3Rpb25cIiBdLFxyXG5cdFx0XHRcdFx0eyBcInN0cmluZ1wiOiBcImZ1bmN0aW9uXCIgfVxyXG5cdFx0XHRcdF1cclxuXHRcdFx0fVxyXG5cdFx0QGVuZC1tZXRhLWNvbmZpZ3VyYXRpb25cclxuXHQqL1xyXG5cclxuXHR0cnl7XHJcblx0XHQvKjtcclxuXHRcdFx0QG5vdGU6XHJcblx0XHRcdFx0SWYgdGhlcmUgYXJlIDIgcGFyYW1ldGVycyB0aGVuIGl0IHNob3VsZCBiZSBjb250ZXh0IGFuZCBkZWxlZ2F0ZS5cclxuXHRcdFx0QGVuZC1ub3RlXHJcblx0XHQqL1xyXG5cdFx0aWYoIGFyZ3VtZW50cy5sZW5ndGggPT0gMiApe1xyXG5cdFx0XHRkZWxlZ2F0ZSA9IGFyZ3VtZW50c1sgMSBdO1xyXG5cclxuXHRcdFx0aWYoIHR5cGVvZiBkZWxlZ2F0ZSA9PSBcIm9iamVjdFwiICl7XHJcblx0XHRcdFx0aWYoIGRvdWJ0KCBkZWxlZ2F0ZSwgQVJSQVkgKSApe1xyXG5cdFx0XHRcdFx0cmV0dXJuIGRlbGVnYXRlLnJlZHVjZSggKCBzZWxmLCBtZXRob2QgKSA9PiB7XHJcblx0XHRcdFx0XHRcdGlmKCBhbm5vbiggbWV0aG9kICkgKXtcclxuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoIGBpbnZhbGlkIGRlbGVnYXRlIG1ldGhvZCwgJyR7IG1ldGhvZCB9J2AgKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0bGV0IG5hbWUgPSBmbmFtZSggbWV0aG9kICk7XHJcblxyXG5cdFx0XHRcdFx0XHRzZWxmWyBuYW1lIF0gPSBhc3l1bSggY29udGV4dCwgbWV0aG9kIClbIG5hbWUgXTtcclxuXHJcblx0XHRcdFx0XHRcdHJldHVybiBzZWxmO1xyXG5cdFx0XHRcdFx0fSwgeyB9ICk7XHJcblxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0cmV0dXJuIE9iamVjdC5rZXlzKCBkZWxlZ2F0ZSApLnJlZHVjZSggKCBzZWxmLCBuYW1lICkgPT4ge1xyXG5cdFx0XHRcdFx0XHRsZXQgbWV0aG9kID0gZGVsZWdhdGVbIG5hbWUgXTtcclxuXHJcblx0XHRcdFx0XHRcdGlmKCBhbm5vbiggbWV0aG9kICkgKXtcclxuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoIGBpbnZhbGlkIGRlbGVnYXRlIG1ldGhvZCwgJyR7IG1ldGhvZCB9J2AgKTtcclxuXHRcdFx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRcdFx0c2VsZlsgbmFtZSBdID0gYXN5dW0oIGNvbnRleHQsIG1ldGhvZCApWyBuYW1lIF07XHJcblxyXG5cdFx0XHRcdFx0XHRyZXR1cm4gc2VsZjtcclxuXHRcdFx0XHRcdH0sIHsgfSApO1xyXG5cdFx0XHRcdH1cclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IHNlbGYgPSB3aWNoZXZyKCBjb250ZXh0LCB7IH0gKTtcclxuXHJcblx0XHRcdGlmKCBhbm5vbiggZGVsZWdhdGUgKSApe1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvciggYGludmFsaWQgZGVsZWdhdGUgbWV0aG9kLCAnJHsgZGVsZWdhdGUgfSdgICk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdGxldCBuYW1lID0gZm5hbWUoIGRlbGVnYXRlICk7XHJcblxyXG5cdFx0XHRkZWxlZ2F0ZSA9IHR5cGVvZiBzZWxmWyBuYW1lIF0gPT0gXCJmdW5jdGlvblwiID8gc2VsZlsgbmFtZSBdIDpcclxuXHRcdFx0XHR0eXBlb2YgZGVsZWdhdGUgPT0gXCJmdW5jdGlvblwiID8gZGVsZWdhdGUgOlxyXG5cdFx0XHRcdFx0KCApID0+IHsgdGhyb3cgbmV3IEVycm9yICggYG5vIG9wZXJhdGlvbiBkb25lLCAkeyBhcmd1bWVudHMgfWAgKSB9O1xyXG5cclxuXHRcdFx0cmV0dXJuIHsgWyBuYW1lIF06IGRlbGVnYXRlLmJpbmQoIGNvbnRleHQgKSB9O1xyXG5cdFx0fVxyXG5cclxuXHRcdC8qO1xyXG5cdFx0XHRAbm90ZTpcclxuXHRcdFx0XHRUaGUgd3JhcCB2YWx1ZSBjYW4gYmUgYSBjbGFzcyBmdW5jdGlvbiBvciBhIHN0cmluZyBuYW1lIG9mIHRoZSBjbGFzc1xyXG5cdFx0XHRcdFx0ZnJvbSB0aGUgaW5oZXJpdGFuY2UgdHJlZSBvZiB0aGUgY29udGV4dC5cclxuXHJcblx0XHRcdFx0V2UgaGF2ZSB0byBnZXQgdGhlIG9yaWdpbmFsIGRlbGVnYXRlIG1ldGhvZC5cclxuXHRcdFx0QGVuZC1ub3RlXHJcblx0XHQqL1xyXG5cdFx0aWYoIGFyZ3VtZW50cy5sZW5ndGggPT0gMyApe1xyXG5cdFx0XHRpZiggdHlwZW9mIGRlbGVnYXRlID09IFwib2JqZWN0XCIgKXtcclxuXHRcdFx0XHRpZiggZG91YnQoIGRlbGVnYXRlLCBBUlJBWSApICl7XHJcblx0XHRcdFx0XHRyZXR1cm4gZGVsZWdhdGUucmVkdWNlKCAoIHNlbGYsIG1ldGhvZCApID0+IHtcclxuXHRcdFx0XHRcdFx0aWYoIGFubm9uKCBtZXRob2QgKSApe1xyXG5cdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvciggYGludmFsaWQgZGVsZWdhdGUgbWV0aG9kLCAnJHsgbWV0aG9kIH0nYCApO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRsZXQgbmFtZSA9IGZuYW1lKCBtZXRob2QgKTtcclxuXHJcblx0XHRcdFx0XHRcdHNlbGZbIG5hbWUgXSA9IGFzeXVtKCBjb250ZXh0LCB3cmFwLCBtZXRob2QgKVsgbmFtZSBdO1xyXG5cclxuXHRcdFx0XHRcdFx0cmV0dXJuIHNlbGY7XHJcblx0XHRcdFx0XHR9LCB7IH0gKTtcclxuXHJcblx0XHRcdFx0fWVsc2V7XHJcblx0XHRcdFx0XHRyZXR1cm4gT2JqZWN0LmtleXMoIGRlbGVnYXRlICkucmVkdWNlKCAoIHNlbGYsIG5hbWUgKSA9PiB7XHJcblx0XHRcdFx0XHRcdGxldCBtZXRob2QgPSBkZWxlZ2F0ZVsgbmFtZSBdO1xyXG5cclxuXHRcdFx0XHRcdFx0aWYoIGFubm9uKCBtZXRob2QgKSApe1xyXG5cdFx0XHRcdFx0XHRcdHRocm93IG5ldyBFcnJvciggYGludmFsaWQgZGVsZWdhdGUgbWV0aG9kLCAnJHsgbWV0aG9kIH0nYCApO1xyXG5cdFx0XHRcdFx0XHR9XHJcblxyXG5cdFx0XHRcdFx0XHRzZWxmWyBuYW1lIF0gPSBhc3l1bSggY29udGV4dCwgd3JhcCwgbWV0aG9kIClbIG5hbWUgXTtcclxuXHJcblx0XHRcdFx0XHRcdHJldHVybiBzZWxmO1xyXG5cdFx0XHRcdFx0fSwgeyB9ICk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRsZXQgdHJlZSA9IFsgXTtcclxuXHRcdFx0bGV0IHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiggY29udGV4dCApO1xyXG5cdFx0XHRkb3tcclxuXHRcdFx0XHR0cmVlLnB1c2goIHByb3RvdHlwZS5jb25zdHJ1Y3RvciApO1xyXG5cdFx0XHR9d2hpbGUoIHByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZiggcHJvdG90eXBlICkgKTtcclxuXHJcblx0XHRcdGlmKCBhbm5vbiggd3JhcCApICl7XHJcblx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCBgaW52YWxpZCB3cmFwcGVyIGNsYXNzLCAnJHsgd3JhcCB9J2AgKTtcclxuXHRcdFx0fVxyXG5cclxuXHRcdFx0bGV0IG5hbWUgPSBmbmFtZSggd3JhcCApO1xyXG5cdFx0XHRwcm90b3R5cGUgPSB0cmVlLnJlZHVjZSggKCBtZXRob2QsIGNvbnN0cnVjdG9yICkgPT4ge1xyXG5cdFx0XHRcdGlmKCBjb25zdHJ1Y3Rvci5uYW1lID09PSBuYW1lICl7XHJcblx0XHRcdFx0XHRyZXR1cm4gY29uc3RydWN0b3I7XHJcblxyXG5cdFx0XHRcdH1lbHNle1xyXG5cdFx0XHRcdFx0cmV0dXJuIG1ldGhvZDtcclxuXHRcdFx0XHR9XHJcblx0XHRcdH0sIHR5cGVvZiB3cmFwID09IFwiZnVuY3Rpb25cIiA/IHdyYXAgOiBmdW5jdGlvbiggKXsgfSApLnByb3RvdHlwZTtcclxuXHJcblx0XHRcdGlmKCBhbm5vbiggZGVsZWdhdGUgKSApe1xyXG5cdFx0XHRcdHRocm93IG5ldyBFcnJvciggYGludmFsaWQgZGVsZWdhdGUgbWV0aG9kLCAnJHsgZGVsZWdhdGUgfSdgICk7XHJcblx0XHRcdH1cclxuXHJcblx0XHRcdG5hbWUgPSBmbmFtZSggZGVsZWdhdGUgKTtcclxuXHJcblx0XHRcdGlmKCB0eXBlb2YgcHJvdG90eXBlWyBuYW1lIF0gPT0gXCJmdW5jdGlvblwiICl7XHJcblx0XHRcdFx0ZGVsZWdhdGUgPSBwcm90b3R5cGVbIG5hbWUgXTtcclxuXHJcblx0XHRcdH1lbHNlIGlmKCB0eXBlb2YgZGVsZWdhdGUgIT0gXCJmdW5jdGlvblwiICl7XHJcblx0XHRcdFx0ZGVsZWdhdGUgPSAoICggKSA9PiB7IHRocm93IG5ldyBFcnJvciAoIGBubyBvcGVyYXRpb24gZG9uZSwgJHsgYXJndW1lbnRzIH1gICkgfSApO1xyXG5cdFx0XHR9XHJcblxyXG5cdFx0XHRyZXR1cm4geyBbIG5hbWUgXTogZGVsZWdhdGUuYmluZCggY29udGV4dCApIH07XHJcblx0XHR9XHJcblxyXG5cdH1jYXRjaCggZXJyb3IgKXtcclxuXHRcdHRocm93IG5ldyBFcnJvciggYGNhbm5vdCBhc3N1bWUgZW50aXR5LCAkeyBlcnJvci5zdGFjayB9YCApO1xyXG5cdH1cclxuXHJcblx0dGhyb3cgbmV3IEVycm9yKCBcImZhdGFsLCBpbnZhbGlkIHBhcmFtZXRlciwgY2Fubm90IGFzc3VtZSBlbnRpdHlcIiApO1xyXG59O1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhc3l1bTtcclxuIl19
//# sourceMappingURL=asyum.support.js.map
