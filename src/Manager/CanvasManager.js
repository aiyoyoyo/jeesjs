/*
 * Author: Aiyoyoyo
 * https://www.jeesupport.com/assets/jeesjs/src/Manager/CanvasManager.js
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
	 * @class CanvasManager
	 */
    function CanvasManager(){ throw "CanvasManager cannot be instantiated."; };
// private static properties:
	/**
	 * @property _inited
	 * @static
	 * @type {Boolean}
	 * @protected
	 **/
    CanvasManager._inited = false;
// public static methods:  
    /**
	 * 初始化面板管理器
	 * @method init
	 * @static
	 **/
    CanvasManager.init = function() {
		if( this._inited ){ return; }
		this._inited = true;
	};
	/**
	 * 添加一个预加载文件
	 * @method addWidget
     * @static
     * @param {Widget} _w 添加的控件
     * @param {Widget} _p 父控件，如果为空则添加到最底层，否则添加到该控件上
	 */
	CanvasManager.addWidget = function( _w ) {
		jeesjs.APP._contar.addChild( _w.getRoot() );
	}

	jeesjs.CM = CanvasManager;
})();