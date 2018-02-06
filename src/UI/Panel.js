/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/blob/master/src/UI/Panel.js
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
	 * @constructor
	 */
    function Panel(){
    	this.Widget_constructor();
// private properties:
    	/**
    	 * 控件宽度
    	 * @property _w
    	 * @type {Number}
    	 * @extends
    	 * @default 100
    	 */
    	this._w = 100;
    	/**
    	 * 控件高度
    	 * @property _h
    	 * @type {Number}
    	 * @extends
    	 * @default 100
    	 */
    	this._h = 100;
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

		this.init();
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
		this._reset_background();
    };
	/**
	 * 当前背景色
	 * @method getColor
     * @return {String} "#00ff00"
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
		this._reset_background();
    };
    /**
	 * TODO: 未完成
     * 平铺图片到背景
     * @method setTile
     * @param {String | Object } _r
     * @param {Number} _t 平铺类型 0-铺满 1-水平 2-垂直 
     * @param {Number} _x
     * @param {Number} _y
     * @param {Number} _w
     * @param {Number} _h
     */
    p.setTile = function( _r, _t, _x, _y, _w, _h ){
    	var t_t = _t ? _t : 0;
    	var t_x = _x ? _x : this._x;
    	var t_y = _y ? _y : this._y;
    	var t_w = _w ? _w : this._w;
    	var t_h = _h ? _h : this._h;
    	
    	if( typeof _r === "string" )
			this._object.graphics.beginBitmapFill( jeesjs.QM.getSource( _r ) ).drawRect( t_x, t_y, t_w, t_h );
		else
			this._object.graphics.beginBitmapFill( _r ).drawRect( t_x, t_y, t_w, t_h );
	};
// private method 
	/**
	 * 重设背景
	 * @method _reset_background
	 * @private
	 */
	p._reset_background = function(){
		this._object.graphics.clear().beginFill( this._bg_color ).drawRect( 0, 0, this._w, this._h );
	};
    
	jeesjs.Panel = createjs.promote( Panel, "Widget" );
})();