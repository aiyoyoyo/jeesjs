/*
 * Author: Aiyoyoyo 
 * https://github.com/aiyoyoyo/jeesjs/tree/master/src/ui/ImageBox.js
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
	 * 支持基本的图片格式。
	 * @class ImageBox
	 * @extends createjs.BitMap
	 * @param {String | Object} _r 参数 "res/demo.jpg"、"resname"、jeesjs.QM.getSource("resname")
	 * @constructor
	 */
	function ImageBox() {
		this.Bitmap_constructor();
	// private properties: ====================================================
		/**
		 * 控件的配置属性，用于初始化和部分属性的重置用
		 * @public
		 * @property property
		 */
		this.property = new jees.UI.Property();
	};
	var p = createjs.extend( ImageBox, createjs.Bitmap );
// public method: =============================================================
	/**
	 * @public
	 * @method initialize
	 */
	p.initialize = function(){
		if( this.property.state ) return;
		this.property.state = true;
		
		this.property.initialize( this );
		
		this._reset_bitmap();
		this._reset_position();
	}
	/**
	 * @public
	 * @method getResource
	 */
	p.getResource = function(){
		return this.property.resource;
	}
	/**
	 * @public
	 * @method setResource
	 * @param {String|Image|createjs.Bitmap} _r
	 */
	p.setResource = function( _r ){
		this.property.resource = _r;
		this._reset_bitmap();
	}
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
		this._reset_size();
	};
	/**
	 * @public
	 * @method getPosition
	 * @return {Integer,Integer} {x,y}
	 */
	p.getPosition = function () {
		return this.property.getPosition();
	}
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
	}
	/**
	 * 获取缩放
	 * @public
	 * @method getScale
	 * @returns {Float,Float} {x,y}
	 */
	p.getScale = function(){
		return this.property.getScale();
	}
	/**
	 * 缩放
	 * @public
	 * @method setScale
	 * @param {Integer|Float} _sx
	 * @param {Integer|Float} _sy
	 */
	p.setScale = function( _sx, _sy ){
		this.property.setScale( _sx, _sy );
		this._reset_scale();
	}
	/**
	 * @public
	 * @method getRect
	 * @return {Integer,Integer,Integer,Integer} {x,y,w,h}
	 */
	p.getRect = function(){
		return this.sourceRect;
	}
	/**
	 * 绘制图片的局部
	 * @public
	 * @method setRect
	 * @param {Integer} _x
	 * @param {Integer} _y
	 * @param {Integer} _w
	 * @param {Integer} _h
	 */
	p.setRect = function( _x, _y, _w, _h ){
		this.property.rect = _x + "," + _y + "," + _w + "," + _h;
		this._reset_rect();
	}
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
	}
	/**
	 * @public
	 * @method getReg
	 * @returns {Integer,Integer} {x,y}
	 */
	p.getReg = function(){
		return {x: this.regX, y: this.regY};
	}
 // private method: ===========================================================
 	/**
	 * 建立缓存区域
	 */
	p._cache = function(){
		var pos = this.getPosition();
		var size = this.getSize();
		var b = this.getBounds();
		this.cache( 0, 0, b.width, b.height );
	}
	/**
	 * @private
	 * @method _reset_bitmap
	 */
 	p._reset_bitmap = function(){
 		
   		if( typeof this.property.resource == "string" ){
			if( this.property.resource.startsWith( "data:image" ) ){
				this.image = document.createElement("img");
				this.image.src = this.property.resource;
			}else if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(this.property.resource)){
				this.image = jees.Resource.get( this.property.resource );
			}else{
				this.image = document.createElement("img");
				this.image.src = this.property.resource;
				// 这里可能需要延迟加载
			}
		}else this.image = this.property.resource; // type = image
		
		this._reset_rect();
		this._reset_size();
		this._reset_scale();
 	}
	/**
	 * @private
	 * @method _reset_size
	 */
	p._reset_size = function(){
		if( this.image ){
			if( this.property.width == "default" ){
				this.property.setSize( this.image.width, this.property.height );
			}
			if( this.property.height == "default" ){
				this.property.setSize( this.property.width, this.image.height );
			}
		}
		
		var size = this.getSize();
		var b = this.getBounds();
		if( b ){
			if( this.property.scaleX == 1 )
				this.property.scaleX = size.w / b.width;
			if( this.property.scaleY == 1 )
				this.property.scaleY = size.h / b.height;
		}
	};
	/**
	 * @private
	 * @method _reset_position
	 */
	p._reset_position = function(){
		var pos = this.getPosition();
		var size = this.getSize();
		var scale = this.getScale();
		// 这里要去掉偏移误差, 包含缩放
		var x = pos.x, y = pos.y;
		var w = size.w * scale.x;
		var h = size.h * scale.y;
		if( this.property.alignX == 2 ){
			x = pos.x - w;
		}else if( this.property.alignX == 1 ){
			x = pos.x - ( w / 2 );
		}
		
		if( this.property.alignY == 2 ){
			y = pos.y - h;
		}else if( this.property.alignY == 1 ){
			y = pos.y - ( h / 2 );
		}
		
		this.x = x;
		this.y = y;
	};
	/**
	  * @method _reset_rect
	  * @private
	  */
	 p._reset_rect = function(){
	 	if( this.property.rect ){
	 		var r = this.property.rect.split(",");
	 		this.sourceRect = jees.CJS.newRect( r[0], r[1], r[2], r[3] );
			this.setBounds( r[0], r[1], r[2], r[3]  );
			this._cache();
	 	}
	}
	/**
	 * @method _reset_scale
	 * @private
	 */
	p._reset_scale = function(){
		var scale = this.getScale();
		
		this.scaleX = scale.x;
		this.scaleY = scale.y;
	}
    // /**
	//  * @method _onload
	//  * @param {Object|String} _r 
	//  * @private
	//  */
	// p._onload = function( _r ){
	// 	if( typeof _r === "string" && !/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test( _r ) || typeof _r === "object" ){
	// 		this._sourcePath = _r;
	// 		this._onload_finish( this );
    //     }else{
	// 		this._sourcePath = _r;
	// 		var _this = this;
	// 		jees.QM.addSource( _r , _r );
	// 		jees.QM.load( function(){
	// 			_this._onload_finish( _this ) 
	// 		} );
	// 	}
	// }
	// /**
	//  * @method _onload_finish
	//  * @param {Event} _e
	//  * @private
	//  */
	// p._onload_finish = function( _o ){
	// 	_o._source = typeof _o._sourcePath === "object" ? _o._sourcePath : jeesjs.QM.getSource( _o._sourcePath );
	// 	_o._object = new createjs.Bitmap( _o._source );
	// 	_o._reset();
	// }
	jees.UI.ImageBox = createjs.promote( ImageBox, "Bitmap");
})();