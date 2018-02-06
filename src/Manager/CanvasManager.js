/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/Manager/CanvasManager.js
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
	 * @class CanvasManager
	 */
	function CanvasManager() {
		throw "CanvasManager cannot be instantiated.";
	};
	//  public static properties: ==============================
	/**
	 * 容器层级类型，默认为MIDDEL
	 * @property Container
	 * @static
	 */
	CanvasManager.Container = {
		BACK : -2,
		BOTTOM : -1,
		MIDDEL : 0,
		DEFAULT: 0,
		TOP : 1,
		DIALOG : 2,
		SYSTEM : 3,
		DEBUG : 4,
	};
	// private static properties:
	/**
	 * @property _inited
	 * @static
	 * @type {Boolean}
	 * @private
	 **/
	CanvasManager._inited = false;
	/**
	 * 容器对象
	 * @property _container
	 * @static
	 * @type {Array}{createjs.Container}
	 * @private
	 */
	CanvasManager._container = null;
	// public static methods:  
	/**
	 * 初始化面板管理器
	 * @method init 
	 * @static
	 **/
	CanvasManager.init = function() {
		if (this._inited) return;

		this._inited = true;
		this._container = new Array();
		this._recache = false;
		this._add_container(this.Container.BACK);
		this._add_container(this.Container.BOTTOM);
		this._add_container(this.Container.MIDDEL);
		this._add_container(this.Container.TOP);
		this._add_container(this.Container.DIALOG);
		this._add_container(this.Container.SYSTEM);
		if( jeesjs.APP.isDebug() )
			this._add_container(this.Container.DEBUG);
	};
	/**
	 * 刷新画布
	 * @method update
	 * @static
	 */
	CanvasManager.update = function() {
		this._cache( this.Container.MIDDEL );

		if (this._showfps)
			this._txtfps.text = parseInt(createjs.Ticker.getMeasuredFPS());

		jeesjs.APP.getStages().update();
	};
	/**
	 * 添加一个预加载控件
	 * @method addWidget
     * @static
     * @param {createjs.DisplayObject|jeesjs.Widget} _w 添加的控件
     * @param {CanvasManager.Container}
	 */
	CanvasManager.addWidget = function(_w, _c) {
		var container = this._get_container( _c );
		if( _w instanceof jeesjs.Widget ){
			container.addChild(_w.getWidget());
		}else
			container.addChild(_w);
	}
	/**
	 * 移除控件
	 * @method removeWidget
     * @static
     * @param {Widget} _w 要移除的控件
	 */
	CanvasManager.removeWidget = function(_w) {
		jeesjs.APP.removeChild(_w.getWidget());
	}
	// protected static methods: ===============================
	/**
	 * 往全局舞台中增加容器
	 * @method _add_container
	 * @param {CanvasManager.Container} _c
	 * @static
	 * @protected
	 */
	CanvasManager._add_container = function(_c) {
		var tmpc = this._container[_c];
		if (tmpc == undefined) tmpc = this._container[_c] = new createjs.Container();
		jeesjs.APP.getStages().addChild( tmpc );
	};
	/**
	 * 创建新的容器，用于构建容器层
	 * @method _new_container
	 * @param {CanvasManager.Container} _c
	 * @static
	 * @protected
	 */
	CanvasManager._get_container = function( _c ) {
		var container = this._container[_c];
		if (container == undefined)
			container = this._container[this.Container.DEFAULT];

		return container;
	}
	/**
	 * 容器重建缓存
	 * @param {CanvasManager.Container} _c 
	 */
	CanvasManager._cache = function( _c ){
		var c = this._get_container( _c );
		c.cache( 0, 0, jeesjs.APP.getSize().w, jeesjs.APP.getSize().h );
	}
	jeesjs.CM = CanvasManager;
})();