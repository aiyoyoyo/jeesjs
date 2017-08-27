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
    function Widget( _p ){
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
    	this._parent = _p ? _p : null;
    	
    	if( _p != undefined )
    		this._parent.getRoot().addChild( this._container );
    };
	
    var p = Widget.prototype;
// public method
     /**
     * 返回根容器
     * @method getRoot
     * @type {createjs.Container}
     * @return 
     */
    p.getRoot = function(){
    	return this._container;
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
    	this._container.setBounds( this.x, this.y, this.w, this.h );
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
    	this._container.setBounds( this.x, this.y, this.w, this.h );
	}
    /**
     * 绑定点击事件
     * @method onClick
     * @param {Function} _f
     */
    p.onClick = function( _f ){
    	if( typeof _f === "function" ){
    		this._event_map[ "click" ] = _f;
    	}
    }
    /**
     * 移除绑定点击事件
     * @method unClick
     */
    p.unClick = function(){
    	this._event_map[ "click" ] = null;
    }
// private method

	jeesjs.Widget = Widget;
})();