/*
 * Author: Aiyoyoyo
 * https://www.jeesupport.com/assets/jeesjs/src/UI/Widget.js
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
	 * @class Widget
	 * @extends createjs.Container
	 * @param {Graphics} _g
	 * @constructor
	 */
    function Widget(){
// public properties:
    	 /**
    	 * 控件横坐标
    	 * @property x
    	 * @type {Number}
    	 * @default 0
    	 */
    	this.x = 0;
    	/**
    	 * 控件纵坐标
    	 * @property y
    	 * @type {Number}
    	 * @default 0
    	 */
    	this.y = 0;
    	/**
    	 * 控件宽度
    	 * @property w
    	 * @type {Number}
    	 * @default 0
    	 */
    	this.w = 0;
    	/**
    	 * 控件高度
    	 * @property h
    	 * @type {Number}
    	 * @default 0
    	 */
    	this.h = 0;
    	/**
    	 * 事件的方法池
    	 * @property _event_map
    	 * @type {Map}
    	 */
    	this._event_map = [];
		/**
    	 * CreateJS绘制容器
    	 * @property _container
    	 * @type {createjs.Container}
    	 * @default null
    	 */
    	this._container = null;
    	/**
    	 * 父控件
    	 * @property _container
    	 * @type {createjs.Container}
    	 * @default null
    	 */
    	this._parent = null;
    };
	
    var p = Widget.prototype;
// public method
     /**
     * 返回根容器
     * @method getRoot
     * @type {createjs.DisplayObject}
     * @return 
     */
    p.getRoot = function(){
    	return this._container;
    }
    /**
     * 添加子控件
     * @method addChild
     * @param {createjs.DisplayObject}
     */
    p.addChild = function( _d ){
    	if( this.isContainer() )
    		this.getRoot().addChild( _d );
    	else throw "根节点为非容器类型控件。";
    }
    /**
     * 是否是容器形式的控件
     * @method isContainer
     * @return {Boolean}
     */
    p.isContainer = function(){
    	return this._container != null;
    }
    /**
     * 设置宽高
     * @method setSize
     * @param {Number} _w
     * @param {Number} _h
     */
    p.setSize = function( _w, _h ){
    	this.w = _w;
    	this.h = _h;
    	if( this.isContainer() ){
    		this.getRoot().setBounds( this.x, this.y, this.w, this.h );
    		// TODO 当容器大小变化时，更新子容器的mask
    		// 主要用于容器在添加至绘制面板后的子控件同步变化
    	}
    	
    };
    /**
     * 设置坐标
     * @method setPosition
     * @param {Number} _x
     * @param {Number} _y
     */
	p.setPosition = function( _x, _y ){
		this.x = this._parent ? this._parent.x + _x : _x;
    	this.y = this._parent ? this._parent.y + _y : _y;
    	if( this.isContainer() ){
    		this.getRoot().setBounds( this.x, this.y, this.w, this.h );
    		// TODO 当容器位置变化时，更新子控件的位置
    		// 主要用于容器在添加至绘制面板后的子控件同步变化
    	}
	};
	/**
	 * 获取控件宽高
	 * @method getSize
	 * @return {w,h}
	 */
	p.getSize = function(){
		return { w: this.w, h: this.h };
	};
	/**
	 * 获取控件宽高
	 * @method getPosition
	 * @return {x,y}
	 */
	p.getPosition = function(){
		return { x: this.x, h: this.y };
	}
    /**
     * 绑定点击事件
     * @method onClick
     * @param {Function} _f
     */
    p.onClick = function( _f ){
    	this._bind_event( "click", this.getRoot(), _f );
    };
    /**
     * 移除绑定点击事件
     * @method unClick
     */
    p.unClick = function(){
    	this._unbind_event( "click", this.getRoot() );
    };
// private method
    /**
     * @method _bind_event
	 * @param {String} _e
	 * @param {Widget} _w
	 * @param {Function} _f
	 * @private
     */
	p._bind_event = function( _e, _w, _f ){
		this._event_map[ _e ] = _f;
    	_w.addEventListener( _e, this._event_map[ _e ] );
	};
	/**
	 * @method _unbind_event
	 * @param {String} _e
	 * @param {Widget} _w
	 * @private
	 */
	p._unbind_event = function( _e, _w ){
		_w.removeEventListener( _e, this._event_map[_e] );
		this._event_map[ _e ] = null;
	};
    
	jeesjs.Widget = Widget;
})();