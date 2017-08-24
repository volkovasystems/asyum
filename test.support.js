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
              */var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);var _createClass2 = require("babel-runtime/helpers/createClass");var _createClass3 = _interopRequireDefault(_createClass2);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var assert = require("should");



//: @client:
var asyum = require("./asyum.support.js");
//: @end-client







//: @client:

describe("asyum", function () {

	describe("`asyum( { }, function test( ){ return 'test'; } ).test( )`", function () {
		it("should be equal to 'test'", function () {

			assert.equal(asyum({}, function test() {return "test";}).test(), "test");

		});
	});

	describe("`asyum with instance of class named 'ClassA' as context, class named ClassA as wrap, function method( ){ return 'world' } as delegate`", function () {
		it("should be equal to 'hello'", function () {var

			ClassA = function () {
				function ClassA() {(0, _classCallCheck3.default)(this, ClassA);}(0, _createClass3.default)(ClassA, [{ key: "method", value: function method()
					{return "hello";} }]);return ClassA;}();


			var testA = new ClassA();

			assert.equal(asyum(testA, ClassA, function method() {return "world";}).method(), "hello");

		});
	});

	describe("`asyum with instance of class named 'ClassA' as context, class named ClassA as wrap, function methodB( ){ return 'world' } as delegate`", function () {
		it("should be equal to 'world'", function () {var

			ClassA = function () {
				function ClassA() {(0, _classCallCheck3.default)(this, ClassA);}(0, _createClass3.default)(ClassA, [{ key: "method", value: function method()
					{return "hello";} }]);return ClassA;}();


			var testA = new ClassA();

			assert.equal(asyum(testA, ClassA, function methodB() {return "world";}).methodB(), "world");

		});
	});

	describe("`asyum with { 'test': function test( ){ return 'yeah'; } } as context and function test( ){ return 'test' } as wrap`", function () {
		it("should be equal to 'yeah'", function () {

			assert.equal(asyum({ "test": function test() {return "yeah";} },
			function test() {return "test";}).test(), "yeah");

		});
	});

});

//: @end-client
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3Quc3VwcG9ydC5qcyJdLCJuYW1lcyI6WyJhc3NlcnQiLCJyZXF1aXJlIiwiYXN5dW0iLCJkZXNjcmliZSIsIml0IiwiZXF1YWwiLCJ0ZXN0IiwiQ2xhc3NBIiwidGVzdEEiLCJtZXRob2QiLCJtZXRob2RCIl0sIm1hcHBpbmdzIjoiQUFBQTs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVEQSxJQUFNQSxTQUFTQyxRQUFTLFFBQVQsQ0FBZjs7OztBQUlBO0FBQ0EsSUFBTUMsUUFBUUQsUUFBUyxvQkFBVCxDQUFkO0FBQ0E7Ozs7Ozs7O0FBUUE7O0FBRUFFLFNBQVUsT0FBVixFQUFtQixZQUFPOztBQUV6QkEsVUFBVSw0REFBVixFQUF3RSxZQUFPO0FBQzlFQyxLQUFJLDJCQUFKLEVBQWlDLFlBQU87O0FBRXZDSixVQUFPSyxLQUFQLENBQWNILE1BQU8sRUFBUCxFQUFZLFNBQVNJLElBQVQsR0FBZ0IsQ0FBRSxPQUFPLE1BQVAsQ0FBZ0IsQ0FBOUMsRUFBaURBLElBQWpELEVBQWQsRUFBd0UsTUFBeEU7O0FBRUEsR0FKRDtBQUtBLEVBTkQ7O0FBUUFILFVBQVUsd0lBQVYsRUFBb0osWUFBTztBQUMxSkMsS0FBSSw0QkFBSixFQUFrQyxZQUFPOztBQUVsQ0csU0FGa0M7QUFHdkMsc0JBQWMsNkNBQUcsQ0FIc0I7QUFJOUIsTUFBRSxPQUFPLE9BQVAsQ0FBaUIsQ0FKVzs7O0FBT3hDLE9BQUlDLFFBQVEsSUFBSUQsTUFBSixFQUFaOztBQUVBUCxVQUFPSyxLQUFQLENBQWNILE1BQU9NLEtBQVAsRUFBY0QsTUFBZCxFQUFzQixTQUFTRSxNQUFULEdBQWtCLENBQUUsT0FBTyxPQUFQLENBQWlCLENBQTNELEVBQThEQSxNQUE5RCxFQUFkLEVBQXVGLE9BQXZGOztBQUVBLEdBWEQ7QUFZQSxFQWJEOztBQWVBTixVQUFVLHlJQUFWLEVBQXFKLFlBQU87QUFDM0pDLEtBQUksNEJBQUosRUFBa0MsWUFBTzs7QUFFbENHLFNBRmtDO0FBR3ZDLHNCQUFjLDZDQUFHLENBSHNCO0FBSTlCLE1BQUUsT0FBTyxPQUFQLENBQWlCLENBSlc7OztBQU94QyxPQUFJQyxRQUFRLElBQUlELE1BQUosRUFBWjs7QUFFQVAsVUFBT0ssS0FBUCxDQUFjSCxNQUFPTSxLQUFQLEVBQWNELE1BQWQsRUFBc0IsU0FBU0csT0FBVCxHQUFtQixDQUFFLE9BQU8sT0FBUCxDQUFpQixDQUE1RCxFQUErREEsT0FBL0QsRUFBZCxFQUF5RixPQUF6Rjs7QUFFQSxHQVhEO0FBWUEsRUFiRDs7QUFlQVAsVUFBVSxzSEFBVixFQUFrSSxZQUFPO0FBQ3hJQyxLQUFJLDJCQUFKLEVBQWlDLFlBQU87O0FBRXZDSixVQUFPSyxLQUFQLENBQWNILE1BQU8sRUFBRSxRQUFRLFNBQVNJLElBQVQsR0FBZ0IsQ0FBRSxPQUFPLE1BQVAsQ0FBZ0IsQ0FBNUMsRUFBUDtBQUNiLFlBQVNBLElBQVQsR0FBZ0IsQ0FBRSxPQUFPLE1BQVAsQ0FBZ0IsQ0FEckIsRUFDd0JBLElBRHhCLEVBQWQsRUFDK0MsTUFEL0M7O0FBR0EsR0FMRDtBQU1BLEVBUEQ7O0FBU0EsQ0FqREQ7O0FBbURBIiwiZmlsZSI6InRlc3Quc3VwcG9ydC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG4vKjtcblx0QHRlc3QtbGljZW5zZTpcblx0XHRUaGUgTUlUIExpY2Vuc2UgKE1JVClcblx0XHRAbWl0LWxpY2Vuc2VcblxuXHRcdENvcHlyaWdodCAoQGMpIDIwMTcgUmljaGV2ZSBTaW9kaW5hIEJlYmVkb3Jcblx0XHRAZW1haWw6IHJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cblxuXHRcdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcblx0XHRvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZSBcIlNvZnR3YXJlXCIpLCB0byBkZWFsXG5cdFx0aW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuXHRcdHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcblx0XHRjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG8gcGVybWl0IHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXNcblx0XHRmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG5cdFx0VGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW4gYWxsXG5cdFx0Y29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cblxuXHRcdFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcblx0XHRJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcblx0XHRGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcblx0XHRBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG5cdFx0TElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcblx0XHRPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxuXHRcdFNPRlRXQVJFLlxuXHRAZW5kLXRlc3QtbGljZW5zZVxuXG5cdEB0ZXN0LWNvbmZpZ3VyYXRpb246XG5cdFx0e1xuXHRcdFx0XCJwYWNrYWdlXCI6IFwiYXN5dW1cIixcblx0XHRcdFwicGF0aFwiOiBcImFzeXVtL3Rlc3QubW9kdWxlLmpzXCIsXG5cdFx0XHRcImZpbGVcIjogXCJ0ZXN0Lm1vZHVsZS5qc1wiLFxuXHRcdFx0XCJtb2R1bGVcIjogXCJ0ZXN0XCIsXG5cdFx0XHRcImF1dGhvclwiOiBcIlJpY2hldmUgUy4gQmViZWRvclwiLFxuXHRcdFx0XCJlTWFpbFwiOiBcInJpY2hldmUuYmViZWRvckBnbWFpbC5jb21cIixcblx0XHRcdFwiY29udHJpYnV0b3JzXCI6IFtcblx0XHRcdFx0XCJKb2huIExlbm9uIE1hZ2hhbm95IDxqb2hubGVub25tYWdoYW5veUBnbWFpbC5jb20+XCIsXG5cdFx0XHRcdFwiVmluc2UgVmluYWxvbiA8dmluc2V2aW5hbG9uQGdtYWlsLmNvbT5cIlxuXHRcdFx0XSxcblx0XHRcdFwicmVwb3NpdG9yeVwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS92b2xrb3Zhc3lzdGVtcy9hc3l1bS5naXRcIlxuXHRcdH1cblx0QGVuZC10ZXN0LWNvbmZpZ3VyYXRpb25cblxuXHRAdGVzdC1kb2N1bWVudGF0aW9uOlxuXG5cdEBlbmQtdGVzdC1kb2N1bWVudGF0aW9uXG5cblx0QGluY2x1ZGU6XG5cdFx0e1xuXHRcdFx0XCJhc3NlcnRcIjogXCJzaG91bGRcIixcblx0XHRcdFwiYXN5dW1cIjogXCJhc3l1bVwiXG5cdFx0fVxuXHRAZW5kLWluY2x1ZGVcbiovXG5cbmNvbnN0IGFzc2VydCA9IHJlcXVpcmUoIFwic2hvdWxkXCIgKTtcblxuXG5cbi8vOiBAY2xpZW50OlxuY29uc3QgYXN5dW0gPSByZXF1aXJlKCBcIi4vYXN5dW0uc3VwcG9ydC5qc1wiICk7XG4vLzogQGVuZC1jbGllbnRcblxuXG5cblxuXG5cblxuLy86IEBjbGllbnQ6XG5cbmRlc2NyaWJlKCBcImFzeXVtXCIsICggKSA9PiB7XG5cblx0ZGVzY3JpYmUoIFwiYGFzeXVtKCB7IH0sIGZ1bmN0aW9uIHRlc3QoICl7IHJldHVybiAndGVzdCc7IH0gKS50ZXN0KCApYFwiLCAoICkgPT4ge1xuXHRcdGl0KCBcInNob3VsZCBiZSBlcXVhbCB0byAndGVzdCdcIiwgKCApID0+IHtcblxuXHRcdFx0YXNzZXJ0LmVxdWFsKCBhc3l1bSggeyB9LCBmdW5jdGlvbiB0ZXN0KCApeyByZXR1cm4gXCJ0ZXN0XCI7IH0gKS50ZXN0KCApLCBcInRlc3RcIiApO1xuXG5cdFx0fSApO1xuXHR9ICk7XG5cblx0ZGVzY3JpYmUoIFwiYGFzeXVtIHdpdGggaW5zdGFuY2Ugb2YgY2xhc3MgbmFtZWQgJ0NsYXNzQScgYXMgY29udGV4dCwgY2xhc3MgbmFtZWQgQ2xhc3NBIGFzIHdyYXAsIGZ1bmN0aW9uIG1ldGhvZCggKXsgcmV0dXJuICd3b3JsZCcgfSBhcyBkZWxlZ2F0ZWBcIiwgKCApID0+IHtcblx0XHRpdCggXCJzaG91bGQgYmUgZXF1YWwgdG8gJ2hlbGxvJ1wiLCAoICkgPT4ge1xuXG5cdFx0XHRjbGFzcyBDbGFzc0F7XG5cdFx0XHRcdGNvbnN0cnVjdG9yKCApeyB9XG5cdFx0XHRcdG1ldGhvZCggKXsgcmV0dXJuIFwiaGVsbG9cIjsgfVxuXHRcdFx0fVxuXG5cdFx0XHRsZXQgdGVzdEEgPSBuZXcgQ2xhc3NBKCApO1xuXG5cdFx0XHRhc3NlcnQuZXF1YWwoIGFzeXVtKCB0ZXN0QSwgQ2xhc3NBLCBmdW5jdGlvbiBtZXRob2QoICl7IHJldHVybiBcIndvcmxkXCI7IH0gKS5tZXRob2QoICksIFwiaGVsbG9cIiApO1xuXG5cdFx0fSApO1xuXHR9ICk7XG5cblx0ZGVzY3JpYmUoIFwiYGFzeXVtIHdpdGggaW5zdGFuY2Ugb2YgY2xhc3MgbmFtZWQgJ0NsYXNzQScgYXMgY29udGV4dCwgY2xhc3MgbmFtZWQgQ2xhc3NBIGFzIHdyYXAsIGZ1bmN0aW9uIG1ldGhvZEIoICl7IHJldHVybiAnd29ybGQnIH0gYXMgZGVsZWdhdGVgXCIsICggKSA9PiB7XG5cdFx0aXQoIFwic2hvdWxkIGJlIGVxdWFsIHRvICd3b3JsZCdcIiwgKCApID0+IHtcblxuXHRcdFx0Y2xhc3MgQ2xhc3NBe1xuXHRcdFx0XHRjb25zdHJ1Y3RvciggKXsgfVxuXHRcdFx0XHRtZXRob2QoICl7IHJldHVybiBcImhlbGxvXCI7IH1cblx0XHRcdH1cblxuXHRcdFx0bGV0IHRlc3RBID0gbmV3IENsYXNzQSggKTtcblxuXHRcdFx0YXNzZXJ0LmVxdWFsKCBhc3l1bSggdGVzdEEsIENsYXNzQSwgZnVuY3Rpb24gbWV0aG9kQiggKXsgcmV0dXJuIFwid29ybGRcIjsgfSApLm1ldGhvZEIoICksIFwid29ybGRcIiApO1xuXG5cdFx0fSApO1xuXHR9ICk7XG5cblx0ZGVzY3JpYmUoIFwiYGFzeXVtIHdpdGggeyAndGVzdCc6IGZ1bmN0aW9uIHRlc3QoICl7IHJldHVybiAneWVhaCc7IH0gfSBhcyBjb250ZXh0IGFuZCBmdW5jdGlvbiB0ZXN0KCApeyByZXR1cm4gJ3Rlc3QnIH0gYXMgd3JhcGBcIiwgKCApID0+IHtcblx0XHRpdCggXCJzaG91bGQgYmUgZXF1YWwgdG8gJ3llYWgnXCIsICggKSA9PiB7XG5cblx0XHRcdGFzc2VydC5lcXVhbCggYXN5dW0oIHsgXCJ0ZXN0XCI6IGZ1bmN0aW9uIHRlc3QoICl7IHJldHVybiBcInllYWhcIjsgfSB9LFxuXHRcdFx0XHRmdW5jdGlvbiB0ZXN0KCApeyByZXR1cm4gXCJ0ZXN0XCI7IH0gKS50ZXN0KCApLCBcInllYWhcIiApO1xuXG5cdFx0fSApO1xuXHR9ICk7XG5cbn0gKTtcblxuLy86IEBlbmQtY2xpZW50XG5cblxuXG4iXX0=
//# sourceMappingURL=test.support.js.map
