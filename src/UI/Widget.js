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
    function Widget( _g ){
    	this.Container_constructor();
    	
// public properties:
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
		 * The graphics instance to display.
		 * @property g
		 * @type createjs.Graphics
		 **/
		this.g = _g ? _g : new createjs.Graphics();
    };
	
    var p = createjs.extend( Widget, createjs.Container );
// public method    
    /**
     * 设置宽高
     * @method setSize
     * @param {Number} _w
     * @param {Number} _h
     */
    p.setSize = function( _w, _h ){
    	this.w = _w;
    	this.h = _h;
    	this.setBounds( this.x, this.y, this.w, this.h );
    };
    /**
     * 设置坐标
     * @method setPosition
     * @param {Number} _x
     * @param {Number} _y
     */
	p.setPosition = function( _x, _y ){
		this.x = _x;
    	this.y = _y;
    	this.setBounds( this.x, this.y, this.w, this.h );
	}
    
	jeesjs.Widget = createjs.promote( Widget, "Container" );
})();