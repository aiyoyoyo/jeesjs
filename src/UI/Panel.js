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
	 * @extends createjs.Shape
	 * @param {Graphics} _g
	 * @constructor
	 */
    function Panel( _g ){
    	this.Shape_constructor( _g );

// public properties:
    	this._container = new jeesjs.Widget();
    	/**
    	 * 基本颜色
    	 */
    	this.c = "#000000";
    	
    	this.graphics.beginFill( this.c ).drawRect( this.x, this.y, this.w, this.h );
    	
    	jeesjs.CM.addWidget( this._container );
    };
  	var p = createjs.extend( Panel, createjs.Shape );
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
    	this.graphics.clear().beginFill( this.c ).drawRect( this.x, this.y, this.w, this.h );
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
    	this.graphics.clear().beginFill( this.c ).drawRect( this.x, this.y, this.w, this.h );
	}
	/**
	 * 设置颜色
	 * @method setColor
     * @param {String} _cx
	 */
    p.setColor = function( _c ){
    	this.c = _c;
    	this.graphics.clear().beginFill( this.c ).drawRect( this.x, this.y, this.w, this.h );
    }
    /**
     * 绑定点击事件
     * @method onClick
     * @param {Function} _f
     */
    p.onClick = function( _f ){
    	if( typeof _f === "function" ){
    		this.addEventListener( "click", _f );
    	}
    }
    /**
     * 移除绑定点击事件
     * @method unClick
     */
    p.unClick = function(){
    	this.off( "click" );
    }
    
    p.addChild = function( _w ){
    	this._container.addChild( _w );
    }
    
	jeesjs.Panel = createjs.promote( Panel, "Shape" );
})();