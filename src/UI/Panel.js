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
	 * 基本面板，容器类型，可以添加其他的Widget。缺点：目前父容器改变位置的话，子容器位置是不变的。没有做相对路径的功能。
	 * @class Panel
	 * @extends jeesjs.Widget
	 * @param {Widget} _p
	 * @constructor
	 */
    function Panel( _p ){
    	this.Widget_constructor( _p );
// private properties:
    	/**
    	 * 控件宽度
    	 * @property _width
    	 * @type {Number}
    	 * @extends
    	 * @default 0
    	 */
    	this._width = 0;
    	/**
    	 * 控件高度
    	 * @property _height
    	 * @type {Number}
    	 * @extends
    	 * @default 0
    	 */
    	this._height = 0;
// public properties:
    	/**
    	 * 控件默认背景颜色
    	 * @property _bgcolor
    	 * @type {String}
    	 * @default #000000
    	 */
    	this._bg_color = "#000000";
    	/**
    	 * CreateJS绘制容器
    	 * @property _container
    	 * @type {createjs.Container}
    	 * @extends
    	 */
    	this._container = new createjs.Container();
    	/**
    	 * CreateJS图形控件
    	 * @property _widget
    	 * @type {createjs.Shape}
    	 */
    	this._object = new createjs.Shape();
    	
    	this._container.addChild( this._object );								//
    	this._container.mask = this._object;									//保证绘制的内容在容器之内
    	
    	this._init_finish();													// 添加至父容器
    	this.setSize( 200, 200 );
    	this.setPosition( 0, 0 );
    };
  	var p = createjs.extend( Panel, jeesjs.Widget );
// public method
  	/**
     * 设置宽高
     * @method setSize
     * @extends
     * @param {Number} _w
     * @param {Number} _h
     */
    p.setSize = function( _w, _h ){
    	this.Widget_setSize( _w, _h );
    	this._reset_bg();
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
		this._object.x = _x;
		this._object.y = _y;
    	this._reset_bg();
	};
	/**
	 * 当前背景色
	 * @method getColor
     * return {String} "#00ff00"
	 */
	p.getColor = function(){
		return this._bg_color;
	};
	/**
	 * 设置颜色
	 * @method setColor
     * @param {String} _c
	 */
    p.setColor = function( _c ){
    	this._bg_color = _c;
    	this._reset_bg();
    };
    /**
     * 平铺图片到背景
     * @method setTile
     * @param {String} _r
     * @param {Number} _t 平铺类型 0-铺满 1-水平 2-垂直 
     * @param {Number} _x
     * @param {Number} _y
     * @param {Number} _w
     * @param {Number} _h
     */
    p.setTile = function( _r, _t, _x, _y, _w, _h ){
    	var t_t = _t ? _t : 0;
    	var t_x = _x ? _x : 0;
    	var t_y = _y ? _y : 0;
    	var t_w = _w ? _w : this._width;
    	var t_h = _h ? _h : this._height;
    	
    	if( typeof _r === "string" )
	    	this._object.graphics.beginBitmapFill( jeesjs.QM.getSource( _r ) ).drawRect( t_x, t_y, t_w, t_h );
    };
// private method
    /**
     * 设置背景颜色
	 * @method _reset_bg
	 * @private
     */
    p._reset_bg = function(){
    	var posi = this.getPosition();
    	var size = this.getSize();
    	this._object.graphics.clear().beginFill( this._bg_color ).drawRect( 0, 0, size.w, size.h );
    };
    
	jeesjs.Panel = createjs.promote( Panel, "Widget" );
})();