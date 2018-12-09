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
	};
	/**
	 * @public
	 * @method getResource
	 */
	p.getResource = function(){
		return this.property.resource;
	};
	/**
	 * @public
	 * @method setResource
	 * @param {String|Image|createjs.Bitmap} _r
	 */
	p.setResource = function( _r ){
		this.property.resource = _r;
		this._reset_bitmap();
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
	 * @public
	 * @method setVisible
	 * @param {Boolean} _v
	 */
	p.setVisible = function( _v ){
		this.visible = _v;
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
	 * 建立缓存区域
	 */
	p._cache = function(){
		var pos = this.getPosition();
		var size = this.getSize();
		var b = this.getBounds();
		this.cache( 0, 0, b.width, b.height );
	};
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
		this.property._resource_size();
//		this.property._reset_position();
		this._reset_rect();
		this._reset_size();
 	};
	/**
	 * @private
	 * @method _reset_size
	 */
	p._reset_size = function(){
		var pro_size = this.property.getResourceSize();
		var size = this.getSize();
		
		if( pro_size.w != -1 && size.w != pro_size.w ){
			this.property.scaleX = size.w / pro_size.w;
		}
		if( pro_size.w != -1 && size.h != pro_size.h ){
			this.property.scaleY = size.h / pro_size.h;
		}
		this._reset_scale();
	};
	/**
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
	};
	/**
	 * @method _reset_scale
	 * @private
	 */
	p._reset_scale = function(){
		var scale = this.getScale();
		
		this.scaleX = scale.x;
		this.scaleY = scale.y;
	};
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