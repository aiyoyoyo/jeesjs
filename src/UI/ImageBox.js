/*
 * Author: Aiyoyoyo https://www.jeesupport.com/assets/jeesjs/src/UI/ImageBox.js
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
	 * 支持基本的图片格式。
	 * @class ImageBox
	 * @extends jeesjs.Widget
	 * @param {String | Object} _r 参数 "res/demo.jpg"、"resname"、jeesjs.QM.getSource("resname")
	 * @param {Widget}
	 *            _p
	 * @constructor
	 */
	function ImageBox( _r, _p ) {
		this.Widget_constructor(_p);

// public properties:

// private properties:
		/**
		 * 图片源
		 * @property _source
		 * @type {String|object}
		 */
		this._source = null;
		/**
		 * 图片状态
		 * @property _state
		 * @type {Boolean}
		 * @default false;
		 */
		this._state = false;
		/**
		 * 区域对象
		 * @property _rect
		 * @type createjs.Rectangle
		 */
		this._rect = null;
		
		if( typeof _r === "string" && !/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test( _r ) || typeof _r === "object" ){
			this._source = typeof _r === "object" ? _r : jeesjs.QM.getSource( _r );
			this._object = new createjs.Bitmap( this._source );
			this._reset_size();
			this._state = true;
        }else{
        	this._source = _r;
        	var tmp = new Image();
        	tmp.data = this;
        	tmp.src = _r;
        	tmp.onload = this._onload_finish;
        	
        	this._object = new createjs.Bitmap( this._source );
        }
        
		this._init_finish();
	};
// public static properties

	var p = createjs.extend(ImageBox, jeesjs.Widget);
// public method
    /**
	 * 获取图片的加载状态
	 * @method getState
	 * @return {Boolean}
	 */
	p.getState = function(){
		return this._state;
	}
	/**
	 * 获取图片源
	 * @method getSource
	 * @return {Blob}
	 */
	p.getSource = function(){
		return this._source.src;
	}
	/**
	 * 绘制图片的局部
	 * @method setRect
	 * @param {Number} _x
	 * @param {Number} _y
	 * @param {Number} _w
	 * @param {Number} _h
	 */
	p.setRect = function( _x, _y, _w, _h ){
		this._rect.setValues( _x, _y, _w, _h );
		this._object.sourceRect = this._rect;
	}
	/**
	 * 等比缩放某个组件
	 * @method setScale
	 * @param {Number} _sx
	 * @param {Number} _sy
	 */
	p.setScale = function( _sx, _sy ) {
		if( _sx != undefined )
			this._object.scaleX = _sx;
		if( _sy != undefined )
			this._object.scaleY = _sy;
		
		var b = this._object.getBounds();
		this._width = b.width * _sx;
		this._height = b.height * _sy;
	}
	p.setTile = function( _w, _h ){
		this._object.tileW = _w;
	}
// private method
	/**
	 * @method _onload_finish
	 * @private
	 */
	p._onload_finish = function( _e ){
		this.data._reset_size();
		this.data._state = true;
	};
	/**
	 * @method _reset_size
	 * @private
	 */
    p._reset_size = function(){
    	var b = this._object.getBounds();
		this._width = b.width;
		this._height = b.height;
		
		if( this._rect ){
			this._rect.setValues( 0, 0 , this._width, this._height );
		}else{
			this._rect = new createjs.Rectangle( 0, 0 , this._width, this._height );
		}
		this._object.sourceRect = this.rect;
    };
    
	jeesjs.ImageBox = createjs.promote(ImageBox, "Widget");
})();