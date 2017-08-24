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

	describe("`asyum with instance of class named 'ClassA' as context, class named ClassA as wrap, function method( ){ return 'world' } as delegate`", function () {
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

	describe("`asyum with instance of class named 'ClassA' as context, class named ClassA as wrap, function methodB( ){ return 'world' } as delegate`", function () {
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

	describe("`asyum with { 'test': function test( ){ return 'yeah'; } } as context and function test( ){ return 'test' } as wrap`", function () {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QuYnJpZGdlLmpzIl0sIm5hbWVzIjpbImFzc2VydCIsInJlcXVpcmUiLCJwYXRoIiwiZGVzY3JpYmUiLCJicmlkZ2VVUkwiLCJyZXNvbHZlIiwiX19kaXJuYW1lIiwiaXQiLCJyZXN1bHQiLCJicm93c2VyIiwidXJsIiwiZXhlY3V0ZSIsImFzeXVtIiwidGVzdCIsInZhbHVlIiwiZXF1YWwiXSwibWFwcGluZ3MiOiJBQUFBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdURBLElBQU1BLFNBQVNDLFFBQVMsUUFBVCxDQUFmOzs7Ozs7QUFNQTtBQUNBLElBQU1DLE9BQU9ELFFBQVMsTUFBVCxDQUFiO0FBQ0E7Ozs7Ozs7OztBQVNBOztBQUVBRSxTQUFVLE9BQVYsRUFBbUIsWUFBTzs7QUFFekIsS0FBSUMsd0JBQXVCRixLQUFLRyxPQUFMLENBQWNDLFNBQWQsRUFBeUIsYUFBekIsQ0FBM0I7O0FBRUFILFVBQVUsNERBQVYsRUFBd0UsWUFBTztBQUM5RUksS0FBSSwyQkFBSixFQUFpQyxZQUFPOztBQUV2QyxPQUFJQyxTQUFTQyxRQUFRQyxHQUFSLENBQWFOLFNBQWIsRUFBeUJPLE9BQXpCOztBQUVaLGVBQVc7O0FBRVYsV0FBT0MsTUFBTyxFQUFQLEVBQVksU0FBU0MsSUFBVCxHQUFnQixDQUFFLE9BQU8sTUFBUCxDQUFnQixDQUE5QyxFQUFpREEsSUFBakQsRUFBUDs7QUFFQSxJQU5XOztBQVFYQyxRQVJGOztBQVVBZCxVQUFPZSxLQUFQLENBQWNQLE1BQWQsRUFBc0IsTUFBdEI7O0FBRUEsR0FkRDtBQWVBLEVBaEJEOztBQWtCQUwsVUFBVSx3SUFBVixFQUFvSixZQUFPO0FBQzFKSSxLQUFJLDRCQUFKLEVBQWtDLFlBQU87QUFDeEM7QUFDSDs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQTtBQUNHUCxVQUFPZSxLQUFQLENBQWNQLE1BQWQsRUFBc0IsT0FBdEI7O0FBRUEsR0FyQkQ7QUFzQkEsRUF2QkQ7O0FBeUJBTCxVQUFVLHlJQUFWLEVBQXFKLFlBQU87QUFDM0pJLEtBQUksNEJBQUosRUFBa0MsWUFBTztBQUN4QztBQUNIOzs7Ozs7Ozs7Ozs7Ozs7QUFlQTtBQUNHUCxVQUFPZSxLQUFQLENBQWNQLE1BQWQsRUFBc0IsT0FBdEI7O0FBRUEsR0FwQkQ7QUFxQkEsRUF0QkQ7O0FBd0JBTCxVQUFVLHNIQUFWLEVBQWtJLFlBQU87QUFDeElJLEtBQUksMkJBQUosRUFBaUMsWUFBTzs7QUFFdkMsT0FBSUMsU0FBU0MsUUFBUUMsR0FBUixDQUFhTixTQUFiLEVBQXlCTyxPQUF6Qjs7QUFFWixlQUFXO0FBQ1YsV0FBT0MsTUFBTyxFQUFFLFFBQVEsU0FBU0MsSUFBVCxHQUFnQixDQUFFLE9BQU8sTUFBUCxDQUFnQixDQUE1QyxFQUFQO0FBQ04sYUFBU0EsSUFBVCxHQUFnQixDQUFFLE9BQU8sTUFBUCxDQUFnQixDQUQ1QixFQUMrQkEsSUFEL0IsRUFBUDtBQUVBLElBTFc7O0FBT1hDLFFBUEY7O0FBU0FkLFVBQU9lLEtBQVAsQ0FBY1AsTUFBZCxFQUFzQixNQUF0Qjs7QUFFQSxHQWJEO0FBY0EsRUFmRDs7QUFpQkEsQ0F4RkQ7O0FBMEZBIiwiZmlsZSI6InRlc3QuYnJpZGdlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qO1xuXHRAdGVzdC1saWNlbnNlOlxuXHRcdFRoZSBNSVQgTGljZW5zZSAoTUlUKVxuXHRcdEBtaXQtbGljZW5zZVxuXG5cdFx0Q29weXJpZ2h0IChAYykgMjAxNyBSaWNoZXZlIFNpb2RpbmEgQmViZWRvclxuXHRcdEBlbWFpbDogcmljaGV2ZS5iZWJlZG9yQGdtYWlsLmNvbVxuXG5cdFx0UGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuXHRcdG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcblx0XHRpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzXG5cdFx0dG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuXHRcdGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuXHRcdGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0byB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnM6XG5cblx0XHRUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpbiBhbGxcblx0XHRjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG5cdFx0VEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTUyBPUlxuXHRcdElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuXHRcdEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuXHRcdEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sIERBTUFHRVMgT1IgT1RIRVJcblx0XHRMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuXHRcdE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFXG5cdFx0U09GVFdBUkUuXG5cdEBlbmQtdGVzdC1saWNlbnNlXG5cblx0QHRlc3QtY29uZmlndXJhdGlvbjpcblx0XHR7XG5cdFx0XHRcInBhY2thZ2VcIjogXCJhc3l1bVwiLFxuXHRcdFx0XCJwYXRoXCI6IFwiYXN5dW0vdGVzdC5tb2R1bGUuanNcIixcblx0XHRcdFwiZmlsZVwiOiBcInRlc3QubW9kdWxlLmpzXCIsXG5cdFx0XHRcIm1vZHVsZVwiOiBcInRlc3RcIixcblx0XHRcdFwiYXV0aG9yXCI6IFwiUmljaGV2ZSBTLiBCZWJlZG9yXCIsXG5cdFx0XHRcImVNYWlsXCI6IFwicmljaGV2ZS5iZWJlZG9yQGdtYWlsLmNvbVwiLFxuXHRcdFx0XCJjb250cmlidXRvcnNcIjogW1xuXHRcdFx0XHRcIkpvaG4gTGVub24gTWFnaGFub3kgPGpvaG5sZW5vbm1hZ2hhbm95QGdtYWlsLmNvbT5cIixcblx0XHRcdFx0XCJWaW5zZSBWaW5hbG9uIDx2aW5zZXZpbmFsb25AZ21haWwuY29tPlwiXG5cdFx0XHRdLFxuXHRcdFx0XCJyZXBvc2l0b3J5XCI6IFwiaHR0cHM6Ly9naXRodWIuY29tL3ZvbGtvdmFzeXN0ZW1zL2FzeXVtLmdpdFwiXG5cdFx0fVxuXHRAZW5kLXRlc3QtY29uZmlndXJhdGlvblxuXG5cdEB0ZXN0LWRvY3VtZW50YXRpb246XG5cblx0QGVuZC10ZXN0LWRvY3VtZW50YXRpb25cblxuXHRAaW5jbHVkZTpcblx0XHR7XG5cdFx0XHRcImFzc2VydFwiOiBcInNob3VsZFwiLFxuXHRcdFx0XCJhc3l1bVwiOiBcImFzeXVtXCJcblx0XHR9XG5cdEBlbmQtaW5jbHVkZVxuKi9cblxuY29uc3QgYXNzZXJ0ID0gcmVxdWlyZSggXCJzaG91bGRcIiApO1xuXG5cblxuXG5cbi8vOiBAYnJpZGdlOlxuY29uc3QgcGF0aCA9IHJlcXVpcmUoIFwicGF0aFwiICk7XG4vLzogQGVuZC1icmlkZ2VcblxuXG5cblxuXG5cblxuXG4vLzogQGJyaWRnZTpcblxuZGVzY3JpYmUoIFwiYXN5dW1cIiwgKCApID0+IHtcblxuXHRsZXQgYnJpZGdlVVJMID0gYGZpbGU6Ly8keyBwYXRoLnJlc29sdmUoIF9fZGlybmFtZSwgXCJicmlkZ2UuaHRtbFwiICkgfWA7XG5cblx0ZGVzY3JpYmUoIFwiYGFzeXVtKCB7IH0sIGZ1bmN0aW9uIHRlc3QoICl7IHJldHVybiAndGVzdCc7IH0gKS50ZXN0KCApYFwiLCAoICkgPT4ge1xuXHRcdGl0KCBcInNob3VsZCBiZSBlcXVhbCB0byAndGVzdCdcIiwgKCApID0+IHtcblxuXHRcdFx0bGV0IHJlc3VsdCA9IGJyb3dzZXIudXJsKCBicmlkZ2VVUkwgKS5leGVjdXRlKFxuXG5cdFx0XHRcdGZ1bmN0aW9uKCApe1xuXG5cdFx0XHRcdFx0cmV0dXJuIGFzeXVtKCB7IH0sIGZ1bmN0aW9uIHRlc3QoICl7IHJldHVybiBcInRlc3RcIjsgfSApLnRlc3QoICk7XG5cblx0XHRcdFx0fVxuXG5cdFx0XHQpLnZhbHVlO1xuXG5cdFx0XHRhc3NlcnQuZXF1YWwoIHJlc3VsdCwgXCJ0ZXN0XCIgKTtcblxuXHRcdH0gKTtcblx0fSApO1xuXG5cdGRlc2NyaWJlKCBcImBhc3l1bSB3aXRoIGluc3RhbmNlIG9mIGNsYXNzIG5hbWVkICdDbGFzc0EnIGFzIGNvbnRleHQsIGNsYXNzIG5hbWVkIENsYXNzQSBhcyB3cmFwLCBmdW5jdGlvbiBtZXRob2QoICl7IHJldHVybiAnd29ybGQnIH0gYXMgZGVsZWdhdGVgXCIsICggKSA9PiB7XG5cdFx0aXQoIFwic2hvdWxkIGJlIGVxdWFsIHRvICdoZWxsbydcIiwgKCApID0+IHtcblx0XHRcdC8vOiBAaWdub3JlOlxuLypcblx0XHRcdGxldCByZXN1bHQgPSBicm93c2VyLnVybCggYnJpZGdlVVJMICkuZXhlY3V0ZShcblxuXHRcdFx0XHRmdW5jdGlvbiggKXtcblx0XHRcdFx0XHRjbGFzcyBDbGFzc0F7XG5cdFx0XHRcdFx0XHRjb25zdHJ1Y3RvciggKXsgfVxuXHRcdFx0XHRcdFx0bWV0aG9kKCApeyByZXR1cm4gXCJoZWxsb1wiOyB9XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0bGV0IHRlc3RBID0gbmV3IENsYXNzQSggKTtcblxuXHRcdFx0XHRcdHJldHVybiBhc3l1bSggdGVzdEEsIENsYXNzQSwgZnVuY3Rpb24gbWV0aG9kKCApeyByZXR1cm4gXCJ3b3JsZFwiOyB9ICkubWV0aG9kKCApO1xuXHRcdFx0XHR9XG5cblx0XHRcdCkudmFsdWU7XG5cdFx0XHQqL1xuLy86IEBlbmQtaWdub3JlXG5cdFx0XHRhc3NlcnQuZXF1YWwoIHJlc3VsdCwgXCJoZWxsb1wiICk7XG5cblx0XHR9ICk7XG5cdH0gKTtcblxuXHRkZXNjcmliZSggXCJgYXN5dW0gd2l0aCBpbnN0YW5jZSBvZiBjbGFzcyBuYW1lZCAnQ2xhc3NBJyBhcyBjb250ZXh0LCBjbGFzcyBuYW1lZCBDbGFzc0EgYXMgd3JhcCwgZnVuY3Rpb24gbWV0aG9kQiggKXsgcmV0dXJuICd3b3JsZCcgfSBhcyBkZWxlZ2F0ZWBcIiwgKCApID0+IHtcblx0XHRpdCggXCJzaG91bGQgYmUgZXF1YWwgdG8gJ3dvcmxkJ1wiLCAoICkgPT4ge1xuXHRcdFx0Ly86IEBpZ25vcmU6XG4vKlxuXHRcdFx0bGV0IHJlc3VsdCA9IGJyb3dzZXIudXJsKCBicmlkZ2VVUkwgKS5leGVjdXRlKFxuXG5cdFx0XHRcdGZ1bmN0aW9uKCApe1xuXHRcdFx0XHRcdGNsYXNzIENsYXNzQXtcblx0XHRcdFx0XHRcdGNvbnN0cnVjdG9yKCApeyB9XG5cdFx0XHRcdFx0XHRtZXRob2QoICl7IHJldHVybiBcImhlbGxvXCI7IH1cblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRsZXQgdGVzdEEgPSBuZXcgQ2xhc3NBKCApO1xuXHRcdFx0XHRcdHJldHVybiBhc3l1bSggdGVzdEEsIENsYXNzQSwgZnVuY3Rpb24gbWV0aG9kQiggKXsgcmV0dXJuIFwid29ybGRcIjsgfSApLm1ldGhvZEIoICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0KS52YWx1ZTtcblx0XHRcdCovXG4vLzogQGVuZC1pZ25vcmVcblx0XHRcdGFzc2VydC5lcXVhbCggcmVzdWx0LCBcIndvcmxkXCIgKTtcblxuXHRcdH0gKTtcblx0fSApO1xuXG5cdGRlc2NyaWJlKCBcImBhc3l1bSB3aXRoIHsgJ3Rlc3QnOiBmdW5jdGlvbiB0ZXN0KCApeyByZXR1cm4gJ3llYWgnOyB9IH0gYXMgY29udGV4dCBhbmQgZnVuY3Rpb24gdGVzdCggKXsgcmV0dXJuICd0ZXN0JyB9IGFzIHdyYXBgXCIsICggKSA9PiB7XG5cdFx0aXQoIFwic2hvdWxkIGJlIGVxdWFsIHRvICd5ZWFoJ1wiLCAoICkgPT4ge1xuXG5cdFx0XHRsZXQgcmVzdWx0ID0gYnJvd3Nlci51cmwoIGJyaWRnZVVSTCApLmV4ZWN1dGUoXG5cblx0XHRcdFx0ZnVuY3Rpb24oICl7XG5cdFx0XHRcdFx0cmV0dXJuIGFzeXVtKCB7IFwidGVzdFwiOiBmdW5jdGlvbiB0ZXN0KCApeyByZXR1cm4gXCJ5ZWFoXCI7IH0gfSxcblx0XHRcdFx0XHRcdGZ1bmN0aW9uIHRlc3QoICl7IHJldHVybiBcInRlc3RcIjsgfSApLnRlc3QoICk7XG5cdFx0XHRcdH1cblxuXHRcdFx0KS52YWx1ZTtcblxuXHRcdFx0YXNzZXJ0LmVxdWFsKCByZXN1bHQsIFwieWVhaFwiICk7XG5cblx0XHR9ICk7XG5cdH0gKTtcblxufSApO1xuXG4vLzogQGVuZC1icmlkZ2VcbiJdfQ==
//# sourceMappingURL=test.bridge.js.map
