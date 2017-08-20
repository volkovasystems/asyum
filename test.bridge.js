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

var assert = require("should");





//: @bridge:
var path = require("path");
//: @end-bridge

//: @bridge:

describe("asyum", function () {

	var bridgeURL = "file://" + path.resolve(__dirname, "bridge.html");

	describe("`asyum( { }, function test( ){ return 'test'; } ).test( )`", function () {
		it("should be equal to 'test'", function () {

			var result = browser.url(bridgeURL).execute(

			function () {

				return asyum({}, function test() {return "test";}).test();

			}).

			value;

			assert.equal(result, "test");

		});
	});

	describe("`asyum( testA, ClassA, function method( ){ return 'world'; } ).method( )`", function () {
		it("should be equal to 'hello'", function () {
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
			assert.equal(result, "hello");

		});
	});

	describe("`asyum( testA, ClassA, function methodB( ){ return 'world'; } ).methodB( )`", function () {
		it("should be equal to 'world'", function () {
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
			assert.equal(result, "world");

		});
	});

	describe("`Asyum with context and wrap`", function () {
		it("should be equal to 'yeah'", function () {

			var result = browser.url(bridgeURL).execute(

			function () {
				return asyum({ "test": function test() {return "yeah";} },
				function test() {return "test";}).test();
			}).

			value;

			assert.equal(result, "yeah");

		});
	});

});

//: @end-bridge
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QuYnJpZGdlLmpzIl0sIm5hbWVzIjpbImFzc2VydCIsInJlcXVpcmUiLCJwYXRoIiwiZGVzY3JpYmUiLCJicmlkZ2VVUkwiLCJyZXNvbHZlIiwiX19kaXJuYW1lIiwiaXQiLCJyZXN1bHQiLCJicm93c2VyIiwidXJsIiwiZXhlY3V0ZSIsImFzeXVtIiwidGVzdCIsInZhbHVlIiwiZXF1YWwiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdURBLElBQU1BLFNBQVNDLFFBQVMsUUFBVCxDQUFmOzs7Ozs7QUFNQTtBQUNBLElBQU1DLE9BQU9ELFFBQVMsTUFBVCxDQUFiO0FBQ0E7O0FBRUE7O0FBRUFFLFNBQVUsT0FBVixFQUFtQixZQUFPOztBQUV6QixLQUFJQyx3QkFBdUJGLEtBQUtHLE9BQUwsQ0FBY0MsU0FBZCxFQUF5QixhQUF6QixDQUEzQjs7QUFFQUgsVUFBVSw0REFBVixFQUF3RSxZQUFPO0FBQzlFSSxLQUFJLDJCQUFKLEVBQWlDLFlBQU87O0FBRXZDLE9BQUlDLFNBQVNDLFFBQVFDLEdBQVIsQ0FBYU4sU0FBYixFQUF5Qk8sT0FBekI7O0FBRVosZUFBVzs7QUFFVixXQUFPQyxNQUFPLEVBQVAsRUFBWSxTQUFTQyxJQUFULEdBQWdCLENBQUUsT0FBTyxNQUFQLENBQWdCLENBQTlDLEVBQWlEQSxJQUFqRCxFQUFQOztBQUVBLElBTlc7O0FBUVhDLFFBUkY7O0FBVUFkLFVBQU9lLEtBQVAsQ0FBY1AsTUFBZCxFQUFzQixNQUF0Qjs7QUFFQSxHQWREO0FBZUEsRUFoQkQ7O0FBa0JBTCxVQUFVLDJFQUFWLEVBQXVGLFlBQU87QUFDN0ZJLEtBQUksNEJBQUosRUFBa0MsWUFBTztBQUN4QztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7O0FBZ0JBO0FBQ0dQLFVBQU9lLEtBQVAsQ0FBY1AsTUFBZCxFQUFzQixPQUF0Qjs7QUFFQSxHQXJCRDtBQXNCQSxFQXZCRDs7QUF5QkFMLFVBQVUsNkVBQVYsRUFBeUYsWUFBTztBQUMvRkksS0FBSSw0QkFBSixFQUFrQyxZQUFPO0FBQ3hDO0FBQ0g7Ozs7Ozs7Ozs7Ozs7OztBQWVBO0FBQ0dQLFVBQU9lLEtBQVAsQ0FBY1AsTUFBZCxFQUFzQixPQUF0Qjs7QUFFQSxHQXBCRDtBQXFCQSxFQXRCRDs7QUF3QkFMLFVBQVUsK0JBQVYsRUFBMkMsWUFBTztBQUNqREksS0FBSSwyQkFBSixFQUFpQyxZQUFPOztBQUV2QyxPQUFJQyxTQUFTQyxRQUFRQyxHQUFSLENBQWFOLFNBQWIsRUFBeUJPLE9BQXpCOztBQUVaLGVBQVc7QUFDVixXQUFPQyxNQUFPLEVBQUUsUUFBUSxTQUFTQyxJQUFULEdBQWdCLENBQUUsT0FBTyxNQUFQLENBQWdCLENBQTVDLEVBQVA7QUFDUCxhQUFTQSxJQUFULEdBQWdCLENBQUUsT0FBTyxNQUFQLENBQWdCLENBRDNCLEVBQzhCQSxJQUQ5QixFQUFQO0FBRUEsSUFMVzs7QUFPWEMsUUFQRjs7QUFTQWQsVUFBT2UsS0FBUCxDQUFjUCxNQUFkLEVBQXNCLE1BQXRCOztBQUVBLEdBYkQ7QUFjQSxFQWZEOztBQWlCQSxDQXhGRDs7QUEwRkEiLCJmaWxlIjoidGVzdC5icmlkZ2UuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuXHJcbi8qO1xyXG5cdEB0ZXN0LWxpY2Vuc2U6XHJcblx0XHRUaGUgTUlUIExpY2Vuc2UgKE1JVClcclxuXHRcdEBtaXQtbGljZW5zZVxyXG5cclxuXHRcdENvcHlyaWdodCAoQGMpIDIwMTcgUmljaGV2ZSBTaW9kaW5hIEJlYmVkb3JcclxuXHRcdEBlbWFpbDogcmljaGV2ZS5iZWJlZG9yQGdtYWlsLmNvbVxyXG5cclxuXHRcdFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcclxuXHRcdG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcclxuXHRcdGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcclxuXHRcdHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcclxuXHRcdGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xyXG5cdFx0ZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcclxuXHJcblx0XHRUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcclxuXHRcdGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXHJcblxyXG5cdFx0VEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxyXG5cdFx0SU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXHJcblx0XHRGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTiBOTyBFVkVOVCBTSEFMTCBUSEVcclxuXHRcdEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcclxuXHRcdExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXHJcblx0XHRPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEUgVVNFIE9SIE9USEVSIERFQUxJTkdTIElOIFRIRVxyXG5cdFx0U09GVFdBUkUuXHJcblx0QGVuZC10ZXN0LWxpY2Vuc2VcclxuXHJcblx0QHRlc3QtY29uZmlndXJhdGlvbjpcclxuXHRcdHtcclxuXHRcdFx0XCJwYWNrYWdlXCI6IFwiYXN5dW1cIixcclxuXHRcdFx0XCJwYXRoXCI6IFwiYXN5dW0vdGVzdC5tb2R1bGUuanNcIixcclxuXHRcdFx0XCJmaWxlXCI6IFwidGVzdC5tb2R1bGUuanNcIixcclxuXHRcdFx0XCJtb2R1bGVcIjogXCJ0ZXN0XCIsXHJcblx0XHRcdFwiYXV0aG9yXCI6IFwiUmljaGV2ZSBTLiBCZWJlZG9yXCIsXHJcblx0XHRcdFwiZU1haWxcIjogXCJyaWNoZXZlLmJlYmVkb3JAZ21haWwuY29tXCIsXHJcblx0XHRcdFwiY29udHJpYnV0b3JzXCI6IFtcclxuXHRcdFx0XHRcIkpvaG4gTGVub24gTWFnaGFub3kgPGpvaG5sZW5vbm1hZ2hhbm95QGdtYWlsLmNvbT5cIixcclxuXHRcdFx0XHRcIlZpbnNlIFZpbmFsb24gPHZpbnNldmluYWxvbkBnbWFpbC5jb20+XCJcclxuXHRcdFx0XSxcclxuXHRcdFx0XCJyZXBvc2l0b3J5XCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3ZvbGtvdmFzeXN0ZW1zL2FzeXVtLmdpdFwiXHJcblx0XHR9XHJcblx0QGVuZC10ZXN0LWNvbmZpZ3VyYXRpb25cclxuXHJcblx0QHRlc3QtZG9jdW1lbnRhdGlvbjpcclxuXHJcblx0QGVuZC10ZXN0LWRvY3VtZW50YXRpb25cclxuXHJcblx0QGluY2x1ZGU6XHJcblx0XHR7XHJcblx0XHRcdFwiYXNzZXJ0XCI6IFwic2hvdWxkXCIsXHJcblx0XHRcdFwiYXN5dW1cIjogXCJhc3l1bVwiXHJcblx0XHR9XHJcblx0QGVuZC1pbmNsdWRlXHJcbiovXHJcblxyXG5jb25zdCBhc3NlcnQgPSByZXF1aXJlKCBcInNob3VsZFwiICk7XHJcblxyXG5cclxuXHJcblxyXG5cclxuLy86IEBicmlkZ2U6XHJcbmNvbnN0IHBhdGggPSByZXF1aXJlKCBcInBhdGhcIiApO1xyXG4vLzogQGVuZC1icmlkZ2VcclxuXHJcbi8vOiBAYnJpZGdlOlxyXG5cclxuZGVzY3JpYmUoIFwiYXN5dW1cIiwgKCApID0+IHtcclxuXHJcblx0bGV0IGJyaWRnZVVSTCA9IGBmaWxlOi8vJHsgcGF0aC5yZXNvbHZlKCBfX2Rpcm5hbWUsIFwiYnJpZGdlLmh0bWxcIiApIH1gO1xyXG5cclxuXHRkZXNjcmliZSggXCJgYXN5dW0oIHsgfSwgZnVuY3Rpb24gdGVzdCggKXsgcmV0dXJuICd0ZXN0JzsgfSApLnRlc3QoIClgXCIsICggKSA9PiB7XHJcblx0XHRpdCggXCJzaG91bGQgYmUgZXF1YWwgdG8gJ3Rlc3QnXCIsICggKSA9PiB7XHJcblxyXG5cdFx0XHRsZXQgcmVzdWx0ID0gYnJvd3Nlci51cmwoIGJyaWRnZVVSTCApLmV4ZWN1dGUoXHJcblxyXG5cdFx0XHRcdGZ1bmN0aW9uKCApe1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiBhc3l1bSggeyB9LCBmdW5jdGlvbiB0ZXN0KCApeyByZXR1cm4gXCJ0ZXN0XCI7IH0gKS50ZXN0KCApO1xyXG5cclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHQpLnZhbHVlO1xyXG5cclxuXHRcdFx0YXNzZXJ0LmVxdWFsKCByZXN1bHQsIFwidGVzdFwiICk7XHJcblxyXG5cdFx0fSApO1xyXG5cdH0gKTtcclxuXHJcblx0ZGVzY3JpYmUoIFwiYGFzeXVtKCB0ZXN0QSwgQ2xhc3NBLCBmdW5jdGlvbiBtZXRob2QoICl7IHJldHVybiAnd29ybGQnOyB9ICkubWV0aG9kKCApYFwiLCAoICkgPT4ge1xyXG5cdFx0aXQoIFwic2hvdWxkIGJlIGVxdWFsIHRvICdoZWxsbydcIiwgKCApID0+IHtcclxuXHRcdFx0Ly86IEBpZ25vcmU6XG4vKlxyXG5cdFx0XHRsZXQgcmVzdWx0ID0gYnJvd3Nlci51cmwoIGJyaWRnZVVSTCApLmV4ZWN1dGUoXHJcblxyXG5cdFx0XHRcdGZ1bmN0aW9uKCApe1xyXG5cdFx0XHRcdFx0Y2xhc3MgQ2xhc3NBe1xyXG5cdFx0XHRcdFx0XHRjb25zdHJ1Y3RvciggKXsgfVxyXG5cdFx0XHRcdFx0XHRtZXRob2QoICl7IHJldHVybiBcImhlbGxvXCI7IH1cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRsZXQgdGVzdEEgPSBuZXcgQ2xhc3NBKCApO1xyXG5cclxuXHRcdFx0XHRcdHJldHVybiBhc3l1bSggdGVzdEEsIENsYXNzQSwgZnVuY3Rpb24gbWV0aG9kKCApeyByZXR1cm4gXCJ3b3JsZFwiOyB9ICkubWV0aG9kKCApO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdCkudmFsdWU7XHJcblx0XHRcdCovXG4vLzogQGVuZC1pZ25vcmVcclxuXHRcdFx0YXNzZXJ0LmVxdWFsKCByZXN1bHQsIFwiaGVsbG9cIiApO1xyXG5cclxuXHRcdH0gKTtcclxuXHR9ICk7XHJcblxyXG5cdGRlc2NyaWJlKCBcImBhc3l1bSggdGVzdEEsIENsYXNzQSwgZnVuY3Rpb24gbWV0aG9kQiggKXsgcmV0dXJuICd3b3JsZCc7IH0gKS5tZXRob2RCKCApYFwiLCAoICkgPT4ge1xyXG5cdFx0aXQoIFwic2hvdWxkIGJlIGVxdWFsIHRvICd3b3JsZCdcIiwgKCApID0+IHtcclxuXHRcdFx0Ly86IEBpZ25vcmU6XG4vKlxyXG5cdFx0XHRsZXQgcmVzdWx0ID0gYnJvd3Nlci51cmwoIGJyaWRnZVVSTCApLmV4ZWN1dGUoXHJcblxyXG5cdFx0XHRcdGZ1bmN0aW9uKCApe1xyXG5cdFx0XHRcdFx0Y2xhc3MgQ2xhc3NBe1xyXG5cdFx0XHRcdFx0XHRjb25zdHJ1Y3RvciggKXsgfVxyXG5cdFx0XHRcdFx0XHRtZXRob2QoICl7IHJldHVybiBcImhlbGxvXCI7IH1cclxuXHRcdFx0XHRcdH1cclxuXHJcblx0XHRcdFx0XHRsZXQgdGVzdEEgPSBuZXcgQ2xhc3NBKCApO1xyXG5cdFx0XHRcdFx0cmV0dXJuIGFzeXVtKCB0ZXN0QSwgQ2xhc3NBLCBmdW5jdGlvbiBtZXRob2RCKCApeyByZXR1cm4gXCJ3b3JsZFwiOyB9ICkubWV0aG9kQiggKTtcclxuXHRcdFx0XHR9XHJcblxyXG5cdFx0XHQpLnZhbHVlO1xyXG5cdFx0XHQqL1xuLy86IEBlbmQtaWdub3JlXHJcblx0XHRcdGFzc2VydC5lcXVhbCggcmVzdWx0LCBcIndvcmxkXCIgKTtcclxuXHJcblx0XHR9ICk7XHJcblx0fSApO1xyXG5cclxuXHRkZXNjcmliZSggXCJgQXN5dW0gd2l0aCBjb250ZXh0IGFuZCB3cmFwYFwiLCAoICkgPT4ge1xyXG5cdFx0aXQoIFwic2hvdWxkIGJlIGVxdWFsIHRvICd5ZWFoJ1wiLCAoICkgPT4ge1xyXG5cclxuXHRcdFx0bGV0IHJlc3VsdCA9IGJyb3dzZXIudXJsKCBicmlkZ2VVUkwgKS5leGVjdXRlKFxyXG5cclxuXHRcdFx0XHRmdW5jdGlvbiggKXtcclxuXHRcdFx0XHRcdHJldHVybiBhc3l1bSggeyBcInRlc3RcIjogZnVuY3Rpb24gdGVzdCggKXsgcmV0dXJuIFwieWVhaFwiOyB9IH0sXHJcblx0XHRcdFx0XHRmdW5jdGlvbiB0ZXN0KCApeyByZXR1cm4gXCJ0ZXN0XCI7IH0gKS50ZXN0KCApO1xyXG5cdFx0XHRcdH1cclxuXHJcblx0XHRcdCkudmFsdWU7XHJcblxyXG5cdFx0XHRhc3NlcnQuZXF1YWwoIHJlc3VsdCwgXCJ5ZWFoXCIgKTtcclxuXHJcblx0XHR9ICk7XHJcblx0fSApO1xyXG5cclxufSApO1xyXG5cclxuLy86IEBlbmQtYnJpZGdlXHJcbiJdfQ==
//# sourceMappingURL=test.bridge.js.map
