/*
 * Author: Aiyoyoyo
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/ui/Skin.js
 * License: MIT license
 */

/**
 * 控件的基类，建议在构件控件时，优先构建非容器对象后，在将其加入容器对象中。
 * 容器对象不建议变换坐标或者嵌套容器对象。
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};
this.jees.UI = this.jees.UI || {};

(function () {
	"use strict";
// constructor: ===========================================================
	/**
	 * @class Skin
	 * @constructor
	 * @param {String} _t 皮肤类型
	 * @param {Integer} _w 目标宽度
	 * @param {Integer} _h 目标高度
	 * @param {String} _g 皮肤组
	 */
	function Skin( _t, _w, _h, _g ) {
// private properties: 
		// 自定义图片>自定义皮肤>默认皮肤
		/**
		 * 皮肤类型
		 * @type {String}
		 * @default "" | "None"
		 */
		this._type = _t != undefined ? _t.toLowerCase() : "none";
		/**
		 * 使用的皮肤分组
		 * @type {String}
		 * @default "default"
		 */
    	this._group = _g != undefined ? _g : "default";
    	
    	var config = jees.Skins.getSkin( this._type, this._group );
    	/**
    	 * 皮肤资源
    	 * @type {Image | String}
    	 * @default ""
    	 */
    	this._resource = config.resource;
    	/**
    	 * 资源图片中的区域
    	 * @type {x,y,w,h}
    	 */
    	this._rect = config.property.rect;
    	
    	var target_width = _w != undefined ? _w : this._rect.w;
    	var target_height = _h != undefined ? _h : this._rect.h;
    	
    	// 默认>拉伸>平铺>根据类型使用格子
    	// 格子类型
    	if( this._type == "panel" || this._type == "panel-highlight" ){
    		// config.property.region 根据分割区域计算出各个区域的坐标、大小等
    		this._regions = jees.UT.Grid( config.property.region, this._rect.w, this._rect.h, target_width, target_height );
    	}
    	
    	// 资源原图
    	var skin_bitmap = jees.CJS.newBitmap( this._resource );
		skin_bitmap.sourceRect = jees.CJS.newRect( this._rect.x, this._rect.y, this._rect.w, this._rect.h );
		
		var _this = this;
		// 融合9宫格图片
		var tmp_container = jees.CJS.newContainer();
		
		var x = this._rect.x, y = this._rect.y;
		/**
		 * 分割区域信息
		 * @type{jees.UtilTools.Grid}
		 */
		this._regions.forEach( function( _r ){
			var o = skin_bitmap.clone();
			o.sourceRect = jees.CJS.newRect( x + _r.x, y + _r.y, _r.w, _r.h );
			o.x = _r.dx;
			o.y = _r.dy;
			o.scaleX = _r.sw;
			o.scaleY = _r.sh;
			
			tmp_container.addChild( o );
		} );
		tmp_container.cache( 0, 0, _w, _h );
		// TIPS 这里有个BUG， Container里getCacheDataURL调用的是BitmapCache.getDataURL
		// Ver.1.0里BitmapCache.getDataURL->BitmapCache.getCacheDataURL
		this.bitmapCache = tmp_container.bitmapCache;
	};

	var p = Skin.prototype;
// public methods: ============================================================
	/**
	 * 获取皮肤9宫格融合的图片
	 * @public
	 * @method getCacheDataURL
	 * @returns {Image}
	 */
    p.getCacheDataURL = function(){
    	return this.bitmapCache.getCacheDataURL();
    }

	jees.UI.Skin = Skin;
})();