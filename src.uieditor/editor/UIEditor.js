/*
 * Author: Aiyoyoyo
 * https://www.jeesupport.com/assets/jeesjs/src/editor/UIEditor.js
 * License: MIT license
 */

/**
 * @module jees
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class UIEditor
	 */
	function UIEditor() {
		this.Module_constructor( "UIEditor" );
// private properties:	
		this._layout = null;
	}
    var p = createjs.extend( UIEditor, jees.Module );
// private static methods: ====================================================
    p._initialize = function(){
    	// 绘制界面
    	this._layout = jees.Layout.load( "uieditor" );

//		var size = { w:54, h: 54 };
//		var target_size = { w: 1524, h: 602 };
//		var rg = jees.UT.Grid( {l: 25, r: 25, t: 25, b: 25}, size.w, size.h, target_size.w, target_size.h );
//		var tc = jees.CJS.newContainer();
//		
//		var bg = jees.CJS.newBitmap( jees.Resource.get( "panel_bg" ) );
//		var _this = this;
//		rg.forEach( function( _r ){
//			var o = bg.clone();
//			o.sourceRect = jees.CJS.newRect( _r.x, _r.y, _r.w, _r.h );
//			o.x = _r.dx;
//			o.y = _r.dy;
//			o.scaleX = _r.sw;
//			o.scaleY = _r.sh;
//			o.cache( 0, 0, _r.w , _r.h );
//			tc.addChild( o );
//		} );
//		tc.cache( 0, 0, target_size.w, target_size.h );
//		jees.APP.addChild( tc );
//		var r = jees.UT.Grid( {l: 30, r: 30, t: 30, b: 30}, 100, 100, 200, 200 );
//		console.log( r[0] );
//		console.log( r[1] );
//		console.log( r[2] );
//		console.log( r[3] );
//		console.log( r[4] );
//		console.log( r[5] );
//		console.log( r[6] );
//		console.log( r[7] );
//		console.log( r[8] );
		
    	// 加载游戏配置
		// 加载游戏资源
//		var mask = jees.CJS.newShape( 100, 100, "#000000" );
////		mask.cache( 0, 0, 100, 100 );
//		var sp = jees.CJS.newShape( 400, 400, "#00FF00" );
//		sp.x = 50;
//		sp.y = 50;
//		sp.mask = mask;
////		sp.cache( 0, 0, 400, 400 );
//		
//		var c = jees.CJS.newContainer();
//		c.addChild( sp );
//		c.cache( 0, 0, 400, 400 );
//		jees.APP.addChild( c );
    }
    // public static methods: =================================================
    p.enter = function(){
    	// 程序启动
    	var _this = this;
		jees.Resource.register( "logo", "../assets/images/JeesJS_Logo.png" );
		jees.Resource.register( "cover", "../assets/images/cover.png" );
		jees.Resource.register( "anima0", "../assets/images/anima_0.png" );
		jees.Resource.register( "btn_green", "../assets/images/btn_green.png" );
		jees.Resource.register( "btn_short", "../assets/images/btn_short.png" );
		jees.Resource.register( "ipt_short", "../assets/images/ipt_short.png" );
		jees.Resource.register( "panel_bg", "../assets/images/panel_bg.png" );
		
    	jees.Layout.register( "uieditor", "../assets/layouts/jees.uieditor.layout" );
    	
    	jees.RM.onload( function(){ _this._initialize(); } );
    	//jees.MM.leave();
    }
    p.leave = function(){
    	jees.Layout.unload( "start" );
    }
    p.update = function(){
    	
    }
    
    jees.UIEditor = createjs.promote( UIEditor, "Module");
})();