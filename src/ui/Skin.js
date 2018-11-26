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
    	/**
    	 * 配置数据
    	 * @type{Object}
    	 */
    	this._config = jees.Skins.getSkin( this._type, this._group );
    	/**
    	 * 皮肤资源
    	 * @type {Image | String}
    	 * @default ""
    	 */
    	this._resource = this._config.resource;
    	/**
    	 * 资源图片中的区域
    	 * @type {Map<String>,<x,y,w,h>}
    	 */
    	this._rects = new Map();
    	/**
    	 * 分割区域
    	 * @type {Map<String>,<l,r,t,b>}
    	 */
    	this._regions = new Map();
    	/**
    	 * 重组的元素
    	 * @type {Map<String>,<cratejs.BitmapCache>}
    	 */
    	this._bitmaps = new Map();
    	
    	this._init_rects();
    	this._init_regions( _w, _h );
    	this._init_bitmap( _w, _h );
	};

	var p = Skin.prototype;
// public methods: ============================================================
	/**
	 * 获取皮肤分格融合的图片
	 * @public
	 * @method getCacheDataURL
	 * @param {String} _type
	 * @returns {Image}
	 */
    p.getCacheDataURL = function( _type ){
		if( _type && this._bitmaps.has( _type ) ){
			return this._bitmaps.get( _type ).getCacheDataURL();
		}else if( this._bitmaps.has("rect") ) return this._bitmaps.get("rect").getCacheDataURL();
		else return null;
    }
// private methods: ===========================================================
	p.__init_rect = function( _k, _r ){
		if( _r ) this._rects.set( _k, _r );
	}
	p._init_rects = function(){
		this.__init_rect( "rect", this._config.property.rect );
		this.__init_rect( "highlight", this._config.property.highlight );
		this.__init_rect( "push", this._config.property.push );
		this.__init_rect( "disable", this._config.property.disable );
		this.__init_rect( "checked", this._config.property.checked );
		this.__init_rect( "checkedHighlight", this._config.property.checkedHighlight );
		this.__init_rect( "checkedPush", this._config.property.checkedPush );
		this.__init_rect( "checkedDisable", this._config.property.checkedDisable );
	}
	p.__init_region = function( _k, _r, _w, _h ){
		var target_width = _w != undefined ? _w : _r.w;
    	var target_height = _h != undefined ? _h : _r.h;
		// 默认>拉伸>平铺>根据类型使用格子
    	// 格子类型
    	if( _r ){
    		// config.property.region 根据分割区域计算出各个区域的坐标、大小等
    		if( this._type == "panel" || this._type == "panel-highlight" || this._type == "button" || this._type == "checkbox" ){
				this._regions.set( _k, jees.UT.Grid( this._config.property.region, _r.w, _r.h, target_width, target_height ) );
	    	}else{
//	    		this._regions.set( _k, jees.UT.Grid( this._config.property.region, _r.w, _r.h, target_width, target_height ) );
	    	}
	    	
    	}
	}
	p._init_regions = function( _w, _h ){
		var _this = this;
		this._rects.forEach( function( _r, _k ){
			_this.__init_region( _k, _r, _w, _h );
		});
	}
	p.__init_bitmap = function( _k, _w, _h ){
		if( _k ){
			var r = this._rects.get( _k );
			var rg = this._regions.get( _k );
			// 资源原图
	    	var skin_bitmap = jees.CJS.newBitmap( this._resource );
			skin_bitmap.sourceRect = jees.CJS.newRect( r.x, r.y, r.w, r.h );
			
			var _this = this;
			// 融合9宫格图片
			var tmp_container = jees.CJS.newContainer();
			
			var x = r.x, y = r.y;
			/**
			 * 分割区域信息
			 * @type{jees.UtilTools.Grid}
			 */
			rg.forEach( function( _r ){
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
			this._bitmaps.set( _k, tmp_container.bitmapCache );
		}
	}
	p._init_bitmap = function( _w, _h ){
		var _this = this;
		this._rects.forEach( function( _r, _k ){
			_this.__init_bitmap( _k, _w, _h );	
		});
		// TODO 将多状态皮肤合并在一起无效
//		var tmp_container = jees.CJS.newContainer();
//		for( var i = 0; i < this._bitmaps.length; i ++ ){
//			var bit = jees.CJS.newBitmap( this._bitmaps[i].getCacheDataURL() );
//			bit.sourceRect = jees.CJS.newRect( 0, 0 , _w, _h );
//			bit.x = 0;
//			bit.y = 0;
//			tmp_container.addChild( bit );
//		}
//		tmp_container.cache( 0, 0, _w * this._bitmaps.length , _h );
//		if( this._type == "button" ){
//			var bit = jees.CJS.newBitmap( tmp_container.bitmapCache.getCacheDataURL() );
//			jees.APP.addChild( tmp_container );
//		}
	}
	jees.UI.Skin = Skin;
})();