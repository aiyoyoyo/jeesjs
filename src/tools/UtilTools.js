/*
 * Author: Aiyoyoyo
 * https://www.jeesupport.com/assets/jeesjs/src/Tools/UtilTools.js License: MIT
 * license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
	// constructor:
	/**
	 * @class UtilTools
	 */
	function UtilTools() {
		throw "UtilTools cannot be instantiated.";
	};
// public static methods: =====================================================
	/**
	 * 伪随机数生成器/线性同余生成器
	 * 
	 * @static
	 * @method Random
	 * @param {Integer} _n 生成1~_n之间的随机数
	 * @param {Integer} _m 生成_m~-n之间的随机数
	 * @return {Integer}
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
	 * @static
	 * @method RandomColor
	 * @return {String} #000000
	 */
	UtilTools.RandomColor = (function() {
		function rc2hex(){
			var c = jeesjs.UT.Random(256);
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
	 * @static
	 * @method ReversalColor
	 * @param {String} _c #000000
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
	/**
	 * @method Grid
	 * @param {Object} _r 分割区域{ l: left, r: right, t: top, b: bottom }
	 * @param {Integer} _w 素材宽
	 * @param {Integer} _h 素材高
	 * @param {Integer} _sw 目标宽
	 * @param {Integer} _sh 目标高
	 * @return {Integer,Integer,Integer,Integer,Integer,Integer,Integer,Integer,Integer,Integer,}
	 * {
	 * 	x,y,w,h,  		素材区域坐标
	 *  dx,dy,dw,dh, 	实际绘制坐标 
	 *  sw,sh 			缩放宽高
	 * }
	 */
	UtilTools.Grid = (function(){
		function Region( _r, _row, _col, _w, _h ){
			var w;
	    	var h;
	    	var x;
	    	var y;
			if( _row == 1 ) {
	    		h = [_h];
	    		y = [0];
	    	}else if( _row == 2 ){
	    		if( _r.t != 0 ){
	    			h = [_r.t, _h - _r.t];
	    			y = [0, _r.t];
	    		}else{
	    			h = [_h - _r.b, _r.b];
	    			y = [0, _h - _r.b];
	    		}
	    	}else{
	    		h = [_r.t, _h - _r.t - _r.b, _r.b];
	    		y = [0, _r.t, _h - _r.b];
	    	}
	    	
	    	if( _col == 1 ){
	    		w = [_w];
	    		x = [0];
	    	}else if( _col == 2 ){
	    		if( _r.l != 0 ) { 
	    			w = [_r.l, _w - _r.l];
	    			x = [0, _r.l];
	    		}else{
	    			w = [_w - _r.r, _r.r];
	    			x = [0, _w - _r.r];
	    		}
	    	}else{
	    		w = [_r.l, _w - _r.l - _r.r, _r.r];
	    		x = [0, _r.l, _w - _r.r];
	    	}
			
			return {x:x,y:y,w:w,h:h};
		}
		
		return function( _r, _w, _h, _tw, _th ){
			var regions = new Array();
			var row = 1; // row
			var col = 1; // colum
			
			if( _r.l != 0 ) col ++;
			if( _r.r != 0 ) col ++;
			if( _r.t != 0 ) row ++;
			if( _r.b != 0 ) row ++;
			
	    	// 计算分割
	    	var w;
	    	var h;
	    	var x;
	    	var y;
	    	var sw;
	    	var sh;
	    	// rect 分割区域 draw绘制区域
	    	var rect = Region( _r, row, col, _w, _h );
	    	var draw = Region( _r, row, col, _tw, _th );
	    	for( var i = 0; i < row; i ++ ){
	    		for( var j = 0; j < col; j ++ ){
	    			regions.push( { x: rect.x[j], y: rect.y[i], w: rect.w[j], h: rect.h[i], 
	    				dx: draw.x[j], dy: draw.y[i], dw: draw.w[j], dh: draw.h[i] ,
	    				sw: draw.w[j] / rect.w[j], sh: draw.h[i] / rect.h[i],
	    			} );
	    		}
	    	}
	    	
	    	return regions;
		}
	})();
	
	jees.UT = UtilTools;
})();