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
		/**
		 * 图片源
		 * @property r
		 * @type {String}
		 */
		this.r = null;
// private properties:
		/**
		 * 图片状态
		 * @property _state
		 * @type {Boolean}
		 * @default false;
		 */
		this._state = false;
		/**
		 * CreateJS图形控件
		 * 
		 * @property _image
		 * @type {createjs.Bitmap}
		 */
		this._image = null;
		
		if( typeof _r === "string" && !/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test( _r ) || typeof _r === "object" ){
			this.r = typeof _r === "object" ? _r : jeesjs.QM.getSource( _r );
			this._image = new createjs.Bitmap( this.r );
			
			var b = this._image.getBounds();
			this.w = b.width;
			this.h = b.height;
			this._state = true;
			
			this._init_finish();
        }else{
        	this.r = _r;
        	var tmp = new Image();
        	tmp.data = this;
        	tmp.src = _r;
        	tmp.onload = this._handle_finish;
        	
        	this._image = new createjs.Bitmap( this.r );
			this._init_finish();
        }
	};
// public static properties

	var p = createjs.extend(ImageBox, jeesjs.Widget);
// public method
	 /**
     * 返回根容器
     * @method getRoot
     * @extends
     * @type {createjs.DisplayObject}
     * @return 
     */
    p.getWidget = function(){
    	return this._image;
    };	
    /**
	 * 获取图片的加载状态
	 * @method getState
	 * @return {Boolean}
	 */
	p.getState = function(){
		return this._state;
	}
// private method
	/**
	 * @method _handle_finish
	 * @private
	 */
	p._handle_finish = function( _e ){
		this.data._reset_size();
		this.data._state = true;
	};
	/**
	 * @method _reset_size
	 * @private
	 */
    p._reset_size = function(){
    	var b = this._image.getBounds();
		this.w = b.width;
		this.h = b.height;
    };
    
	jeesjs.ImageBox = createjs.promote(ImageBox, "Widget");
})();