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
    	// 加载游戏配置
    	// 加载游戏资源
    }
    // public static methods: =================================================
    p.enter = function(){
    	// 程序启动
    	var _this = this;
    	jees.Images.register( "cover", "../assets/images/cover.png" );
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