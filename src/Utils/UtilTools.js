/*
 * Author: Aiyoyoyo
 * https://www.jeesupport.com/assets/jeesjs/src/Tools/UtilTools.js
 * License: MIT license
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
    function UtilTools(){ throw "UtilTools cannot be instantiated."; };
// private static properties:
// public static methods:  
        /**
	 * 伪随机数生成器/线性同余生成器
	 * @param {Number} _n 生成1-_n之间的随机数
	 * @return {Number} 
	 */
	UtilTools.Random = ( function(){
		var seed = new Date().getTime();
		function r(){
		    seed = ( seed * 9301 + 49297 ) % 233280;
		    return seed / 233280.0;
		}
		return function( _n ){
		    return Math.ceil( r() * _n );
		}
	})();
	/**
	 * 随机生成颜色码
	 * @return {String} #000000
	 */
	UtilTools.RandomColor = function(){
		var r = this.Random( 256 ).toString( 16 );
		var g = this.Random( 256 ).toString( 16 );
		var b = this.Random( 256 ).toString( 16 );
		return "#" + r + g + b;
	};
	
	jeesjs.UT = UtilTools;
})();