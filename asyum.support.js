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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFzeXVtLnN1cHBvcnQuanMiXSwibmFtZXMiOlsiYW5ub24iLCJyZXF1aXJlIiwiZG91YnQiLCJmbmFtZSIsIndpY2hldnIiLCJhc3l1bSIsImNvbnRleHQiLCJ3cmFwIiwiZGVsZWdhdGUiLCJhcmd1bWVudHMiLCJsZW5ndGgiLCJBUlJBWSIsInJlZHVjZSIsInNlbGYiLCJtZXRob2QiLCJFcnJvciIsIm5hbWUiLCJiaW5kIiwidHJlZSIsInByb3RvdHlwZSIsInB1c2giLCJjb25zdHJ1Y3RvciIsImVycm9yIiwic3RhY2siLCJtb2R1bGUiLCJleHBvcnRzIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0VBLElBQU1BLFFBQVFDLFFBQVMsT0FBVCxDQUFkO0FBQ0EsSUFBTUMsUUFBUUQsUUFBUyxPQUFULENBQWQ7QUFDQSxJQUFNRSxRQUFRRixRQUFTLE9BQVQsQ0FBZDtBQUNBLElBQU1HLFVBQVVILFFBQVMsU0FBVCxDQUFoQjs7QUFFQSxJQUFNSSxRQUFRLFNBQVNBLEtBQVQsQ0FBZ0JDLE9BQWhCLEVBQXlCQyxJQUF6QixFQUErQkMsUUFBL0IsRUFBeUM7QUFDdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQSxLQUFHO0FBQ0Y7Ozs7O0FBS0EsTUFBSUMsVUFBVUMsTUFBVixJQUFvQixDQUF4QixFQUEyQjtBQUMxQkYsY0FBV0MsVUFBVyxDQUFYLENBQVg7O0FBRUEsT0FBSSxRQUFPRCxRQUFQLHVEQUFPQSxRQUFQLE1BQW1CLFFBQXZCLEVBQWlDO0FBQ2hDLFFBQUlOLE1BQU9NLFFBQVAsRUFBaUJHLEtBQWpCLENBQUosRUFBOEI7QUFDN0IsWUFBT0gsU0FBU0ksTUFBVCxDQUFpQixVQUFFQyxJQUFGLEVBQVFDLE1BQVIsRUFBb0I7QUFDM0MsVUFBSWQsTUFBT2MsTUFBUCxDQUFKLEVBQXFCO0FBQ3BCLGFBQU0sSUFBSUMsS0FBSixn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dCI6WyJcInVzZSBzdHJpY3RcIjtcblxuLyo7XG5cdEBtb2R1bGUtbGljZW5zZTpcblx0XHRUaGUgTUlUIExpY2Vuc2UgKE1JVClcblx0XHRAbWl0LWxpY2Vuc2VcblxuXHRcdENvcHlyaWdodCAoQGMpIDIwMTcgUmljaGV2ZSBTaW9kaW5hIEJlYmVkb3Jcblx0XHRAZW1haWw6IHJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cblxuXHRcdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcblx0XHRvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5cdFx0aW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuXHRcdHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcblx0XHRjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcblx0XHRmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5cdFx0VGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5cdFx0Y29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuXHRcdFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcblx0XHRJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcblx0XHRGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcblx0XHRBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5cdFx0TElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcblx0XHRPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuXHRcdFNPRlRXQVJFLlxuXHRAZW5kLW1vZHVsZS1saWNlbnNlXG5cblx0QG1vZHVsZS1jb25maWd1cmF0aW9uOlxuXHRcdHtcblx0XHRcdFwicGFja2FnZVwiOiBcImFzeXVtXCIsXG5cdFx0XHRcInBhdGhcIjogXCJhc3l1bS9hc3l1bS5qc1wiLFxuXHRcdFx0XCJmaWxlXCI6IFwiYXN5dW0uanNcIixcblx0XHRcdFwibW9kdWxlXCI6IFwiYXN5dW1cIixcblx0XHRcdFwiYXV0aG9yXCI6IFwiUmljaGV2ZSBTLiBCZWJlZG9yXCIsXG5cdFx0XHRcImVNYWlsXCI6IFwicmljaGV2ZS5iZWJlZG9yQGdtYWlsLmNvbVwiLFxuXHRcdFx0XCJjb250cmlidXRvcnNcIjogW1xuXHRcdFx0XHRcIkpvaG4gTGVub24gTWFnaGFub3kgPGpvaG5sZW5vbm1hZ2hhbm95QGdtYWlsLmNvbT5cIixcblx0XHRcdFx0XCJWaW5zZSBWaW5hbG9uIDx2aW5zZXZpbmFsb25AZ21haWwuY29tPlwiXG5cdFx0XHRdLFxuXHRcdFx0XCJyZXBvc2l0b3J5XCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3ZvbGtvdmFzeXN0ZW1zL2FzeXVtLmdpdFwiLFxuXHRcdFx0XCJ0ZXN0XCI6IFwiYXN5dW0tdGVzdC5qc1wiLFxuXHRcdFx0XCJnbG9iYWxcIjogdHJ1ZVxuXHRcdH1cblx0QGVuZC1tb2R1bGUtY29uZmlndXJhdGlvblxuXG5cdEBtb2R1bGUtZG9jdW1lbnRhdGlvbjpcblx0XHRQcmV0ZW5kIGVudGl0eS5cblxuXHRcdFN1cHBvcnRlZCBtdWx0aXBsZSBkZWxlZ2F0ZS5cblx0XHRUaGlzIHdpbGwgcmV0dXJuIGEgZGVsZWdhdGVkIGVudGl0eSB3aXRoIGJvdW5kIGRlbGVnYXRlZCBwcm9wZXJ0aWVzLlxuXHRcdFVzZSB0aGlzIG1vZHVsZSBmb3IgZGVsZWdhdGV0IHByb3BlcnR5IG1ldGhvZCBwcm94eS5cblx0XHRJZiB0aGUgZGVsZWdhdGVkIHByb3BlcnR5IG1ldGhvZCBpcyBjYWxsZWQgd2l0aG91dCBzdWZmaWNpZW50IG92ZXJyaWRlLFxuXHRcdFx0dGhpcyB3aWxsIHRocm93IGEgbm8gb3BlcmF0aW9uIGRvbmUgZXJyb3IuXG5cdFx0RGVsZWdhdGUgbWV0aG9kIHNob3VsZCBub3QgYmUgYW5vbnltb3VzLlxuXHRAZW5kLW1vZHVsZS1kb2N1bWVudGF0aW9uXG5cblx0QGluY2x1ZGU6XG5cdFx0e1xuXHRcdFx0XCJhbm5vblwiOiBcImFubm9uXCIsXG5cdFx0XHRcImRvdWJ0XCI6IFwiZG91YnRcIixcblx0XHRcdFwiZm5hbWVcIjogXCJmbmFtZVwiLFxuXHRcdFx0XCJ3aWNoZXZyXCI6IFwid2ljaGV2clwiXG5cdFx0fVxuXHRAZW5kLWluY2x1ZGVcbiovXG5cbmNvbnN0IGFubm9uID0gcmVxdWlyZSggXCJhbm5vblwiICk7XG5jb25zdCBkb3VidCA9IHJlcXVpcmUoIFwiZG91YnRcIiApO1xuY29uc3QgZm5hbWUgPSByZXF1aXJlKCBcImZuYW1lXCIgKTtcbmNvbnN0IHdpY2hldnIgPSByZXF1aXJlKCBcIndpY2hldnJcIiApO1xuXG5jb25zdCBhc3l1bSA9IGZ1bmN0aW9uIGFzeXVtKCBjb250ZXh0LCB3cmFwLCBkZWxlZ2F0ZSApe1xuXHQvKjtcblx0XHRAbWV0YS1jb25maWd1cmF0aW9uOlxuXHRcdFx0e1xuXHRcdFx0XHRcImNvbnRleHQ6cmVxdWlyZWRcIjogXCIqXCIsXG5cdFx0XHRcdFwid3JhcFwiOiBbXG5cdFx0XHRcdFx0XCJzdHJpbmdcIixcblx0XHRcdFx0XHRcImZ1bmN0aW9uXCJcblx0XHRcdFx0XSxcblx0XHRcdFx0XCJkZWxlZ2F0ZTpyZXF1aXJlZFwiOiBbXG5cdFx0XHRcdFx0XCJzdHJpbmdcIixcblx0XHRcdFx0XHRcImZ1bmN0aW9uXCIsXG5cdFx0XHRcdFx0WyBcInN0cmluZ1wiLCBcImZ1bmN0aW9uXCIgXSxcblx0XHRcdFx0XHR7IFwic3RyaW5nXCI6IFwiZnVuY3Rpb25cIiB9XG5cdFx0XHRcdF1cblx0XHRcdH1cblx0XHRAZW5kLW1ldGEtY29uZmlndXJhdGlvblxuXHQqL1xuXG5cdHRyeXtcblx0XHQvKjtcblx0XHRcdEBub3RlOlxuXHRcdFx0XHRJZiB0aGVyZSBhcmUgMiBwYXJhbWV0ZXJzIHRoZW4gaXQgc2hvdWxkIGJlIGNvbnRleHQgYW5kIGRlbGVnYXRlLlxuXHRcdFx0QGVuZC1ub3RlXG5cdFx0Ki9cblx0XHRpZiggYXJndW1lbnRzLmxlbmd0aCA9PSAyICl7XG5cdFx0XHRkZWxlZ2F0ZSA9IGFyZ3VtZW50c1sgMSBdO1xuXG5cdFx0XHRpZiggdHlwZW9mIGRlbGVnYXRlID09IFwib2JqZWN0XCIgKXtcblx0XHRcdFx0aWYoIGRvdWJ0KCBkZWxlZ2F0ZSwgQVJSQVkgKSApe1xuXHRcdFx0XHRcdHJldHVybiBkZWxlZ2F0ZS5yZWR1Y2UoICggc2VsZiwgbWV0aG9kICkgPT4ge1xuXHRcdFx0XHRcdFx0aWYoIGFubm9uKCBtZXRob2QgKSApe1xuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoIGBpbnZhbGlkIGRlbGVnYXRlIG1ldGhvZCwgJyR7IG1ldGhvZCB9J2AgKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0bGV0IG5hbWUgPSBmbmFtZSggbWV0aG9kICk7XG5cblx0XHRcdFx0XHRcdHNlbGZbIG5hbWUgXSA9IGFzeXVtKCBjb250ZXh0LCBtZXRob2QgKVsgbmFtZSBdO1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gc2VsZjtcblx0XHRcdFx0XHR9LCB7IH0gKTtcblxuXHRcdFx0XHR9ZWxzZXtcblx0XHRcdFx0XHRyZXR1cm4gT2JqZWN0LmtleXMoIGRlbGVnYXRlICkucmVkdWNlKCAoIHNlbGYsIG5hbWUgKSA9PiB7XG5cdFx0XHRcdFx0XHRsZXQgbWV0aG9kID0gZGVsZWdhdGVbIG5hbWUgXTtcblxuXHRcdFx0XHRcdFx0aWYoIGFubm9uKCBtZXRob2QgKSApe1xuXHRcdFx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoIGBpbnZhbGlkIGRlbGVnYXRlIG1ldGhvZCwgJyR7IG1ldGhvZCB9J2AgKTtcblx0XHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdFx0c2VsZlsgbmFtZSBdID0gYXN5dW0oIGNvbnRleHQsIG1ldGhvZCApWyBuYW1lIF07XG5cblx0XHRcdFx0XHRcdHJldHVybiBzZWxmO1xuXHRcdFx0XHRcdH0sIHsgfSApO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdGxldCBzZWxmID0gd2ljaGV2ciggY29udGV4dCwgeyB9ICk7XG5cblx0XHRcdGlmKCBhbm5vbiggZGVsZWdhdGUgKSApe1xuXHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoIGBpbnZhbGlkIGRlbGVnYXRlIG1ldGhvZCwgJyR7IGRlbGVnYXRlIH0nYCApO1xuXHRcdFx0fVxuXG5cdFx0XHRsZXQgbmFtZSA9IGZuYW1lKCBkZWxlZ2F0ZSApO1xuXG5cdFx0XHRkZWxlZ2F0ZSA9IHR5cGVvZiBzZWxmWyBuYW1lIF0gPT0gXCJmdW5jdGlvblwiID8gc2VsZlsgbmFtZSBdIDpcblx0XHRcdFx0dHlwZW9mIGRlbGVnYXRlID09IFwiZnVuY3Rpb25cIiA/IGRlbGVnYXRlIDpcblx0XHRcdFx0XHQoICkgPT4geyB0aHJvdyBuZXcgRXJyb3IgKCBgbm8gb3BlcmF0aW9uIGRvbmUsICR7IGFyZ3VtZW50cyB9YCApIH07XG5cblx0XHRcdHJldHVybiB7IFsgbmFtZSBdOiBkZWxlZ2F0ZS5iaW5kKCBjb250ZXh0ICkgfTtcblx0XHR9XG5cblx0XHQvKjtcblx0XHRcdEBub3RlOlxuXHRcdFx0XHRUaGUgd3JhcCB2YWx1ZSBjYW4gYmUgYSBjbGFzcyBmdW5jdGlvbiBvciBhIHN0cmluZyBuYW1lIG9mIHRoZSBjbGFzc1xuXHRcdFx0XHRcdGZyb20gdGhlIGluaGVyaXRhbmNlIHRyZWUgb2YgdGhlIGNvbnRleHQuXG5cblx0XHRcdFx0V2UgaGF2ZSB0byBnZXQgdGhlIG9yaWdpbmFsIGRlbGVnYXRlIG1ldGhvZC5cblx0XHRcdEBlbmQtbm90ZVxuXHRcdCovXG5cdFx0aWYoIGFyZ3VtZW50cy5sZW5ndGggPT0gMyApe1xuXHRcdFx0aWYoIHR5cGVvZiBkZWxlZ2F0ZSA9PSBcIm9iamVjdFwiICl7XG5cdFx0XHRcdGlmKCBkb3VidCggZGVsZWdhdGUsIEFSUkFZICkgKXtcblx0XHRcdFx0XHRyZXR1cm4gZGVsZWdhdGUucmVkdWNlKCAoIHNlbGYsIG1ldGhvZCApID0+IHtcblx0XHRcdFx0XHRcdGlmKCBhbm5vbiggbWV0aG9kICkgKXtcblx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCBgaW52YWxpZCBkZWxlZ2F0ZSBtZXRob2QsICckeyBtZXRob2QgfSdgICk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdGxldCBuYW1lID0gZm5hbWUoIG1ldGhvZCApO1xuXG5cdFx0XHRcdFx0XHRzZWxmWyBuYW1lIF0gPSBhc3l1bSggY29udGV4dCwgd3JhcCwgbWV0aG9kIClbIG5hbWUgXTtcblxuXHRcdFx0XHRcdFx0cmV0dXJuIHNlbGY7XG5cdFx0XHRcdFx0fSwgeyB9ICk7XG5cblx0XHRcdFx0fWVsc2V7XG5cdFx0XHRcdFx0cmV0dXJuIE9iamVjdC5rZXlzKCBkZWxlZ2F0ZSApLnJlZHVjZSggKCBzZWxmLCBuYW1lICkgPT4ge1xuXHRcdFx0XHRcdFx0bGV0IG1ldGhvZCA9IGRlbGVnYXRlWyBuYW1lIF07XG5cblx0XHRcdFx0XHRcdGlmKCBhbm5vbiggbWV0aG9kICkgKXtcblx0XHRcdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKCBgaW52YWxpZCBkZWxlZ2F0ZSBtZXRob2QsICckeyBtZXRob2QgfSdgICk7XG5cdFx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRcdHNlbGZbIG5hbWUgXSA9IGFzeXVtKCBjb250ZXh0LCB3cmFwLCBtZXRob2QgKVsgbmFtZSBdO1xuXG5cdFx0XHRcdFx0XHRyZXR1cm4gc2VsZjtcblx0XHRcdFx0XHR9LCB7IH0gKTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHRsZXQgdHJlZSA9IFsgXTtcblx0XHRcdGxldCBwcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoIGNvbnRleHQgKTtcblx0XHRcdGRve1xuXHRcdFx0XHR0cmVlLnB1c2goIHByb3RvdHlwZS5jb25zdHJ1Y3RvciApO1xuXHRcdFx0fXdoaWxlKCBwcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YoIHByb3RvdHlwZSApICk7XG5cblx0XHRcdGlmKCBhbm5vbiggd3JhcCApICl7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvciggYGludmFsaWQgd3JhcHBlciBjbGFzcywgJyR7IHdyYXAgfSdgICk7XG5cdFx0XHR9XG5cblx0XHRcdGxldCBuYW1lID0gZm5hbWUoIHdyYXAgKTtcblx0XHRcdHByb3RvdHlwZSA9IHRyZWUucmVkdWNlKCAoIG1ldGhvZCwgY29uc3RydWN0b3IgKSA9PiB7XG5cdFx0XHRcdGlmKCBjb25zdHJ1Y3Rvci5uYW1lID09PSBuYW1lICl7XG5cdFx0XHRcdFx0cmV0dXJuIGNvbnN0cnVjdG9yO1xuXG5cdFx0XHRcdH1lbHNle1xuXHRcdFx0XHRcdHJldHVybiBtZXRob2Q7XG5cdFx0XHRcdH1cblx0XHRcdH0sIHR5cGVvZiB3cmFwID09IFwiZnVuY3Rpb25cIiA/IHdyYXAgOiBmdW5jdGlvbiggKXsgfSApLnByb3RvdHlwZTtcblxuXHRcdFx0aWYoIGFubm9uKCBkZWxlZ2F0ZSApICl7XG5cdFx0XHRcdHRocm93IG5ldyBFcnJvciggYGludmFsaWQgZGVsZWdhdGUgbWV0aG9kLCAnJHsgZGVsZWdhdGUgfSdgICk7XG5cdFx0XHR9XG5cblx0XHRcdG5hbWUgPSBmbmFtZSggZGVsZWdhdGUgKTtcblxuXHRcdFx0aWYoIHR5cGVvZiBwcm90b3R5cGVbIG5hbWUgXSA9PSBcImZ1bmN0aW9uXCIgKXtcblx0XHRcdFx0ZGVsZWdhdGUgPSBwcm90b3R5cGVbIG5hbWUgXTtcblxuXHRcdFx0fWVsc2UgaWYoIHR5cGVvZiBkZWxlZ2F0ZSAhPSBcImZ1bmN0aW9uXCIgKXtcblx0XHRcdFx0ZGVsZWdhdGUgPSAoICggKSA9PiB7IHRocm93IG5ldyBFcnJvciAoIGBubyBvcGVyYXRpb24gZG9uZSwgJHsgYXJndW1lbnRzIH1gICkgfSApO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4geyBbIG5hbWUgXTogZGVsZWdhdGUuYmluZCggY29udGV4dCApIH07XG5cdFx0fVxuXG5cdH1jYXRjaCggZXJyb3IgKXtcblx0XHR0aHJvdyBuZXcgRXJyb3IoIGBjYW5ub3QgYXNzdW1lIGVudGl0eSwgJHsgZXJyb3Iuc3RhY2sgfWAgKTtcblx0fVxuXG5cdHRocm93IG5ldyBFcnJvciggXCJmYXRhbCwgaW52YWxpZCBwYXJhbWV0ZXIsIGNhbm5vdCBhc3N1bWUgZW50aXR5XCIgKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gYXN5dW07XG4iXX0=
//# sourceMappingURL=asyum.support.js.map
