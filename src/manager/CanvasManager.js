/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/Manager/CanvasManager.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};

(function() {
	"use strict";
	// constructor: ===========================================================
	/**
	 * @class CanvasManager
	 */
	function CanvasManager() { throw "CanvasManager cannot be instantiated."; };
	//  public static properties: =============================================
	/**
	 * 容器层级类型，默认为DEFAULT
	 * @property Container
	 * @static
	 */
	CanvasManager.Container = {
		BACK : -2,
		BOTTOM : -1,
		DEFAULT: 0,
		TOP : 1,
		POPUP : 2,
		SYSTEM : 3,
		DEBUG : 4,
		CONSOLE : 5,
	};
	// private static properties: =============================================
	CanvasManager._init = false;
	CanvasManager._containers = null;
	// public static methods: =================================================
	/**
	 * 初始化面板管理器
	 * @method startup
	 * @static
	 **/
	CanvasManager.startup = function() {
		if (this._init) return;
		this._init = true;

		this._containers = new Map();

		this._add_container(this.Container.BACK);
		this._add_container(this.Container.BOTTOM);
		this._add_container(this.Container.DEFAULT);
		this._add_container(this.Container.TOP);
		this._add_container(this.Container.POPUP);
		this._add_container(this.Container.SYSTEM);
		if( jees.SET.isDebug() )
			this._add_container(this.Container.DEBUG);
		if( jees.SET.isConsole() )
        	this._add_container(this.Container.CONSOLE);
	};
	/**
	 * 刷新画布，并重建画布缓存
	 * @method update
	 * @static
	 */
	CanvasManager.update = function( _c ) {
	    var tick = createjs.Ticker.getMeasuredTickTime().toFixed(0);

        if( _c == undefined ){
            for (var c of this._containers.values() ) {
                this._cache( c );
            }
        }else if( _c instanceof createjs.Container ) this._cache( _c );
	    else this._cache( this._get_container( _c ) );

        if( jees.SET.isDebug() )
            jees.DEBUG.update();
		jees.CJS.update();
	};
	/**
	 * 添加一个预加载控件
	 * @method addWidget
     * @static
     * @param {createjs.DisplayObject|jeesjs.Widget} _w 添加的控件
     * @param {Boolean} _u 立即刷新画布
     * @param {CanvasManager.Container}
	 */
	CanvasManager.addWidget = function( _w, _u, _c ) {
	    if( _c == undefined ) _c = this.Container.DEFAULT;
		var c = this._get_container( _c );

		if( _w instanceof jees.Widget ) c.addChild( _w.getWidget() );
		else c.addChild( _w );
        if( _u ) this.update( c );
	}
	// private static methods: ================================================
	/**
	 * 往全局舞台中增加容器
	 * @method _add_container
	 * @param {CanvasManager.Container} _c
	 * @static
	 * @protected
	 */
	CanvasManager._add_container = function( _c ) {
	    if( this._containers.has( _c ) )
	        throw "存在相同层级的容器[" + _c + "]";

        this._containers.set( _c, jees.CJS.newContainer( true ) );
	};
	/**
	 * 创建新的容器，用于构建容器层
	 * @method _new_container
	 * @param {CanvasManager.Container} _c
	 * @static
	 * @protected
	 */
	CanvasManager._get_container = function( _c ) {
	    if( !this._containers.has( _c ) )
        	  throw "没有找到层级对应的容器[" + _c + "]";

		return this._containers.get( _c );
	}
	/**
	 * 容器重建缓存
	 * @param {CanvasManager.Container} _c 
	 */
	CanvasManager._cache = function( _c ){
        _c.cache( 0, 0, jees.SET.getWidth(), jees.SET.getHeight() );
	}

	jees.CM = CanvasManager;
})();