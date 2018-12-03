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