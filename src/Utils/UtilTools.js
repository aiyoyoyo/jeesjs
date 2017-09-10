/*
 * Author: Aiyoyoyo
 * https://www.jeesupport.com/assets/jeesjs/src/Tools/UtilTools.js License: MIT
 * license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jeesjs = this.jeesjs || {};

(function() {
	"use strict";
	// constructor:
	/**
	 * @class UtilTools
	 */
	function UtilTools() {
		throw "UtilTools cannot be instantiated.";
	};
	// private static properties:
	// public static methods:
	/**
	 * 伪随机数生成器/线性同余生成器
	 * 
	 * @method Random
	 * @param {Number}
	 *            _n 生成1~_n之间的随机数
	 * @param {Number}
	 *            _m 生成_m~-n之间的随机数
	 * @static
	 * @return {Number}
	 */
	UtilTools.Random = (function() {
		var seed = new Date().getTime();
		function r() {
			seed = (seed * 9301 + 49297) % 233280;
			return seed / 233280.0;
		}
		return function(_n, _m) {
			return Math.ceil(r() * _n) + (_m ? _m : 0);
		}
	})();
	/**
	 * 随机生成颜色码
	 * 
	 * @method RandomColor
	 * @static
	 * @return {String} #000000
	 */
	UtilTools.RandomColor = function() {
		var r = this.Random(256).toString(16);
		var g = this.Random(256).toString(16);
		var b = this.Random(256).toString(16);
		return "#" + r + g + b;
	};
	/**
	 * 生成反色码
	 * 
	 * @method ReversalColor
	 * @param {String}
	 *            #000000
	 * @static
	 * @return {String} #ffffff
	 */
	UtilTools.ReversalColor = function(_c) {
		var sixNumReg = /^#(\d{2})(\d{2})(\d{2})$/ig;
		var threeNumReg = /^#(\d{1})(\d{1})(\d{1})$/ig;
		var rgbReg = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/ig;
		var c1 = 0, c2 = 0, c3 = 0;
		var parseHexToInt = function(hex) {
			return parseInt(hex, 16);
		};
		var parseIntToHex = function(int) {
			return int.toString(16);
		};
		this.parse = function() {
			if (sixNumReg.test(_c)) {
				sixNumReg.exec(_c);
				c1 = parseHexToInt(RegExp.$1);
				c2 = parseHexToInt(RegExp.$2);
				c3 = parseHexToInt(RegExp.$3);
			} else if (threeNumReg.test(_c)) {
				threeNumReg.exec(_c);
				c1 = parseHexToInt(RegExp.$1 + RegExp.$1);
				c2 = parseHexToInt(RegExp.$2 + RegExp.$2);
				c3 = parseHexToInt(RegExp.$3 + RegExp.$3);
			} else if (rgbReg.test(_c)) {
				// rgb color 直接就是十进制，不用转换
				rgbReg.exec(_c);
				c1 = RegExp.$1;
				c2 = RegExp.$2;
				c3 = RegExp.$3;
			} else {
				throw new Error("Error color string format. eg.[rgb(0,0,0),#000000,#f00]");
			}
			c1 = parseIntToHex(255 - c1);
			c2 = parseIntToHex(255 - c2);
			c3 = parseIntToHex(255 - c3);
			return '#' + (c1 < 10 ? '0' + c1 : c1) + (c2 < 10 ? '0' + c2 : c2)
					+ (c3 < 10 ? '0' + c3 : c3);
		};
	}
	jeesjs.UT = UtilTools;
})();