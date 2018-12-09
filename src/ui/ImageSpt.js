/*
 * Author: Aiyoyoyo https://www.jeesupport.com/assets/jeesjs/src/ui/ImageSpt.js
 * License: MIT license
 */

/**
 * @module JeesJS
 */
// namespace:
this.jees = this.jees || {};
this.jees.UI = this.jees.UI || {};

(function () {
	"use strict";
// constructor: ===============================================================
	/**
	 * 支持基本的图片格式。
	 * @class ImageSpt
	 * @extends createjs.Sprite
	 * @constructor
	 */
	function ImageSpt() {
		this.Sprite_constructor();
// public properties:
		/**
		 * 控件的配置属性，用于初始化和部分属性的重置用
		 * @public
		 * @property property
		 */
		this.property = new jees.UI.Property();
		/**
		 * @public
		 * @property rows
		 * @type {Integer}
		 * @default 1
		 */
		this.rows = 1;
		/**
		 * @public
		 * @property cols
		 * @type {Integer}
		 * @default 1
		 */
		this.cols = 1;
		/**
		 * 起始帧
		 * @public
		 * @property start
		 * @type {Integer}
		 * @default 0
		 */
		this.start = 0;
		/**
		 * 帧速 ms
		 * @public
		 * @property speed
		 * @type {Integer}
		 * @default 100
		 */
		this.speed = 100;
		/**
		 * @public
		 * @property auto
		 * @type {Boolean}
		 * @default true
		 */
		this.auto = true;
// private properties:
		/**
		 * @private 
		 * @property _data
		 * @type {Object}
		 * @defualt null
		 */
		this._data = null;
		/**
		 * @private
		 * @property _frame_count
		 * @type {Integer}
		 * @default 1
		 */
		this._frame_count = 1;
	};

	var p = createjs.extend( ImageSpt, createjs.Sprite );
// public method: =============================================================
	/**
	 * @public
	 * @method initialize
	 */
	p.initialize = function(){
		if( this.property.state ) return;
		this.property.state = true;
		
		this.property.initialize( this );
		
		var res =  jees.Resource.get( this.property.resource );
		var frame_width = res.width / this.cols;
		var frame_height = res.height / this.rows;
		
//	    framerate: rate, 这里无视ticker的timingMode，也许是bug也许是我错了。
		this._frame_count = ( this.cols * this.rows );
		this._data = {
	        images: [ res ],
	        framerate: this._frame_count,
	        frames: { width: frame_width, height: frame_height, count: this._frame_count, regX: this.regX, regY: this.regY },
	        animations: {
	        	default: [ 0, this._frame_count - 1, "default", 1]
	        }
	   	};
	   	this.spriteSheet = new createjs.SpriteSheet( this._data );
	   	
		this.property._resource_size();
		this.property.setSize( frame_width, frame_height );
		
		this._reset_size();
	    this._reset_speed();
	    this._reset_position();
	    		
	    this._goto( this.start );
	    if( this.auto ){
	    	this.gotoAndPlay( "default" );
	    }
	};
	/**
	 * @public
	 * @method getSize
	 * @param {Boolean} _t
	 * @return {Integer,Integer} {w,h}
	 */
	p.getSize = function ( _t ) {
		return this.property.getSize( _t );
	};
	/**
	 * @public
	 * @method setSize
	 * @param {Integer|String} _w
	 * @param {Integer|String} _h
	 */
	p.setSize = function ( _w, _h ) {
		// 设置记录值
		this.property.setSize( _w, _h );
		this._reset_size_position();
	};
	/**
	 * @public
	 * @method getPosition
	 * @return {Integer,Integer} {x,y}
	 */
	p.getPosition = function () {
		return this.property.getPosition();
	};
	/**
     * @method setPosition
     * @extends
     * @param {Integer} _x
     * @param {Integer} _y
     */
	p.setPosition = function( _x, _y ){
		this.property.setPosition( _x, _y );
		this._reset_position();
	};
	/**
	 * 绝对位置
	 * @public 
	 * @method getAbsPosition
	 * @returns {Integer,Integer} {x,y}
	 */
	p.getAbsPosition = function(){
		var m = this.getConcatenatedMatrix();
		return { x: m.tx, y: m.ty };
	};
	/**
	 * 获取缩放
	 * @public
	 * @method getScale
	 * @returns {Float,Float} {x,y}
	 */
	p.getScale = function(){
		return this.property.getScale();
	};
	/**
	 * 缩放
	 * @public
	 * @method setScale
	 * @param {Integer|Float} _sx
	 * @param {Integer|Float} _sy
	 */
	p.setScale = function( _sx, _sy ){
		this.property.setScale( _sx, _sy );
		var size = this.getSize();
		
		var w = size.w;
		var h = size.h;
		if( _sx != undefined ) w *= _sx;
		if( _sy != undefined ) h *= _sy;
		
		this.setSize( w, h );
	};
	/**
	 * 绘制图片的局部
	 * @method setRect
	 * @param {Integer} _x
	 * @param {Integer} _y
	 * @param {Integer} _w
	 * @param {Integer} _h
	 */
	p.setRect = function( _x, _y, _w, _h ){
		this.region = _x + "," + _y + "," + _w + "," + _h;
		this.sourceRect = jees.CJS.newRect( _x, _y, _w, _h );
		this.setBounds( _x, _y, _w, _h);
//		this.cache( 0, 0, _w, _h );
	};
	/**
	 * 设置图片热点
	 * @public
	 * @method setReg
	 * @param {Integer} _x
	 * @param {Integer} _y
	 */
	p.setReg = function( _x, _y ){
		if( _x ) this.regX = _x;
		if( _y ) this.regY = _y;
	};
	/**
	 * 
	 * @public
	 * @method setSpeed
	 * @param {Long} _s(ms/frame)
	 */
	p.setSpeed = function( _s ){
		this.speed = _s;
		this._reset_speed();
	};
	/**
	 * 当前字体基于坐标的水平对齐方式
	 * @method getAlign
	 * @return {Integer,Integer,} {x,y}
	 */
	p.getAlign = function () {
		return { x: this.property.alignX, y: this.property.alignY };
	};
	/**
	 * 设置文字基于坐标的水平对齐方式
	 * @method setAlign
	 * @param {Integer} _x
	 * @param {Integer} _y
	 */
	p.setAlign = function ( _x, _y ) {
		var ax = this.property.alignX;
		var ay = this.property.alignY;
		if( _x != undefined ) this.property.alignX = _x;
		if( _y != undefined ) this.property.alignY = _y;
		
		if( ax != this.property.alignX && this.property.alignX == 0 ) 
			this.property.x = 0;
		if( ay != this.property.alignY && this.property.alignY == 0 ) 
			this.property.y = 0;
		
		this._reset_size_position();
	};
 // private method: ===========================================================
	/** 
	 * @method _reset_size
	 * @private
	 */
	p._reset_size = function(){
		var pro_size = this.property.getResourceSize();
		var pro_w = pro_size.w / this.cols;
		var pro_h = pro_size.h / this.rows;
		var size = this.getSize();
		
		if( pro_w != -1 && size.w != pro_w ){
			this.property.scaleX = size.w / pro_w;
		}
		if( pro_h != -1 && size.h != pro_h ){
			this.property.scaleY = size.h / pro_h;
		}
		this._reset_scale();
	};
	/**
	 * 重置坐标
	 * @private
	 * @method _reset_position
	 */
	p._reset_position = function(){
		var pos = this.getPosition();
		
		this.x = pos.x;
		this.y = pos.y;
	};
	/**
	 * @private
	 * @method _reset_size_position
	 */
	p._reset_size_position = function(){
		this._reset_size();
		var pos = this.getPosition();
		var size = this.getSize();
		
		var x = pos.x;
		var y = pos.y;
		
		if( this.property.alignX != 0 ){
			x = 0;
		}
		if( this.property.alignY != 0 ){
			y = 0;
		}
		
		this.property.setPosition( x, y );
		this._reset_position();
	};
	/**
	* @private
	 * @method _reset_scale
	 */
	p._reset_scale = function(){
		var scale = this.getScale();
		this.scaleX = scale.x;
		this.scaleY = scale.y;
	};
	/**
	 * @private
	 * @method _reset_speed
	 */
	p._reset_speed = function(){
		var spd = 1000 / jees.SET.getFPS() / this.speed;
		
		this._data.animations.default[3] = spd;
		this.spriteSheet._parseData( this._data );
	};
	
	jees.UI.ImageSpt = createjs.promote( ImageSpt, "Sprite");
})();