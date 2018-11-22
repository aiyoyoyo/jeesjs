/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/blob/master/src/ui/Panel.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};
this.jees.UI = this.jees.UI || {};

(function() {
	"use strict";
// constructor: ===============================================================
	/**
	 * @class Panel
	 * @extends jees.Widget
	 * @constructor
	 */
    function Panel(){
    	this.Widget_constructor();
// public properties:
		/**
    	 * 使用的皮肤，控件对应自己得控件类型
		 * @public
    	 * @extends
		 * @property property.skinResource
    	 * @type {String}
    	 * @default "Panel"
    	 */
		this.property.skinResource = "Panel";
// private properties:
    };
  	var p = createjs.extend( Panel, jees.UI.Widget );
// public methods: ============================================================
    p.initialize = function(){
    	this._reset_size();
    	this._reset_position();
    	// var size = this.getSize();
    	// this.sourceRect = jees.CJS.newRect( 0, 0, size.w, size.h );
    	
    	// 如果没有指定图片源则使用皮肤
    	if( this.property.resource && this.property.resource != "" ){
    		this._init_custom();
    	}else{
    		this._init_skin();
    	}
    	this._reset_scale();
    	this._reset_mask();
	    this._init_childs();
	};
	
// private method: ============================================================
	p._init_custom = function(){
		var size = this.getSize();
		// jees.Images see Define.js 
		var img = jees.Images.get( this.property.resource );
		
		var w = size.w;
		var h = size.h;
		var style = this.property.style;
		
		this._object = jees.CJS.newBitmap( img );
		if( style == 1 ){ // Streach
			var sx = w / img.width;
			var sy = h / img.height;
			this.setScale( sx, sy );
		}else if( style == 2 ){ // Tile
			// 平铺时如果缩放了控件，则绘制和缓存区域要除以缩放比例
			var scale = this.property.getScale();
			var dw = w / scale.x;
			var dh = h / scale.y;
			this._object = jees.CJS.newShape();
			this._object.graphics.beginBitmapFill( img ).drawRect( 0, 0, dw, dh );
			this._object.cache( 0, 0, dw, dh );
		}
	}
	p._init_skin = function(){
    	var size = this.getSize();
		this._skin = new jees.UI.Skin( this.property.skinResource, size.w, size.h, jees.SET.getSkin() );
		this.property.resource = this._skin.getCacheDataURL();
		this._object =  jees.CJS.newBitmap( this.property.resource );
	}
	
	jees.UI.Panel = createjs.promote( Panel, "Widget" );
})();