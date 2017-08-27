/*
 * Author: Aiyoyoyo
 * https://www.jeesupport.com/assets/jeesjs/src/UI/Panel.js
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
	 * @class Panel
	 * @extends jeesjs.Widget
	 * @param {Widget} _p
	 * @constructor
	 */
    function Panel( _p ){
    	this.Widget_constructor();

// public properties:
    	/**
    	 * 控件默认背景颜色
    	 * @property c
    	 * @type {String}
    	 * @default #000000
    	 */
    	this.c = "#000000";
    	/**
    	 * 控件宽度
    	 * @property w
    	 * @type {Number}
    	 * @default 100
    	 */
    	this.w = 100;
    	/**
    	 * 控件高度
    	 * @property h
    	 * @type {Number}
    	 * @default 100
    	 */
    	this.h = 100;
    	/**
    	 * CreateJS绘制容器
    	 * @property _container
    	 * @type {createjs.Container}
    	 */
    	this._container = new createjs.Container();
    	/**
    	 * CreateJS图形控件
    	 * @property __shape
    	 * @type {createjs.Shape}
    	 */
    	this._shape = new createjs.Shape();
    	this._shape.graphics.beginFill( this.c ).drawRect( this.x, this.y, this.w, this.h );
 		
    	this._container.addChild( this._shape );
    	// 保证绘制的内容在容器之内
    	this._container.mask = this._shape;
    	
    	if( _p != undefined ){
    		this._parent = _p;
    		this._parent.addChild( this.getRoot() );
    	}
    };
  	var p = createjs.extend( Panel, jeesjs.Widget );
// public method
  	/**
     * 设置宽高
     * @method setSize
     * @param {Number} _w
     * @param {Number} _h
     */
    p.setSize = function( _w, _h ){
    	this.Widget_setSize( _w, _h );
    	this._shape.graphics.clear().beginFill( this.c ).drawRect( this.x, this.y, this.w, this.h );
    };
    /**
     * 设置坐标
     * @method setPosition
     * @param {Number} _x
     * @param {Number} _y
     */
	p.setPosition = function( _x, _y ){
		this.Widget_setPosition( _x, _y );
    	this._shape.graphics.clear().beginFill( this.c ).drawRect( this.x, this.y, this.w, this.h );
	};
	/**
	 * 设置颜色
	 * @method setColor
     * @param {String} _c
	 */
    p.setColor = function( _c ){
    	this.c = _c;
    	this._shape.graphics.clear().beginFill( this.c ).drawRect( this.x, this.y, this.w, this.h );
    };

	jeesjs.Panel = createjs.promote( Panel, "Widget" );
})();