/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/base/App.js
 * License: MIT license
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
	// constructor: ===========================================================
	/**
	 * @class Application
	 * @static
	 */
	function Application() {
		throw "Application cannot be instantiated.";
	}
	;
	// private static properties: =============================================
    Application._init = false;
    Application._canvas = null;
    Application._stage = null;
	// public static properties: ==============================================

	// protected static methods: ==============================================
	/**
     * 程序启动
     * @method startup
     * @static
     * @param Module _m 初始模块
     * @param {Object} _o 配置属性
     *
     */
	Application.startup = function( _m ) {
		if ( this._init ) return;
		this._init = true;
        // 配置
		jees.SET.startup();
        jees.CJS.startup();

        jees.CJS.getTouch().enable( this._stage );
        jees.CJS.getTicker().addEventListener( "tick", this.update );

//		jees.QM.init();
//		jees.CM.init();
//		jees.MM.init();
	};
	/**
	 * 刷新模块、画布
	 * @method update
	 * @param {createjs.Event} _e
	 * @static
	 */
	Application.update = function(_e) {
		if (!_e.paused) {
			var t = jeesjs.CJS.getTicker().getTime(false);
			var tick = t - jeesjs.SET.getTimestamp();
			jees.SET.setTimestamp(t);
//			jees.MM.update(tick);
//			jees.CM.update();
		}
	};

	//    	TODO: 数据缓存部分
	//    	this._localStorage = localStorage;
	//    	this._sessionStorage = sessionStorage;
	
	jees.APP = Application;
})();