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
              			"package": "fluctuate",
              			"path": "fluctuate/fluctuate.js",
              			"file": "fluctuate.js",
              			"module": "fluctuate",
              			"author": "Richeve S. Bebedor",
              			"eMail": "richeve.bebedor@gmail.com",
              			"contributors": [
              				"John Lenon Maghanoy <johnlenonmaghanoy@gmail.com>",
              				"Vinse Vinalon <vinsevinalon@gmail.com>"
              			],
              			"repository": "https://github.com/volkovasystems/fluctuate.git",
              			"test": "fluctuate-test.js",
              			"global": true
              		}
              	@end-module-configuration
              
              	@module-documentation:
              		Transform shallow object to deep object.
              	@end-module-documentation
              
              	@include:
              		{
              			"falzy": "falzy",
              			"harden": "harden",
              			"kount": "kount",
              			"numric": "numric",
              			"U200b": "u200b",
              			"truly": "truly"
              		}
              	@end-include
              */var _keys = require("babel-runtime/core-js/object/keys");var _keys2 = _interopRequireDefault(_keys);var _typeof2 = require("babel-runtime/helpers/typeof");var _typeof3 = _interopRequireDefault(_typeof2);var _for = require("babel-runtime/core-js/symbol/for");var _for2 = _interopRequireDefault(_for);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}

var falzy = require("falzy");
var harden = require("harden");
var kount = require("kount");
var numric = require("numric");
var U200b = require("u200b");
var truly = require("truly");

var ACCUMULATOR_PATTERN = /\.{3}/;
var FORMAT = (0, _for2.default)("format");
var LOOSENED = "loosened";
var REFERENCE_PATTERN = /^\./;

harden("ARRAY_FORMAT", "array-format");
harden("OBJECT_FORMAT", "object-format");

var fluctuate = function fluctuate(entity) {
	/*;
                                            	@meta-configuration:
                                            		{
                                            			"entity:required": [
                                            				"object",
                                            				Array
                                            			]
                                            		}
                                            	@end-meta-configuration
                                            */

	if (falzy(entity) || (typeof entity === "undefined" ? "undefined" : (0, _typeof3.default)(entity)) != "object") {
		throw new Error("invalid entity");
	}

	if (entity.LOOSENED !== LOOSENED) {
		return entity;
	}

	if (kount(entity) == 0) {
		return entity;
	}

	var key = (0, _keys2.default)(entity);

	/*;
                                        	@note:
                                        		By default we will assume this is an object.
                                        	@end-note
                                        */
	var container = {};

	/*;
                     	@note:
                     		Check the first key, this will change the container.
                     	@end-note
                     */
	if (entity[FORMAT] === ARRAY_FORMAT || numric(U200b(key[0]).separate()[0])) {
		container = [];
	}

	if (entity[FORMAT] === OBJECT_FORMAT) {
		container = {};
	}

	key.
	filter(function (key) {return !ACCUMULATOR_PATTERN.test(key);}).
	filter(function (key) {
		var value = entity[key];

		return falzy(value) || (typeof value === "undefined" ? "undefined" : (0, _typeof3.default)(value)) != "object";
	}).
	forEach(function (key) {
		var value = entity[key];
		var chain = U200b(key).separate().
		map(function (property) {return property.replace(REFERENCE_PATTERN, "");});
		var length = chain.length;

		if (length == 1) {
			if (numric(key)) {
				container[parseInt(key)] = value;

			} else {
				container[key] = value;
			}

			return;
		}

		var data = container;

		chain.forEach(function (property, index) {
			var nextIndex = index + 1;

			if (nextIndex == length) {
				data[property] = value;

				return;
			}

			if (numric(property)) {
				property = parseInt(property);

				if (truly(data[property])) {
					data = data[property];

					return;
				}

				if (nextIndex < length && numric(chain[nextIndex])) {
					data = data[property] = [];

				} else if (numric(property) && nextIndex < length) {
					data = data[property] = {};
				}

				return;
			}

			if (truly(data[property])) {
				data = data[property];

			} else if (nextIndex < length && numric(chain[nextIndex])) {
				data = data[property] = [];

			} else if (nextIndex < length) {
				data = data[property] = {};
			}
		});
	});

	return container;
};

module.exports = fluctuate;

//# sourceMappingURL=fluctuate.support.js.map