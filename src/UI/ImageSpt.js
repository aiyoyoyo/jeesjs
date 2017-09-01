/*
 * Author: Aiyoyoyo https://www.jeesupport.com/assets/jeesjs/src/UI/ImageSpt.js
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
	 * @class ImageSpt
	 * @extends jeesjs.Widget
	 * @param {String | Object} _r 参数 "res/demo.jpg"、"resname"、jeesjs.QM.getSource("resname")
	 * @param {Widget}
	 *            _p
	 * @constructor
	 */
	function ImageSpt( _r, _p ) {
		this.ImageBox_constructor(_p);

// public properties:

// private properties:
		
		this._init_finish();
	};
// public static properties

	var p = createjs.extend(ImageSpt, jeesjs.ImageBox);
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
    
// private method
	
    
	jeesjs.ImageSpt = createjs.promote(ImageSpt, "ImageBox");
})();