/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/base/App.js
 * License: MIT license
 */
/**
 * @module JeesJS
 */
// namespace:
this.jeesjs = this.jeesjs || {};

(function() {
	"use strict";
	// constructor: ============================================
	/**
	 * @class Application
	 * @static
	 */
	function Application() {
		throw "Application cannot be instantiated.";
	}
	;
	// private static properties: ==============================
	/**
	 * 本次回调的时间戳 
	 * @property _timestamp
	 * @static
	 * @type {Float}
	 * @protected
	 */
	Application._timestamp = 0;
	/**
	 * 画布控件
	 * @property _canvas
	 * @static
	 * @type {DOM Object}
	 * @protected
	 */
	Application._canvas = null;
	/** 
	 * 全局舞台
	 * @property _stages
	 * @static
	 * @type {createjs.Stage}
	 * @protected
	 */
	Application._stages = null;
	/**
	 * @property _inited
	 * @static
	 * @type {Boolean}
	 * @protected
	 **/
	Application._inited = false;
	/**
	 * 应用配置属性
	 * @property _options
	 * @static
	 * @type {Object}
	 * @protected
	 */
	Application._options = {
		canvasId : "gCanvas",
		fps : 45,
		width : document.documentElement.clientWidth,
		height : document.documentElement.clientHeight,
		queueSize : 100,
		debug: false,
	};
	// public static properties: ==================================
	/**
	 * 是否开启了Debug模式
	 * @method isDebug
	 * @static
	 */
	Application.isDebug = function(){
		return this._options.debug;
	};
	/**
     * @method showFPS
     * @static
     * @param {Boolean} _v 
     */
	Application.showFPS = function(_v) {
		this._showfps = _v;
		if (!this._showfps)
			this._txtfps.text = "";
	};
	/**
	 * 获取配置的FPS数值
	 * @method getFPS
	 * @static
	 * @param {Number}
	 */
	Application.getFPS = function() {
		return this._options.fps;
	};
	/**
	 * 设置的FPS数值
	 * @method setFPS
	 * @param {Number}
	 * @static
	 */
	Application.setFPS = function( _f ){
		this._options.fps = _f;
		createjs.Ticker.framerate = _f;
	};
	/**
	 * @method getTimestamp
	 * @static
	 * @return {Float}
	 */
	Application.getTimestamp = function() {
		return this._timestamp;
	};
	/**
	 * @method setTimestamp
	 * @param {Float}
	 * @static
	 */
	Application.setTimestamp = function(_t) {
		this._timestamp = _t;
	};
	/**
	 * @method getSize
	 * @static
	 * @return {Object}[w,h] 
	 */
	Application.getSize = function() {
		return {
			w : this._canvas.width,
			h : this._canvas.height
		};
	};
	/**
	 * @method setSize
	 * @param {Null | Number} _w 宽度
	 * @param {Null | Number} _h 高度
	 * @static
	 * @return {Object}[w,h] 
	 */
	Application.setSize = function(_w,_h) {
		this._canvas.width = _w;
		this._canvas.height = _h;
	};
	/**
	 * @method setScale
	 * @param {Null | Number} _sx 横向缩放倍数
	 * @param {Null | Number} _sy 纵向缩放倍数
	 * @static
	 * @return {Object}[w,h] 
	 */
	Application.setScale = function(_sx, _sy) {
		if (_sx) 
			this._canvas.width = this._canvas.width * _sx;
		if (_sy) 
			this._canvas.height = this._canvas.height * _sy;
		jeesjs.CM.setScale( _sx, _sy );
	};
	/**
	 * @method getStages
	 * @static
	 * @return {createjs.StageGL}
	 */
	Application.getStages = function(){
		return this._stages;
	};
	/**
	 * @method getCanvas
	 * @static
	 * @return {document.element}
	 */
	Application.getCanvas = function(){
		return this._canvas;
	};
	// protected static methods: ======================================
	/**
     * 程序初始化，初始模块用于文件队列加载结束后，进入初始模块。
     * @method start
     * @static
     * @param Module _m 初始模块
     * @param {Object} _o 配置属性
     * @d
     */
	Application.init = function(_m, _o) {
		if (this._inited) {
			return;
		}
		this._inited = true;

		if (typeof _o === 'object') {
			for (var i in _o) {
				if (_o.hasOwnProperty(i)) {
					this._options[i] = _o[i];
				}
			}
		}

		this._canvas = document.getElementById( this._options.canvasId );
		this._canvas.width = this._options.width;
		this._canvas.height = this._options.height;

		this._stages = new createjs.StageGL(this._canvas);
		
		this.setFPS(this._options.fps);
		createjs.Touch.enable(this._stages);
		createjs.Ticker.addEventListener("tick", this.update);
		
		jeesjs.QM.init();
		jeesjs.CM.init();
		jeesjs.MM.init();
	};
	/**
	 * 刷新模块、画布
	 * @method update
	 * @param {createjs.Event} _e
	 * @static
	 */
	Application.update = function(_e) {
		if (!_e.paused) {
			var t = createjs.Ticker.getTime(false);
			var tick = t - jeesjs.APP.getTimestamp();
			jeesjs.APP.setTimestamp(t);
			jeesjs.MM.update(tick);		
			jeesjs.CM.update();
		}
	};

	//    	TODO: 数据缓存部分
	//    	this._localStorage = localStorage;
	//    	this._sessionStorage = sessionStorage;
	
	jeesjs.APP = Application;
})();