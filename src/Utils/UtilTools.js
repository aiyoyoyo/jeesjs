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
		};
		return function(_n, _m) {
			return Math.ceil(r() * _n) + (_m ? _m : 0);
		};
	})();
	/**
	 * 随机生成颜色码
	 * 
	 * @method RandomColor
	 * @static
	 * @return {String} #000000
	 */
	UtilTools.RandomColor = (function() {
		function rc2hex(){
			var c = this.Random(256);
			if( c < 10 ) return "0" + c;
		    return c.toString(16);
		};
		return function(){
			return "#" + rc2hex() + rc2hex() + rc2hex();
		};
	})();
	/**
	 * 生成反色码
	 * 
	 * @method ReversalColor
	 * @param {String}
	 *            #000000
	 * @static
	 * @return {String} #ffffff
	 */
	UtilTools.OppositeColor = (function() {
		function c2rgb( _c ){
			var _r = parseInt( _c.substring( 1, 3 ), 16);
			var _g = parseInt( _c.substring( 3, 5 ), 16);
			var _b = parseInt( _c.substring( 5 ), 16);
			return { r: _r, g: _g, b: _b };
		};
		function c2hex( _c ){
		    var cc = 255 - _c;
		    if( cc>64 && cc<128 )  
		        cc -= 64;  
		    else if( cc>=128 && cc<192 )  
		        cc += 64;
		    if( cc < 10 ) return "0" + cc;
		    return cc.toString(16);
		};
		return function( _c ) {
			var rgb = c2rgb( _c );
			var r = c2hex( rgb.r );
			var g = c2hex( rgb.g );
			var b = c2hex( rgb.b );
			return "#" + r + g + b;
		}
	})();
	
	jeesjs.UT = UtilTools;
})();