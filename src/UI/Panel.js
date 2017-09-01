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
    	this.Widget_constructor( _p );

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
    	 * @property _shape
    	 * @type {createjs.Shape}
    	 */
    	this._shape = new createjs.Shape();
    	this._shape.graphics.beginFill( this.c ).drawRect( this.x, this.y, this.w, this.h );
 		
    	this._container.addChild( this._shape );
    	// 保证绘制的内容在容器之内
    	this._container.mask = this._shape;
    	
    	this._init_finish();
    };
  	var p = createjs.extend( Panel, jeesjs.Widget );
// public method
  	 /**
     * 自定义绑定事件
     * @method onEvent
     * @param {String} _e 事件比如："click"等。
     * @param {Function( createjs.Event, jeesjs.Widget )} _f( _e, _w ) _e为对应的事件信息，_w为触发事件的控件Widget
     * @extends
     */
    p.onEvent = function( _e, _f ){
    	if( typeof _f != "function" ) throw "参数_f不是有效的方法类型";
    	this._bind_event( _e, this._shape, _f );
    }
    /**
     * 解绑控件弹起事件
     * @extends
     * @method unEvent
     * @extends
     */
    p.unEvent = function( _e ){
    	this._unbind_event( _e, this._shape );
    };
    
  	/**
     * 设置宽高
     * @method setSize
     * @extends
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
     * @extends
     * @param {Number} _x
     * @param {Number} _y
     */
	p.setPosition = function( _x, _y ){
		this.Widget_setPosition( _x, _y );
    	this._shape.graphics.clear().beginFill( this.c ).drawRect( this.x, this.y, this.w, this.h );
	};
	/**
	 * 当前背景色
	 * @method setColor
     * @param {String} _c
	 */
	p.getColor = function(){
		return this.c;
	}
	/**
	 * 设置颜色
	 * @method setColor
     * @param {String} _c
	 */
    p.setColor = function( _c ){
    	this.c = _c;
    	this._shape.graphics.clear().beginFill( this.c ).drawRect( this.x, this.y, this.w, this.h );
    };
	Object.defineProperties( p , {test:{get:p.getSpeed, set:p.setSpeed}});
    
	jeesjs.Panel = createjs.promote( Panel, "Widget" );
})();